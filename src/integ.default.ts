import { App, TerraformStack } from 'cdktf';
import { AmazonEKS } from './main';

const app = new App();

const stack = new TerraformStack(app, 'cdktf-eks-demo');

new AmazonEKS(stack, 'AmazonEKS', {
  region: 'ap-northeast-1',
});

app.synth();
