// Testing settings
// Should be loaded prior to libs, Ember, the application code, and specs

// Globals
expect = chai.expect;

// Ignore global leaks for now
mocha.setup({ui: 'bdd', ignoreLeaks: true});

function setTestMode() {
  Ember.testing = true;
  Ember.Router.reopen({
    location: 'none'
  });
}
setTestMode();