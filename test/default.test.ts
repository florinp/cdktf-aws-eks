import { App, TerraformStack } from 'cdktf';
import { AmazonEKS } from '../src';


test('default', () => {
  const app = new App();

  const stack = new TerraformStack(app, 'cdktf-eks-demo');

  new AmazonEKS(stack, 'AmazonEKS');

  expect(stack.toTerraform());
});
