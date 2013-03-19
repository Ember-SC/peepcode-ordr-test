/*
var menu = $('#menu li a');
var tables = $('#tables a');
var tableNumber = $('div.nine h2 span').text();
var total = $('#total h3 span').text();
var addFoodText = $('#customer-tab li h3')[0].firstChild
*/
describe('initializing the app', function() {

  beforeEach(function(){
      resetApp();
      waits(200);
      runs(function(){});
  });

  describe('Integration tests', function(){

    it(' sends me to tables.index on first load', function() {
      var path;
      path = '';
      Ember.run(function() {
        path = App.__container__.lookup('controller:application').get('currentPath');
      });
      expect(path).toEqual('tables.index');
    });

    it('tables.index should display 6 tables', function() {
      var anchors, selectText;
      Ember.run(function() {
        anchors = $('#tables a');
        selectText = $('div.eight h2').text();
      });
      expect(anchors.length).toEqual(6);
      expect(selectText).toEqual("Select a table at left");
    });
    
    it('clicking on table 2 shows tab for table', function(done) {
      var tableNumber, customerTabText;
      Ember.run(function() {
        $("[href='/tables/2']").click();
      });
      waits(100);
      runs(function() {
        tableNumber = $('div.nine h2 span').text();
        customerTabText = $('#customer-tab li h3:first').text();
        expect(tableNumber).toEqual('2');
        expect(customerTabText).toEqual("Click a food to add it");
      });
    });

  });

});