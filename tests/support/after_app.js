var resetApp = function() {
  Ember.run(function(){
    if (App.store) App.store.destroy();
    App.store = App.Store.create();
    App.reset();
  });
};