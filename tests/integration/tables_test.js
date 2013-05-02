/* globals testing:true */

/*
var menu = $('#menu li a');
var tables = $('#tables a');
var tableNumber = $('div.nine h2 span').text();
var total = $('#total h3 span').text();
var addFoodText = $('#customer-tab li h3')[0].firstChild
*/

pavlov.specify("Ordr App integration tests", function(){

  describe("/tables", function () {

    before(function(){
      Ember.run(App, App.advanceReadiness);
    });

    after(function(){
      App.reset();
    });

    it("should display six tables when launching the app", function () {
      visit('/').then(function () {
        equal(testing(App).path(), 'tables.index', "'/' redirects to '/tables'");
        equal(find('#tables a').length, 6, "There are six tables present.");
      });
    });

    it("should display foods to add to tab on table 2", function () {
      expect(3);
      visit('/tables/2').then(function () {
        equal(find('div.nine h2 span').text(), "2", "Table number is 2");
        equal(find('#customer-tab li h3:first').text(), "Click a food to add it", "Placeholder text is visible");
        equal(find('#menu li > a').length, 5, 'Food menu has (5) items.');
      });
    });
  });

});