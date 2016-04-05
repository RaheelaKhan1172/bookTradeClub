exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:3030',
  specs: ['public/*[!lib]*/tests/e2e/*.js'],
  directConnect: true,
    capabilities: {
      browserName: 'chrome',
    }
}
