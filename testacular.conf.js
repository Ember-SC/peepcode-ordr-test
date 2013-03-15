// Testacular configuration
// Generated on Fri Mar 15 2013 11:59:17 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '';

preprocessors = {
  "*.coffee": "coffee"
};


// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  "js/tests/chai.js",
  "js/libs/jquery-1.8.3.min.js",
  "js/libs/handlebars.js",
  "js/libs/ember.js",
  "js/libs/ember-data.js",
  "js/tests/before_app.js",
  "js/templates.js",
  "js/app.js",
  "js/tests/after_app.js",
  "js/tests/generated/*.js"
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
