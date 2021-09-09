import { AwsProvider, EksNodeGroup, EksCluster, DataAwsEksClusterAuth, IamRole, IamPolicyAttachment, DataAwsAvailabilityZones as AZ, DataAwsSubnetIds } from '@cdktf/provider-aws';
import * as k8s from '@cdktf/provider-kubernetes';
import { TerraformOutput, Token, ITerraformDependable } from 'cdktf';
import { Construct } from 'constructs';
import * as awsVpc from './imports/modules/terraform-aws-modules/vpc/aws';

/**
 * Properties for the Cluster
 */
export interface ClusterProps {
  /**
   * The AWS region to deploy.
   */
  readonly region?: string;
  /**
   * list of public subnetIds for an existing VPC.
   */
  readonly publicSubnets?: string[];
  /**
   * list of private subnetIds for an existing VPC.
   */
  readonly privateSubnets?: string[];
  /**
   * The Amazon EKS cluster name.
   */
  readonly clusterName?: string;
  /**
   * Kubernetes cluster version
   */
  readonly version: KubernetesVersion;
  /**
   * The desired capacity for the nodegroup.
   * @default - minCapacity
   */
  readonly desiredCapacity?: number;
  /**
   * min capacity for the nodegroup
   * @default 0
   */
  readonly minCapacity?: number;
  /**
   * max capacity for the nodegroup
   * @default - desiredCapacity
   */
  readonly maxCapacity?: number;
  /**
   * capacity type of the nodegroup
   * @default CapacityType.ON_DEMAND
   */
  readonly capacityType?: CapacityType;
  /**
   * instance types of the default nodegroup.
   *
   * @default ['t3.large']
   */
  readonly instanceTypes?: string[];
}

export enum CapacityType {
  SPOT = 'SPOT',
  ON_DEMAND = 'ON_DEMAND'
}

/**
 * Kubernetes cluster version
 */
export class KubernetesVersion {
  /**
   * Kubernetes version 1.14
   */
  public static readonly V1_14 = KubernetesVersion.of('1.14');

  /**
   * Kubernetes version 1.15
   */
  public static readonly V1_15 = KubernetesVersion.of('1.15');

  /**
   * Kubernetes version 1.16
   */
  public static readonly V1_16 = KubernetesVersion.of('1.16');

  /**
   * Kubernetes version 1.17
   */
  public static readonly V1_17 = KubernetesVersion.of('1.17');

  /**
   * Kubernetes version 1.18
   */
  public static readonly V1_18 = KubernetesVersion.of('1.18');

  /**
   * Kubernetes version 1.19
   */
  public static readonly V1_19 = KubernetesVersion.of('1.19');

  /**
   * Kubernetes version 1.20
   */
  public static readonly V1_20 = KubernetesVersion.of('1.20');

  /**
   * Kubernetes version 1.21
   */
  public static readonly V1_21 = KubernetesVersion.of('1.21');

  /**
   * Custom cluster version
   * @param version custom version number
   */
  public static of(version: string) { return new KubernetesVersion(version); }
  /**
   *
   * @param version cluster version number
   */
  private constructor(public readonly version: string) { }
}


/**
 * The Amazon EKS Cluster with a default nodegroup
 */
export class Cluster extends Construct {
  readonly props: ClusterProps;
  readonly publicSubnets: string[];
  readonly privateSubnets: string[];
  readonly clusterName: string;
  readonly vpc?: any;
  readonly vpcId?: string;
  private readonly desiredCapacity: number;
  private readonly minCapacity: number;
  private readonly maxCapacity: number;
  constructor(scope: Construct, id: string, props: ClusterProps) {
    super(scope, id);

    this.props = props;
    this.minCapacity = props.minCapacity ?? 0;
    this.desiredCapacity = props.desiredCapacity ?? this.minCapacity;
    this.maxCapacity = props.maxCapacity ?? this.desiredCapacity;
    new AwsProvider(this, 'aws', {
      region: props.region ?? 'us-east-1',
    });

    // no private subnets given
    if (!props.privateSubnets) {
      const vpc = this._createVpc();
      this.vpc = vpc;
      this.vpcId = Token.asString(vpc.vpcIdOutput);
      this.privateSubnets = Token.asList(vpc.privateSubnetsOutput);
      this.publicSubnets = Token.asList(vpc.publicSubnetsOutput);
    } else {
      this.privateSubnets = props.privateSubnets!;
      this.publicSubnets = props.publicSubnets!;
    }

    // create the cluster
    this.clusterName = props.clusterName ?? `${id}cluster`;
    const cluster = new EksCluster(this, 'EksCluster', {
      name: this.clusterName,
      version: props.version.version,
      vpcConfig: [
        {
          // the cluster should associate with all available subnets
          subnetIds: this.vpcId ? this.getAllSubnetsFromVpcId(this.vpcId, [this.vpc]).ids :
            this.privateSubnets.concat(this.publicSubnets),
        },
      ],
      roleArn: this._createClusterRole().arn,
    });

    // cluster should be created after vpc
    if (this.vpc) {
      cluster.constructNode.addDependency(this.vpc);
    }

    new EksNodeGroup(this, 'NG', {
      clusterName: cluster.name, // ensure the dependency
      nodeRoleArn: this._createNodeGroupRole().arn,
      subnetIds: this.privateSubnets,
      scalingConfig: [
        {
          desiredSize: this.desiredCapacity,
          minSize: this.minCapacity,
          maxSize: this.maxCapacity,
        },
      ],
      capacityType: props.capacityType ?? CapacityType.ON_DEMAND,
      instanceTypes: props.instanceTypes ?? ['t3.large'],
    });

    const clusterAuthData = new DataAwsEksClusterAuth(this, 'DataAwsEksClusterAuth', {
      name: this.clusterName,
    });

    let cert = `\${base64decode(${cluster.certificateAuthority})}`;

    const k8sprovider = new k8s.KubernetesProvider(this, 'Kubernetes', {
      host: Token.asString(cluster.endpoint),
      token: Token.asString(clusterAuthData.token),
    });
    k8sprovider.addOverride('cluster_ca_certificate', cert);

    new TerraformOutput(this, 'KubelctlCommand', {
      value: `aws eks update-kubeconfig --name ${this.clusterName}`,
    });

  }
  private _createVpc() {
    const vpc = new awsVpc.TerraformAwsModulesVpcAws(this, 'Vpc', {
      cidr: '10.0.0.0/16',
      azs: new AZ(this, 'AZs', {
        state: 'available',
      }).names,
      publicSubnets: ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24'],
      privateSubnets: ['10.0.11.0/24', '10.0.12.0/24', '10.0.13.0/24'],
      singleNatGateway: true,
      enableNatGateway: true,
      oneNatGatewayPerAz: false,
    });
    return vpc;
  }
  private _createNodeGroupRole(): IamRole {
    const role = new IamRole(this, 'MNGRole', {
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Sid: '',
            Principal: {
              Service: 'ec2.amazonaws.com',
            },
          },
        ],
      }),
    });
    new IamPolicyAttachment(this, 'AmazonEKSWorkerNodePolicyAttachment', {
      name: 'AmazonEKSWorkerNodePolicyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy',
      roles: [role.name],
    });
    new IamPolicyAttachment(this, 'AmazonEKS_CNI_PolicyAttachment', {
      name: 'AmazonEKS_CNI_PolicyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy',
      roles: [role.name],
    });
    new IamPolicyAttachment(this, 'AmazonEC2ContainerRegistryReadOnlyAttachment', {
      name: 'AmazonEC2ContainerRegistryReadOnlyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly',
      roles: [role.name],
    });
    return role;
  }
  private _createClusterRole(): IamRole {
    const role = new IamRole(this, 'ClusterRole', {
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Sid: '',
            Principal: {
              Service: 'eks.amazonaws.com',
            },
          },
        ],
      }),
    });
    new IamPolicyAttachment(this, 'AmazonEKSClusterPolicyAttachment', {
      name: 'AmazonEKSClusterPolicyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEKSClusterPolicy',
      roles: [role.name],
    });
    new IamPolicyAttachment(this, 'AmazonEKSVPCResourceControllerAttachment', {
      name: 'AmazonEKSVPCResourceControllerAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEKSVPCResourceController',
      roles: [role.name],
    });
    return role;
  }
  private getAllSubnetsFromVpcId(vpcId: string, dependable?: ITerraformDependable[]) {
    return new DataAwsSubnetIds(this, `${vpcId}subnets`, {
      vpcId,
      dependsOn: dependable,
    });
  }
}
