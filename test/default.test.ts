import { App, TerraformStack, Testing } from 'cdktf';
import { Cluster, KubernetesVersion } from '../src';

describe('Unit testing using snapshots', () => {
  it('default', () => {
    expect(
      Testing.synthScope(() => {
        const app = new App();
        const stack = new TerraformStack(app, 'cdktf-eks-demo');
        new Cluster(stack, 'Cluster', {
          version: KubernetesVersion.V1_21,
        });
      })).
      toMatchSnapshot();
  });
});


