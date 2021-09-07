const { ConstructLibraryCdktf, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new ConstructLibraryCdktf({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdktfVersion: '0.5.0',
  defaultReleaseBranch: 'main',
  name: '@pahud/cdktf-aws-eks',
  description: 'CDKTF construct library for Amazon EKS',
  repositoryUrl: 'https://github.com/pahud/cdktf-aws-eks',
  deps: [
    '@cdktf/provider-aws',
    '@cdktf/provider-kubernetes',
  ],
  peerDeps: [
    '@cdktf/provider-aws',
    '@cdktf/provider-kubernetes',
  ],
  minNodeVersion: '12.20.0',
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
});

const common_exclude = ['cdktf.out', 'yarn-error.log', 'dependabot.yml', '.terraform', 'terraform.*'];
project.npmignore.exclude(...common_exclude, 'images', 'docs', 'website');
project.gitignore.exclude(...common_exclude);

project.synth();
