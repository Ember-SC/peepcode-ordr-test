module('Ordr App unit tests: Handlebars Helper', {
  setup: function () {
    App.reset();
  }
});

test('money helper renders default text', function() {
  expect(2);

  var view, cents;
  Ember.run(function () {
    view = Ember.View.create({
      template: Ember.Handlebars.compile('{{money cents}}')
    });
    view.appendTo('#qunit-fixture');
    cents = view.get('cents');
  });
  equal(cents, null, 'Value is not a null');
  strictEqual(view.$().text(), '0.00', 'Renders 0.00 when NaN');
});

test('money helper renders number converted to money format', function() {
  expect(2);

  var view, cents;
  Ember.run(function () {
    view = Ember.View.create({
      template: Ember.Handlebars.compile('{{money view.cents}}'),
      cents: 777
    });
    view.appendTo('#qunit-fixture');
    cents = view.get('cents');
  });
  equal(cents, 777, 'Value is 777');
  strictEqual(view.$().text(), '7.77', 'Renders 7.77 given 777');
});
