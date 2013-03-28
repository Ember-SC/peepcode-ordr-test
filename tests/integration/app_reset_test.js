
var testReset = function(){
    start();
    // ok(App.isInitialized);
    equal(Ember.$('h1').text(), 'Ordr', "Application template is in DOM");
    stop();
    resetApp();
}

module("App.reset ", {
  setup: function() {
    stop()
    App.then(function(){
        start();
    });
  },

  teardown: function(){
    stop();
    App.reset();
    App.then(function(){
        start();
    });
  }
});

asyncTest("Calling App.reset() multiple times works", function(){
    expect(4);
    setTimeout(testReset, 500);
    setTimeout(testReset, 1000);
    setTimeout(testReset, 1500);
    setTimeout(function(){
        start();
        ok(App.isInitialized);
    }, 2000);
});