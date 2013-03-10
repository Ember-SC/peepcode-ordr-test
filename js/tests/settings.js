// Settings file

// Globals
expect = chai.expect;

// Put Ember in test mode

var setTestMode = function() {
  Ember.testing = true;
  Ember.Router.reopen({
    location: 'none'
  });
};
