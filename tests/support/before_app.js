// Testing settings
// Should be loaded prior to libs, Ember, the application code, and specs

function setTestMode() {
  Ember.testing = true;
  Ember.Router.reopen({
    location: 'none'
  });
}
setTestMode();