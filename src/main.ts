import { AwsProvider, EksNodeGroup, EksCluster, DataAwsEksClusterAuth, IamRole, IamPolicyAttachment } from '@cdktf/provider-aws';
import * as k8s from '@cdktf/provider-kubernetes';
import { TerraformOutput, Token } from 'cdktf';
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
   * list of available zones in the region for a new VPC.
   */
  readonly availabilityZones?: string[];
  /**
   * The Amazon EKS cluster name.
   */
  readonly clusterName?: string;
  /**
   * The desired capacity for the nodegroup.
   * @default 1
   */
  readonly desiredCapacity?: number;
  /**
   * min capacity for the nodegroup
   * @default desiredCapacity
   */
  readonly minCapacity?: number;
  /**
   * max capacity for the nodegroup
   * @default minCapacity + 1
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
 * The Amazon EKS Cluster with a default nodegroup
 */
export class Cluster extends Construct {
  readonly props: ClusterProps;
  readonly publicSubnets: string[];
  readonly privateSubnets: string[];
  readonly clusterName: string;
  private readonly desiredCapacity: number;
  private readonly minCapacity: number;
  private readonly maxCapacity: number;
  constructor(scope: Construct, id: string, props: ClusterProps = {}) {
    super(scope, id);

    this.props = props;
    this.desiredCapacity = props.desiredCapacity ?? 1;
    this.minCapacity = props.minCapacity ?? this.desiredCapacity;
    this.maxCapacity = props.maxCapacity ?? this.minCapacity+1;

    new AwsProvider(this, 'aws', {
      region: props.region ?? 'us-east-1',
    });

    if (props.availabilityZones) {
      const vpc = this._createVpc();
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
      version: '1.21',
      vpcConfig: [
        {
          subnetIds: this.privateSubnets,
        },
      ],
      roleArn: this._createClusterRole().arn,
    });

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
      azs: this.props.availabilityZones,
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
}
