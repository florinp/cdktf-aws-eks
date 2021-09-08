import { App, TerraformStack } from 'cdktf';
import { Cluster, CapacityType } from './main';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

const env = {
  region: 'ap-northeast-1',
  availabilityZones: ['ap-northeast-1a', 'ap-northeast-1c', 'ap-northeast-1d'],
};

new Cluster(stack, 'demo-cluster', {
  region: env.region,
  availabilityZones: env.availabilityZones,
  clusterName: 'cdktf-eks-demo',
  minCapacity: 1,
  capacityType: CapacityType.SPOT,
});

app.synth();
