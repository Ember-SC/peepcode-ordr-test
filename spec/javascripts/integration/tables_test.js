//= require spec_helper

/*
var menu = $('#menu li a');
var tables = $('#tables a');
var tableNumber = $('div.nine h2 span').text();
var total = $('#total h3 span').text();
var addFoodText = $('#customer-tab li h3')[0].firstChild
*/
pavlov.specify("Ordr App integration tests", function(){

  describe("Tables", function () {

    before(function(){
      Ember.run(App, App.advanceReadiness);
    });

    after(function(){
      App.reset();
    });

    describe("Initial state", function(){

      it("should redirect to '/tables'", async(function(){
        visit('/').then(function () {
          assert(testing(App).path()).equals('tables.index');
          resume();
        });
      }));

      it("should display six tables", async(function(){
        visit('/tables').then(function () {
          assert(find('#tables a').length).equals(6);
          resume();
        });
      }));
    });

    describe("Table 2", function () {

      it("should display food menu with 5 choices and placeholder text", async(function(){
        expect(3);
        visit('/tables/2').then(function () {
          assert(find('div.nine h2 span').text()).equals("2");
          assert(find('#customer-tab li h3:first').text()).equals("Click a food to add it");
          assert(find('#menu li > a').length).equals(5);
          resume();
        });
      }));
    });
  });

});
