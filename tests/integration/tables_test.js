/*
var menu = $('#menu li a');
var tables = $('#tables a');
var tableNumber = $('div.nine h2 span').text();
var total = $('#total h3 span').text();
var addFoodText = $('#customer-tab li h3')[0].firstChild
*/
module("/tables", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },

  teardown: function(){
    Ember.run(App, App.reset);
  }
});

test("/", function(){
  expect(1);
  visit('/tables').then(function(){
    equal(find('#tables a').length, 6, "There are six tables present.");
  });
});

test("/:table_id", function(){
  expect(3);
  visit('/tables/2').then(function(){
    equal(find('div.nine h2 span').text(), "2", "Table number is 2");
    equal(find('#customer-tab li h3:first').text(), "Click a food to add it", "Placeholder text is visible");
    equal(find('#menu li > a').length, 5, 'Food menu has (5) items.');
  });
});