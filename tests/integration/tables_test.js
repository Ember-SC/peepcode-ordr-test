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
        assert(testing(App).path()).equals('tables.index', "'/' redirects to '/tables'");
        assert(find('#tables a').length).equals(6, "There are six tables present.");
      });
    });

    it("should display foods to add to tab on table 2", function () {
      expect(3);
      visit('/tables/2').then(function () {
        assert(find('div.nine h2 span').text()).equals("2", "Table number is 2");
        assert(find('#customer-tab li h3:first').text()).equals("Click a food to add it", "Placeholder text is visible");
        assert(find('#menu li > a').length).equals(5, 'Food menu has (5) items.');
      });
    });
  });

});
