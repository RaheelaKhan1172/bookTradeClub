module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'public/lib/jquery/dist/jquery.js',
      'public/lib/angular/angular.js',
      'public/lib/angular-route/angular-route.js',
      'public/lib/angular-ui-bootstrap/dist/ui-bootstrap.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/application.js',
      'public/users/user.client.module.js',
      'public/users/controllers/user.client.controller.js',
      'public/users/routes/user.client.routes.js',
      'public/*[!lib]*/*.js',
      'public/*[!lib]*/*[!tests]*/*.js',
      'public/*[!lib]*/tests/unit/*.js'
    ],
    plugins: [
      'karma-jasmine',
      'karma-phantomjs2-launcher'
    ],
    reporters: ['progress'],
    browsers: ['PhantomJS2'],
    captureTimeout: 60000,
    singleRun: true,
    port:3030
  });
};
