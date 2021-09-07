const { ConstructLibraryCdktf } = require('projen');
const project = new ConstructLibraryCdktf({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdktfVersion: '0.4.0',
  defaultReleaseBranch: 'main',
  name: 'cdktf-samples',
  repositoryUrl: 'https://github.com/pahud/cdktf-samples',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
});
project.synth();