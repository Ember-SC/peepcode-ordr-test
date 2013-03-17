/*globals App, getFoodController*/

module('Ordr App unit tests: Food Controller', {
  setup: function () {
    App.reset();
    visit('/tables/1');
  }
});

test('Add food to tabItems', function() {
  expect(7);

  var controller = getFoodController();
  ok(controller, 'Food controller is ok');
  ok(controller.addFood, 'Food controller has addFood action');

  var tabItems = controller.get('controllers.table.tab.tabItems');
  ok(tabItems, 'Food controller can access food items');
  equal(tabItems.get('content').length, 0, 'tabItems are empty');

  var cheese, foods = [];
  Ember.run(function () {
    cheese = App.Food.createRecord({
      id: 500,
      name: 'cheese',
      imgUrl: '',
      cents: 100
    });
    controller.addFood(cheese);
    tabItems.get('content').forEach(function(food){
      foods.push( food.record.toJSON() );
    });
  });
  equal(tabItems.get('content').length, 1, 'Added food to tabItems');
  equal(foods.length, 1, 'tabItems has one food');
  equal(foods[0].cents, 100, 'added food cost is 100 cents');
});
