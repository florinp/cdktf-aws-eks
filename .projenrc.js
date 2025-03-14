const {
  ConstructLibraryCdktf,
  NpmAccess,
  DevEnvironmentDockerImage,
  Gitpod,
} = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new ConstructLibraryCdktf({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdktfVersion: '0.8.1',
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
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
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


const gitpodPrebuild = project.addTask('gitpod:prebuild', {
  description: 'Prebuild setup for Gitpod',
});
// install and compile only, do not test or package.
gitpodPrebuild.exec('yarn install --frozen-lockfile --check-files');
gitpodPrebuild.exec('npx projen compile');

let gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromImage('public.ecr.aws/pahudnet/gitpod-workspace:latest'),
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

gitpod.addCustomTask({
  init: 'yarn gitpod:prebuild',
  // always upgrade after init
  command: 'npx projen upgrade',
});

gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'ms-azuretools.vscode-docker',
  'AmazonWebServices.aws-toolkit-vscode',
);

const common_exclude = ['cdktf.out', 'yarn-error.log', 'dependabot.yml', '.terraform', 'terraform.*'];
project.npmignore.exclude(...common_exclude, 'images', 'docs', 'website');
project.gitignore.exclude(...common_exclude);

project.synth();
