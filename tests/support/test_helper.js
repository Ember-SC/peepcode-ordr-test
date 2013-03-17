(function (host) {
  var document = host.document;
  var App = host.App;

  var testing = function(){
    var helper = {
      container: function(){
        return App.__container__;
      },
      controller: function( name ){
        return helper.container().lookup('controller:' + name);
      },
      path: function(){
        return helper.controller('application').get('currentPath');
      }
    };
    return helper;
  };

  Ember.Test.registerHelper('path', function() {
    return testing().path();
  });

  Ember.Test.registerHelper('getFoodController', function() {
    return testing().controller('food');
  });

  // Move app to an element on the page so it can be seen while testing.
  document.write('<div id="test-app-container"><div id="ember-testing"></div></div>');
  App.rootElement = '#ember-testing';
  App.setupForTesting();
  App.injectTestHelpers();

}(window));
