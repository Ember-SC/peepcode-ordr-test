var resetApp = function() {
  Ember.run(function(){
    App.reset();
  });
  window.helper = testing(App);
};