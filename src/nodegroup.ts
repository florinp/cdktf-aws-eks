
import { eks, iam } from '@cdktf/provider-aws';
import { ITerraformDependable } from 'cdktf';
import { Construct } from 'constructs';


export interface ScalingConfig {
  readonly desiredCapacity?: number;
  readonly minCapacity?: number;
  readonly maxCapacity?: number;
}

export enum CapacityType {
  SPOT = 'SPOT',
  ON_DEMAND = 'ON_DEMAND'
}

export interface NodeGroupBaseOptions {
  /**
     * nodegroup role arn
     * @default - The IAM role for the default nodegroup.
     */
  readonly nodeRole?: string;
  /**
     * scaling configuration for the nodegroup.
     * @see https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group#scaling_config-configuration-block
     */
  readonly scalingConfig?: ScalingConfig;
  /**
     * capacity type of the nodegroup.
     * @default CapacityType.ON_DEMAND
     */
  readonly capacityType?: CapacityType;
  /**
     * instance types of the nodegroup.
     * @default ['t3.large']
     */
  readonly instanceTypes?: string[];
  /**
     * resources to depend on;
     */
  readonly dependsOn?: ITerraformDependable[];
}

export interface NodeGroupOptions extends NodeGroupBaseOptions {
  /**
     * subnet IDs for the nodegroup.
     */
  readonly subnets?: string[];
}

export interface NodeGroupProps extends NodeGroupBaseOptions {
  /**
     * cluster name
     */
  readonly clusterName: string;
  /**
     * subnet IDs for the nodegroup.
     */
  readonly subnets: string[];
}

export class NodeGroup extends Construct {
  readonly nodeGroupRoleArn: string;
  private readonly desiredCapacity: number;
  private readonly minCapacity: number;
  private readonly maxCapacity: number;
  constructor(scope: Construct, id: string, props: NodeGroupProps) {
    super(scope, id);
    this.minCapacity = props.scalingConfig?.minCapacity ?? 0;
    this.desiredCapacity = props.scalingConfig?.desiredCapacity ?? this.minCapacity;
    this.maxCapacity = props.scalingConfig?.maxCapacity ?? (this.desiredCapacity > 0) ?
      this.desiredCapacity : 1;

    this.nodeGroupRoleArn = props.nodeRole ?? this._createNodeGroupRole().arn;

    new eks.EksNodeGroup(this, 'NodeGroup', {
      clusterName: props.clusterName,
      nodeRoleArn: this.nodeGroupRoleArn,
      subnetIds: props.subnets,
      scalingConfig: {
        desiredSize: this.desiredCapacity,
        minSize: this.minCapacity,
        maxSize: this.maxCapacity,
      },
      capacityType: props.capacityType ?? CapacityType.ON_DEMAND,
      instanceTypes: props.instanceTypes ?? ['t3.large'],
      dependsOn: props.dependsOn,
    });
  }
  private _createNodeGroupRole(): iam.IamRole {
    const role = new iam.IamRole(this, 'MNGRole', {
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
    new iam.IamPolicyAttachment(this, 'AmazonEKSWorkerNodePolicyAttachment', {
      name: 'AmazonEKSWorkerNodePolicyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy',
      roles: [role.name],
    });
    new iam.IamPolicyAttachment(this, 'AmazonEKS_CNI_PolicyAttachment', {
      name: 'AmazonEKS_CNI_PolicyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy',
      roles: [role.name],
    });
    new iam.IamPolicyAttachment(this, 'AmazonEC2ContainerRegistryReadOnlyAttachment', {
      name: 'AmazonEC2ContainerRegistryReadOnlyAttachment',
      policyArn: 'arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly',
      roles: [role.name],
    });
    return role;
  }
}

