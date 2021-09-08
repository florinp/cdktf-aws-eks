[![npm version](https://badge.fury.io/js/@pahud%2Fcdktf-aws-eks.svg)](https://badge.fury.io/js/@pahud%2Fcdktf-aws-eks)
[![release](https://github.com/pahud/cdktf-aws-eks/actions/workflows/release.yml/badge.svg)](https://github.com/pahud/cdktf-aws-eks/actions/workflows/release.yml)
[![construct hub](https://img.shields.io/badge/Construct%20Hub-available-blue)](https://constructs.dev/packages/@pahud/cdktf-aws-eks)

# cdktf-aws-eks

CDKTF construct library for Amazon EKS.

## Usage

The following sample creates a new Amazon EKS cluster and a managed nodegroup in a new VPC in `ap-northeast-1`.

```ts
import { App, TerraformStack } from 'cdktf';
import { Cluster } from '@pahud/cdktf-aws-eks';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

new Cluster(stack, 'demo-cluster', {
  region: 'ap-northeast-1',
  version: KubernetesVersion.V1_21,
  minCapacity: 1,
});

app.synth();
```

## VPC

To create the cluster in a new VPC:

```ts
new Cluster(stack, 'demo-cluster', {
  region: 'ap-northeast-1',
  version: KubernetesVersion.V1_21,
});
```

To deploy in any existing VPC, specify the `privateSubnets` and `publicSubnets`(if any).


```ts
new Cluster(stack, 'demo-cluster', {
  region: 'ap-northeast-1',
  privateSubnets: ['subnet-111','subnet-222','subnet-333' ],
  publicSubnets: ['subnet-444','subnet-555','subnet-666' ],
  version: KubernetesVersion.V1_21,
});
```
