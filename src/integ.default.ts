import { App, TerraformStack } from 'cdktf';
import { KubernetesVersion } from '.';
import { Cluster, CapacityType } from './main';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

const env = {
  region: 'ap-northeast-1',
  availabilityZones: ['ap-northeast-1a', 'ap-northeast-1c', 'ap-northeast-1d'],
};

new Cluster(stack, 'demo-cluster', {
  region: env.region,
  // availabilityZones: env.availabilityZones,
  version: KubernetesVersion.V1_21,
  privateSubnets: ['subnet-049c36e0d1462b501', 'subnet-00516170171b3d102', 'subnet-0bf0e41cd28c1dfa0'],
  clusterName: 'cdktf-eks-demo',
  minCapacity: 1,
  capacityType: CapacityType.SPOT,
});

app.synth();
