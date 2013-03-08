// Settings file

// Globals
expect = chai.expect;

// Put Ember in test mode
Ember.testing = true;
Ember.Router.reopen({
    location: 'none'
});
