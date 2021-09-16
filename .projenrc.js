const { ConstructLibraryCdktf, DependenciesUpgradeMechanism, NpmAccess } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new ConstructLibraryCdktf({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdktfVersion: '0.6.0',
  defaultReleaseBranch: 'main',
  name: '@pahud/cdktf-aws-eks',
  description: 'CDKTF construct library for Amazon EKS',
  repositoryUrl: 'https://github.com/pahud/cdktf-aws-eks',
  deps: [
    '@cdktf/provider-aws',
    '@cdktf/provider-kubernetes',
    'constructs@^10',
  ],
  peerDeps: [
    '@cdktf/provider-aws',
    '@cdktf/provider-kubernetes',
  ],
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
  npmAccess: NpmAccess.PUBLIC,
  publishToPypi: {
    distName: 'pahud-cdktf-aws-eks',
    module: 'pahud_cdktf_aws_eks',
  },
});


const packageJson = project.tryFindObjectFile('package.json');
packageJson.addOverride('peerDependencies.constructs', '^10');
packageJson.addOverride('devDependencies.constructs', '^10');


const common_exclude = ['cdktf.out', 'yarn-error.log', 'dependabot.yml', '.terraform', 'terraform.*'];
project.npmignore.exclude(...common_exclude, 'images', 'docs', 'website');
project.gitignore.exclude(...common_exclude);

project.synth();
