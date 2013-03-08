// Settings file

// Globals
expect = chai.expect;

function setTestMode() {
  Ember.testing = true;
  Ember.Router.reopen({
    location: 'none'
  });
}
