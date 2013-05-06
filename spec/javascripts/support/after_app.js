// Move app to an element on the page that is not body so test reporters don't conflict.
document.write('<div id="test-app-container"><div id="ember-testing"></div></div>');
App.rootElement = '#ember-testing';

// setupForTesting(): Defers readiness and sets router location to none;
App.setupForTesting();

// injectTestHelpers() Adds:
// window.visit
// window.click
// window.fillIn
// window.find
App.injectTestHelpers();
