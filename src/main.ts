import { DataAwsAvailabilityZones, AwsProvider, EksCluster, IamRole, IamPolicyAttachment, DataAwsEksClusterAuth, EksNodeGroup } from '@cdktf/provider-aws';
import * as k8s from '@cdktf/provider-kubernetes';
import { Token } from 'cdktf';
import { Construct } from 'constructs';
import * as awsVpc from './imports/modules/terraform-aws-modules/vpc/aws';


export interface AmazonEKSProps {
  readonly region?: string;
  readonly publicSubnets?: string[];
  readonly privateSubnets?: string[];
  readonly clusterName?: string;
}

export class AmazonEKS extends Construct {
  readonly publicSubnets: string[];
  readonly privateSubnets: string[];
  constructor(scope: Construct, id: string, props: AmazonEKSProps = {}) {
    super(scope, id);

    new AwsProvider(this, 'aws', {
      region: props.region ?? 'us-east-1',
    });

    if (!props.privateSubnets || !props.privateSubnets) {
      const vpc = this._createVpc();
      this.privateSubnets = Token.asList(vpc.privateSubnetsOutput);
      this.publicSubnets = Token.asList(vpc.publicSubnetsOutput);
    } else {
      this.privateSubnets = props.privateSubnets!;
      this.publicSubnets = props.publicSubnets!;
    }

    // create the cluster
    const cluster = new EksCluster(this, 'EksCluster', {
      name: props.clusterName ?? `${id}cluster`,
      version: '1.21',
      vpcConfig: [
        {
          subnetIds: this.privateSubnets,
        },
      ],
      roleArn: this._createClusterRole().arn,
    });
    new EksNodeGroup(this, 'NG', {
      clusterName: cluster.name,
      nodeRoleArn: this._createNodeGroupRole().arn,
      subnetIds: this.privateSubnets,
      scalingConfig: [
        {
          desiredSize: 1,
          minSize: 1,
          maxSize: 1,
        },
      ],
      capacityType: 'SPOT',
      instanceTypes: ['t3.large'],
    });

    const clusterAuthData = new DataAwsEksClusterAuth(this, 'DataAwsEksClusterAuth', {
      name: 'cdktf-eks-cluster',
    });

    let cert = `\${base64decode(${cluster.certificateAuthority})}`;

    const k8sprovider = new k8s.KubernetesProvider(this, 'Kubernetes', {
      host: Token.asString(cluster.endpoint),
      token: Token.asString(clusterAuthData.token),
    });
    k8sprovider.addOverride('cluster_ca_certificate', cert);

  }
  private _createVpc() {
    const azs = new DataAwsAvailabilityZones(this, 'AZS', {
      allAvailabilityZones: true,
      state: 'available',
      count: 3,
    });
    return new awsVpc.TerraformAwsModulesVpcAws(this, 'Vpc', {
      cidr: '10.0.0.0/16',
      azs: [azs.fqn],
      publicSubnets: ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24'],
      privateSubnets: ['10.0.11.0/24', '10.0.12.0/24', '10.0.13.0/24'],
      singleNatGateway: true,
      enableNatGateway: true,
      oneNatGatewayPerAz: false,
    });
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

// const app = new App();
// const stack = new TerraformStack(app, 'hello-terraform');
// new AmazonEKS(stack, 'AmazonEKS', {
//   region: 'ap-northeast-1',
// });
// app.synth();
