# cdktf-aws-eks

CDKTF construct library for Amazon EKS.

## Usage

The following sample creates a default Amazon EKS cluster and managed nodegroup.

```ts
import { App, TerraformStack } from 'cdktf';
import { AmazonEKS } from '@pahud/cdktf-aws-eks';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

new AmazonEKS(stack, 'AmazonEKS', {
  region: 'us-east-1',
});

app.synth();
```
