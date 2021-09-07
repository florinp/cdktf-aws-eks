# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### AmazonEKS <a name="@pahud/cdktf-aws-eks.AmazonEKS"></a>

#### Initializers <a name="@pahud/cdktf-aws-eks.AmazonEKS.Initializer"></a>

```typescript
import { AmazonEKS } from '@pahud/cdktf-aws-eks'

new AmazonEKS(scope: Construct, id: string, props?: AmazonEKSProps)
```

##### `scope`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKS.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKS.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKS.parameter.props"></a>

- *Type:* [`@pahud/cdktf-aws-eks.AmazonEKSProps`](#@pahud/cdktf-aws-eks.AmazonEKSProps)

---



#### Properties <a name="Properties"></a>

##### `privateSubnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKS.property.privateSubnets"></a>

- *Type:* `string`[]

---

##### `publicSubnets`<sup>Required</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKS.property.publicSubnets"></a>

- *Type:* `string`[]

---


## Structs <a name="Structs"></a>

### AmazonEKSProps <a name="@pahud/cdktf-aws-eks.AmazonEKSProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AmazonEKSProps } from '@pahud/cdktf-aws-eks'

const amazonEKSProps: AmazonEKSProps = { ... }
```

##### `clusterName`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKSProps.property.clusterName"></a>

- *Type:* `string`

---

##### `privateSubnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKSProps.property.privateSubnets"></a>

- *Type:* `string`[]

---

##### `publicSubnets`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKSProps.property.publicSubnets"></a>

- *Type:* `string`[]

---

##### `region`<sup>Optional</sup> <a name="@pahud/cdktf-aws-eks.AmazonEKSProps.property.region"></a>

- *Type:* `string`

---



