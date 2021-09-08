import { App, TerraformStack } from 'cdktf';
import { Cluster, KubernetesVersion } from '../src';


test('default', () => {
  const app = new App();

  const stack = new TerraformStack(app, 'cdktf-eks-demo');

  new Cluster(stack, 'Cluster', {
    region: 'ap-northeast-1',
    version: KubernetesVersion.V1_21,
  });

  expect(stack.toTerraform());
});
