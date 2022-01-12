# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### Cluster <a name="@pahud/cdktf-aws-eks.Cluster"></a>

The Amazon EKS Cluster with a default nodegroup.

#### Initializers <a name="@pahud/cdktf-aws-eks.Cluster.Initializer"></a>

```typescript
import { Cluster } from '@pahud/cdktf-aws-eks'

new Cluster(scope: Construct, id: string, props: ClusterProps)
```

##### `scope`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.parameter.props"></a>

- *Type:* [`@pahud/cdktf-aws-eks.ClusterProps`](#@pahud/cdktf-aws-eks.ClusterProps)

---

#### Methods <a name="Methods"></a>

##### `addNodeGroup` <a name="@pahud/cdktf-aws-eks.Cluster.addNodeGroup"></a>

```typescript
public addNodeGroup(id: string, options: NodeGroupOptions)
```

###### `id`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.parameter.id"></a>

- *Type:* `string`

---

###### `options`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.parameter.options"></a>

- *Type:* [`@pahud/cdktf-aws-eks.NodeGroupOptions`](#@pahud/cdktf-aws-eks.NodeGroupOptions)

---


#### Properties <a name="Properties"></a>

##### `cluster`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.cluster"></a>

```typescript
public readonly cluster: EksCluster;
```

- *Type:* [`@cdktf/provider-aws.eks.EksCluster`](#@cdktf/provider-aws.eks.EksCluster)

---

##### `clusterName`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* `string`

---

##### `privateSubnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.privateSubnets"></a>

```typescript
public readonly privateSubnets: string[];
```

- *Type:* `string`[]

---

##### `props`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.props"></a>

```typescript
public readonly props: ClusterProps;
```

- *Type:* [`@pahud/cdktf-aws-eks.ClusterProps`](#@pahud/cdktf-aws-eks.ClusterProps)

---

##### `publicSubnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.publicSubnets"></a>

```typescript
public readonly publicSubnets: string[];
```

- *Type:* `string`[]

---

##### `defaultNodeGroup`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.defaultNodeGroup"></a>

```typescript
public readonly defaultNodeGroup: NodeGroup;
```

- *Type:* [`@pahud/cdktf-aws-eks.NodeGroup`](#@pahud/cdktf-aws-eks.NodeGroup)

---

##### `vpc`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.vpc"></a>

```typescript
public readonly vpc: any;
```

- *Type:* `any`

---

##### `vpcId`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.vpcId"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* `string`

---


### NodeGroup <a name="@pahud/cdktf-aws-eks.NodeGroup"></a>

#### Initializers <a name="@pahud/cdktf-aws-eks.NodeGroup.Initializer"></a>

```typescript
import { NodeGroup } from '@pahud/cdktf-aws-eks'

new NodeGroup(scope: Construct, id: string, props: NodeGroupProps)
```

##### `scope`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.NodeGroup.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.NodeGroup.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.NodeGroup.parameter.props"></a>

- *Type:* [`@pahud/cdktf-aws-eks.NodeGroupProps`](#@pahud/cdktf-aws-eks.NodeGroupProps)

---



#### Properties <a name="Properties"></a>

##### `nodeGroupRoleArn`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.NodeGroup.property.nodeGroupRoleArn"></a>

```typescript
public readonly nodeGroupRoleArn: string;
```

- *Type:* `string`

---


## Structs <a name="Structs"></a>

### ClusterProps <a name="@pahud/cdktf-aws-eks.ClusterProps"></a>

Properties for the Cluster.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ClusterProps } from '@pahud/cdktf-aws-eks'

const clusterProps: ClusterProps = { ... }
```

##### `version`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.version"></a>

```typescript
public readonly version: KubernetesVersion;
```

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes cluster version.

---

##### `capacityType`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.capacityType"></a>

```typescript
public readonly capacityType: CapacityType;
```

- *Type:* [`@pahud/cdktf-aws-eks.CapacityType`](#@pahud/cdktf-aws-eks.CapacityType)
- *Default:* CapacityType.ON_DEMAND

capacity type of the nodegroup.

---

##### `clusterName`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* `string`

The Amazon EKS cluster name.

---

##### `instanceTypes`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* `string`[]
- *Default:* ['t3.large']

instance types of the default nodegroup.

---

##### `privateSubnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.privateSubnets"></a>

```typescript
public readonly privateSubnets: string[];
```

- *Type:* `string`[]

list of private subnetIds for an existing VPC.

---

##### `publicSubnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.publicSubnets"></a>

```typescript
public readonly publicSubnets: string[];
```

- *Type:* `string`[]

list of public subnetIds for an existing VPC.

---

##### `region`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* `string`

The AWS region to deploy.

---

##### `scalingConfig`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.scalingConfig"></a>

```typescript
public readonly scalingConfig: ScalingConfig;
```

- *Type:* [`@pahud/cdktf-aws-eks.ScalingConfig`](#@pahud/cdktf-aws-eks.ScalingConfig)

The scaling config of the default nodegroup.

---

### NodeGroupBaseOptions <a name="@pahud/cdktf-aws-eks.NodeGroupBaseOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { NodeGroupBaseOptions } from '@pahud/cdktf-aws-eks'

const nodeGroupBaseOptions: NodeGroupBaseOptions = { ... }
```

##### `capacityType`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupBaseOptions.property.capacityType"></a>

```typescript
public readonly capacityType: CapacityType;
```

- *Type:* [`@pahud/cdktf-aws-eks.CapacityType`](#@pahud/cdktf-aws-eks.CapacityType)
- *Default:* CapacityType.ON_DEMAND

capacity type of the nodegroup.

---

##### `dependsOn`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupBaseOptions.property.dependsOn"></a>

```typescript
public readonly dependsOn: ITerraformDependable[];
```

- *Type:* [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[]

resources to depend on;

---

##### `instanceTypes`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupBaseOptions.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* `string`[]
- *Default:* ['t3.large']

instance types of the nodegroup.

---

##### `nodeRole`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupBaseOptions.property.nodeRole"></a>

```typescript
public readonly nodeRole: string;
```

- *Type:* `string`
- *Default:* The IAM role for the default nodegroup.

nodegroup role arn.

---

##### `scalingConfig`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupBaseOptions.property.scalingConfig"></a>

```typescript
public readonly scalingConfig: ScalingConfig;
```

- *Type:* [`@pahud/cdktf-aws-eks.ScalingConfig`](#@pahud/cdktf-aws-eks.ScalingConfig)

scaling configuration for the nodegroup.

> https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group#scaling_config-configuration-block

---

### NodeGroupOptions <a name="@pahud/cdktf-aws-eks.NodeGroupOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { NodeGroupOptions } from '@pahud/cdktf-aws-eks'

const nodeGroupOptions: NodeGroupOptions = { ... }
```

##### `capacityType`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupOptions.property.capacityType"></a>

```typescript
public readonly capacityType: CapacityType;
```

- *Type:* [`@pahud/cdktf-aws-eks.CapacityType`](#@pahud/cdktf-aws-eks.CapacityType)
- *Default:* CapacityType.ON_DEMAND

capacity type of the nodegroup.

---

##### `dependsOn`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupOptions.property.dependsOn"></a>

```typescript
public readonly dependsOn: ITerraformDependable[];
```

- *Type:* [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[]

resources to depend on;

---

##### `instanceTypes`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupOptions.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* `string`[]
- *Default:* ['t3.large']

instance types of the nodegroup.

---

##### `nodeRole`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupOptions.property.nodeRole"></a>

```typescript
public readonly nodeRole: string;
```

- *Type:* `string`
- *Default:* The IAM role for the default nodegroup.

nodegroup role arn.

---

##### `scalingConfig`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupOptions.property.scalingConfig"></a>

```typescript
public readonly scalingConfig: ScalingConfig;
```

- *Type:* [`@pahud/cdktf-aws-eks.ScalingConfig`](#@pahud/cdktf-aws-eks.ScalingConfig)

scaling configuration for the nodegroup.

> https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group#scaling_config-configuration-block

---

##### `subnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupOptions.property.subnets"></a>

```typescript
public readonly subnets: string[];
```

- *Type:* `string`[]

subnet IDs for the nodegroup.

---

### NodeGroupProps <a name="@pahud/cdktf-aws-eks.NodeGroupProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { NodeGroupProps } from '@pahud/cdktf-aws-eks'

const nodeGroupProps: NodeGroupProps = { ... }
```

##### `capacityType`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.capacityType"></a>

```typescript
public readonly capacityType: CapacityType;
```

- *Type:* [`@pahud/cdktf-aws-eks.CapacityType`](#@pahud/cdktf-aws-eks.CapacityType)
- *Default:* CapacityType.ON_DEMAND

capacity type of the nodegroup.

---

##### `dependsOn`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.dependsOn"></a>

```typescript
public readonly dependsOn: ITerraformDependable[];
```

- *Type:* [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[]

resources to depend on;

---

##### `instanceTypes`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* `string`[]
- *Default:* ['t3.large']

instance types of the nodegroup.

---

##### `nodeRole`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.nodeRole"></a>

```typescript
public readonly nodeRole: string;
```

- *Type:* `string`
- *Default:* The IAM role for the default nodegroup.

nodegroup role arn.

---

##### `scalingConfig`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.scalingConfig"></a>

```typescript
public readonly scalingConfig: ScalingConfig;
```

- *Type:* [`@pahud/cdktf-aws-eks.ScalingConfig`](#@pahud/cdktf-aws-eks.ScalingConfig)

scaling configuration for the nodegroup.

> https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group#scaling_config-configuration-block

---

##### `clusterName`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* `string`

cluster name.

---

##### `subnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.NodeGroupProps.property.subnets"></a>

```typescript
public readonly subnets: string[];
```

- *Type:* `string`[]

subnet IDs for the nodegroup.

---

### ScalingConfig <a name="@pahud/cdktf-aws-eks.ScalingConfig"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { ScalingConfig } from '@pahud/cdktf-aws-eks'

const scalingConfig: ScalingConfig = { ... }
```

##### `desiredCapacity`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ScalingConfig.property.desiredCapacity"></a>

```typescript
public readonly desiredCapacity: number;
```

- *Type:* `number`

---

##### `maxCapacity`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ScalingConfig.property.maxCapacity"></a>

```typescript
public readonly maxCapacity: number;
```

- *Type:* `number`

---

##### `minCapacity`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ScalingConfig.property.minCapacity"></a>

```typescript
public readonly minCapacity: number;
```

- *Type:* `number`

---

## Classes <a name="Classes"></a>

### KubernetesVersion <a name="@pahud/cdktf-aws-eks.KubernetesVersion"></a>

Kubernetes cluster version.


#### Static Functions <a name="Static Functions"></a>

##### `of` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.of"></a>

```typescript
import { KubernetesVersion } from '@pahud/cdktf-aws-eks'

KubernetesVersion.of(version: string)
```

###### `version`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.KubernetesVersion.parameter.version"></a>

- *Type:* `string`

custom version number.

---

#### Properties <a name="Properties"></a>

##### `version`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* `string`

cluster version number.

---

#### Constants <a name="Constants"></a>

##### `V1_14` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_14"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.14.

---

##### `V1_15` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_15"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.15.

---

##### `V1_16` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_16"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.16.

---

##### `V1_17` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_17"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.17.

---

##### `V1_18` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_18"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.18.

---

##### `V1_19` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_19"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.19.

---

##### `V1_20` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_20"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.20.

---

##### `V1_21` <a name="@pahud/cdktf-aws-eks.KubernetesVersion.property.V1_21"></a>

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes version 1.21.

---


## Enums <a name="Enums"></a>

### CapacityType <a name="CapacityType"></a>

#### `SPOT` <a name="@pahud/cdktf-aws-eks.CapacityType.SPOT"></a>

---


#### `ON_DEMAND` <a name="@pahud/cdktf-aws-eks.CapacityType.ON_DEMAND"></a>

---

