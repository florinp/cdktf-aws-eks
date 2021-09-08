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



#### Properties <a name="Properties"></a>

##### `clusterName`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.clusterName"></a>

- *Type:* `string`

---

##### `privateSubnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.privateSubnets"></a>

- *Type:* `string`[]

---

##### `props`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.props"></a>

- *Type:* [`@pahud/cdktf-aws-eks.ClusterProps`](#@pahud/cdktf-aws-eks.ClusterProps)

---

##### `publicSubnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.Cluster.property.publicSubnets"></a>

- *Type:* `string`[]

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

- *Type:* [`@pahud/cdktf-aws-eks.KubernetesVersion`](#@pahud/cdktf-aws-eks.KubernetesVersion)

Kubernetes cluster version.

---

##### `availabilityZones`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.availabilityZones"></a>

- *Type:* `string`[]

list of available zones in the region for a new VPC.

---

##### `capacityType`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.capacityType"></a>

- *Type:* [`@pahud/cdktf-aws-eks.CapacityType`](#@pahud/cdktf-aws-eks.CapacityType)
- *Default:* CapacityType.ON_DEMAND

capacity type of the nodegroup.

---

##### `clusterName`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.clusterName"></a>

- *Type:* `string`

The Amazon EKS cluster name.

---

##### `desiredCapacity`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.desiredCapacity"></a>

- *Type:* `number`
- *Default:* 1

The desired capacity for the nodegroup.

---

##### `instanceTypes`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.instanceTypes"></a>

- *Type:* `string`[]
- *Default:* ['t3.large']

instance types of the default nodegroup.

---

##### `maxCapacity`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.maxCapacity"></a>

- *Type:* `number`
- *Default:* minCapacity + 1

max capacity for the nodegroup.

---

##### `minCapacity`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.minCapacity"></a>

- *Type:* `number`
- *Default:* desiredCapacity

min capacity for the nodegroup.

---

##### `privateSubnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.privateSubnets"></a>

- *Type:* `string`[]

list of private subnetIds for an existing VPC.

---

##### `publicSubnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.publicSubnets"></a>

- *Type:* `string`[]

list of public subnetIds for an existing VPC.

---

##### `region`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.ClusterProps.property.region"></a>

- *Type:* `string`

The AWS region to deploy.

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

