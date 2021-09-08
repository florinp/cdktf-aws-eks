import { App, TerraformStack } from 'cdktf';
import { Cluster } from '../src';


test('default', () => {
  const app = new App();

  const stack = new TerraformStack(app, 'cdktf-eks-demo');

  new Cluster(stack, 'Cluster');

  expect(stack.toTerraform());
});
