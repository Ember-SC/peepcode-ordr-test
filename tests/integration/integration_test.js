/*
var menu = $('#menu li a');
var tables = $('#tables a');
var tableNumber = $('div.nine h2 span').text();
var total = $('#total h3 span').text();
var addFoodText = $('#customer-tab li h3')[0].firstChild
*/
describe('initializing the app', function() {

  var initialized = false;

//  beforeEach(function(){
//    if (true || !initialized) {
//      initialized = true;
//      resetApp();
//      waits(500);
//      runs(function(){});
//    }
//  });

  describe('Integration tests', function(){

    it(' sends me to tables.index on first load', function() {
      var path, anchors, selectText, tableNumber, customerTabText;
      Ember.run(function() {
        setTestMode();
//        resetApp();
//        Ember.run.schedule('actions', this, function() {
//          expect(App.isInitialized).toEqual(true);
//        });
      });
//      waits(500);
//      runs(function(){});
      path = '';
      Ember.run(function() {
        path = App.__container__.lookup('controller:application').get('currentPath');
        Ember.run.schedule('actions', this, function() {
          expect(path).toEqual('tables.index');
        });
      });
      Ember.run(function() {
        anchors = $('#tables a');
        selectText = $('div.eight h2').text();
        Ember.run.schedule('actions', this, function(){
          expect(anchors.length).toEqual(6);
          expect(selectText).toEqual("Select a table at left");
        });
      });
      Ember.run(function() {
        $("[href='/tables/2']").click();
        Ember.run.schedule('actions', this, function() {
          tableNumber = $('div.nine h2 span').text();
          customerTabText = $('#customer-tab li h3:first').text();
          expect(tableNumber).toEqual('2');
          expect(customerTabText).toEqual("Click a food to add it");
        });
      });
    });

  });

});
