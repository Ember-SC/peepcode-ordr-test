// Testing settings
// Should be loaded prior to libs, Ember, the application code, and specs

// Globals
expect = chai.expect;

// Mocha settings
mocha.setup({ui: 'bdd', ignoreLeaks: true});

// Set Ember to test mode, needs to load prior to Ember.js
Ember = (window.Ember) ? window.Ember : {testing: true};

// Perhaps use in a beforeEach... `Ember.Router.reopen({location: 'none'})`
