// Karma configuration
// Generated on Mon Apr 01 2013 20:42:23 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  QUNIT,
  QUNIT_ADAPTER,
  "app/js/libs/jquery-1.8.3.min.js",
  "app/js/libs/handlebars.js",
  "app/js/libs/ember.js",
  "app/js/libs/ember-data.js",
  "tests/support/before_app.js",
  "app/js/templates.js",
  "app/js/app.js",
  "tests/support/test_helper.js",
  "tests/support/after_app.js",
  "tests/integration/**/*.js",
  "tests/unit/**/*.js"
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
browsers = ['Firefox', 'Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
