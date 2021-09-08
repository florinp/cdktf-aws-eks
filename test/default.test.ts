import { App, TerraformStack } from 'cdktf';
import { Cluster, KubernetesVersion } from '../src';


test('default', () => {
  const app = new App();

  const stack = new TerraformStack(app, 'cdktf-eks-demo');

  const env = {
    region: 'ap-northeast-1',
    availabilityZones: ['ap-northeast-1a', 'ap-northeast-1c', 'ap-northeast-1d'],
  };

  new Cluster(stack, 'Cluster', {
    version: KubernetesVersion.V1_21,
    region: env.region,
    availabilityZones: env.availabilityZones,
  });

  expect(stack.toTerraform());
});
