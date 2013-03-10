// Settings file

// Globals
expect = chai.expect;
// Ignore global leaks for now
mocha.setup({ignoreLeaks: true});

function setTestMode() {
  // Ember.testing = true;
  Ember.Router.reopen({
    location: 'none'
  });
}
setTestMode();
