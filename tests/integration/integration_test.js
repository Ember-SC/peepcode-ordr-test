/*
var menu = $('#menu li a');
var tables = $('#tables a');
var tableNumber = $('div.nine h2 span').text();
var total = $('#total h3 span').text();
var addFoodText = $('#customer-tab li h3')[0].firstChild
*/
module("Integration Test 1", {
  setup: function() {
    stop()
    App.then(function(){
        window.helper = testing(App);
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

test("App is ready ", function(){
    var tables;
    expect(2);
    tables = $('#tables a');
    equal(helper.path(), "tables.index", "The current path is tables.index");
    equal(tables.length, 6, "There are six tables present.");
});

test("test navigateTo helper", function(){
    var tableNumber, customerTabText;
    Ember.run(function() {
        helper.navigateTo('/tables/2');
    });
    equal(helper.path(), "tables.table", "The current path is tables.table");
    tableNumber = $('div.nine h2 span').text();
    customerTabText = $('#customer-tab li h3:first').text();
    equal(tableNumber, "2", "Table number is 2");
    equal(customerTabText, "Click a food to add it", "Placeholder text is visible");
});

test("test using jquery selector and click() can do the same thing", function(){
    var tableNumber, customerTabText;
    Ember.run(function() {
        Ember.$("[href='#/tables/5']").click();
    });
    equal(helper.lastSetURL(), "/tables/5", "Last set URL is tables/5");
    tableNumber = $('div.nine h2 span').text();
    customerTabText = $('#customer-tab li h3:first').text();
    equal(tableNumber, "5", "Table number is 5");
    equal(customerTabText, "Click a food to add it", "Placeholder text is visible");
});