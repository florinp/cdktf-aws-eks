import { TerraformStack, Testing } from 'cdktf';
import { Cluster, KubernetesVersion } from '../src';

Testing.setupJest();
let app = Testing.app();
let stack = new TerraformStack(app, 'test');

describe('Unit testing using snapshots', () => {
  it('default', () => {
    expect(
      Testing.synthScope(() => {
        new Cluster(stack, 'Cluster', {
          version: KubernetesVersion.V1_21,
        });
      })).
      toMatchSnapshot();
  });
});


