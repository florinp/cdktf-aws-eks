import { App, TerraformStack } from 'cdktf';
import { KubernetesVersion, Cluster, CapacityType } from '.';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

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
  instanceTypes: ['t3.large', 'c5.large', 'm5.large'],
});

app.synth();
