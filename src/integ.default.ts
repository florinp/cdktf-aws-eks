import { App, TerraformStack } from 'cdktf';
import { KubernetesVersion, Cluster, CapacityType } from '.';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

new Cluster(stack, 'demo-cluster', {
  region: 'ap-northeast-1',
  version: KubernetesVersion.V1_21,
  // privateSubnets: ['subnet-049c36e0d1462b501', 'subnet-00516170171b3d102', 'subnet-0bf0e41cd28c1dfa0'],
  clusterName: 'cdktf-eks-demo',
  minCapacity: 1,
  capacityType: CapacityType.SPOT,
});

app.synth();
