[![npm version](https://badge.fury.io/js/@pahud%2Fcdktf-aws-eks.svg)](https://badge.fury.io/js/@pahud%2Fcdktf-aws-eks)
[![PyPI version](https://badge.fury.io/py/pahud-cdktf-aws-eks.svg)](https://badge.fury.io/py/pahud-cdktf-aws-eks)
[![release](https://github.com/pahud/cdktf-aws-eks/actions/workflows/release.yml/badge.svg)](https://github.com/pahud/cdktf-aws-eks/actions/workflows/release.yml)
[![construct hub](https://img.shields.io/badge/Construct%20Hub-available-blue)](https://constructs.dev/packages/@pahud/cdktf-aws-eks)

# cdktf-aws-eks

CDKTF construct library for Amazon EKS.

## Usage

The following sample creates:

1. A new VPC
1. Amazon EKS cluster(control plane)
2. The default nodegroup with the cluster
3. The 2nd nodegroup with spot instances


```ts
// create the cluster and the default nodegroup
const cluster = new Cluster(stack, 'demo-cluster', {
  version: KubernetesVersion.V1_21,
  scalingConfig: { minCapacity: 1 },
});

// create the optional 2nd nodegroup
cluster.addNodeGroup('NG2', {
  scalingConfig: {
    minCapacity: 1,
    maxCapacity: 10,
    desiredCapacity: 5,
  },
  capacityType: CapacityType.SPOT,
  instanceTypes: ['t3.large', 'c5.large', 'm5.large']
})
```

## Existing VPC subnets

To deploy in any existing VPC, specify the `privateSubnets` and `publicSubnets`(if any).

```ts
new Cluster(stack, 'demo-cluster', {
  privateSubnets: ['subnet-111','subnet-222','subnet-333' ],
  publicSubnets: ['subnet-444','subnet-555','subnet-666' ],
  version: KubernetesVersion.V1_21,
});
```
