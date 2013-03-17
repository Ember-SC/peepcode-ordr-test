/*globals Em, Ember, ok, expect, equal, strictEqual, App, getFoodController*/

module('Ordr App unit tests: Models', {
  setup: function () {
    App.reset();
    visit('/tables/4');
  }
});

test('Tab model has total of all items for table 4', function() {
  expect(3);

  ok(App.Tab, 'Food model ok');
  var tab = getFoodController().get('controllers.table.tab');
  ok(tab, 'tab instance ok');

  var total = 0;
  tab.get('tabItems.content').forEach(function(food){
    total += food.record.get('cents');
  });
  strictEqual(tab.get('cents'), total, '5450 cents is the total of the tab');
});

test('Food model created with name, imageUrl and cents', function() {
  expect(5);

  ok(App.Food, 'Food model ok');
  var food;
  Ember.run(function () {
    food = createCheese();
  });
  ok(food, 'created food item');
  equal(food.get('name'), 'Cheese', 'Food Name is Cheese');
  equal(food.get('imageUrl'), 'img/cheese.png', 'Url is img/cheese.png');
  equal(food.get('cents'), 400, 'cents is 400');

  Ember.run(function () {
    food.destroy();
  });
});

test('TabItem model created with food model and cents', function() {
  expect(2);

  ok(App.TabItem, 'TabItem model ok');
  var tabItem;
  Ember.run(function () {
    tabItem = createTabItem(createCheese(), 400);
  });
  equal(tabItem.get('cents'), 400, 'created tabItem with 400 cents');

  Ember.run(function () {
    tabItem.destroy();
  });
});

test('Tab model created with food models', function() {
  expect(3);

  ok(App.Tab, 'Tab model ok');
  var tab, foods = [], foodsSum;
  Ember.run(function () {
    tab = createTabWithCheeseAndCrackers();
  });
  tab.get('tabItems.content').forEach(function(food){
    foods.push(food.record.get('cents'));
  });
  foodsSum = foods.reduce(function (prev, cur) {
    return prev + cur;
  });
  equal(foods.length, 2, 'created tab with two items');
  equal(foodsSum, tab.get('cents'), 'total of tab is 750');

  Ember.run(function () {
    tab.destroy();
  });
});

test('Table', function() {
  expect(2);

  ok(App.Table, 'Table model ok');
  var table;
  Ember.run(function () {
    table = createTable(createTabWithCheeseAndCrackers());
  });
  equal(table.get('tab.tabItems.content').length, 2, 'created table with tab which already has 2 items');

  Ember.run(function () {
    table.destroy();
  });
});

var foodId = 100;

function createFood(name, url, cents){
  return App.Food.createRecord({
    id: foodId ++,
    name: name,
    imageUrl: url,
    cents: cents
  });
}

function createCheese(){
  return createFood('Cheese', 'img/cheese.png', 400);
}

function createCrackers(){
  return createFood('Crackers', 'img/crackers.png', 350);
}

var tabItemId = 500;

function createTabItem(food, cents){
  return App.TabItem.createRecord({
    id: tabItemId ++,
    food: food,
    cents: cents
  });
}

var tabId = 100;

function createTabWithCheeseAndCrackers(){
  var tab = App.Tab.createRecord({
    id: tabId ++
  });
  var tabItems = tab.get('tabItems');
  tabItems.createRecord({
    id: tabItemId ++,
    food: createCheese(),
    cents: 400
  });
  tabItems.createRecord({
    id: tabItemId ++,
    food: createCrackers(),
    cents: 350
  });
  return tab;
}

var tableId = 100;

function createTable(tab){
  return App.Table.createRecord({
    id: tableId ++,
    tab: tab
  });
}
