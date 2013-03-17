module('Ordr App integration tests: Tables', {
  setup: function () {
    App.reset();
  }
});

test('Initial Redirect', function(){
  expect(1);
  visit('/').then(function () {
    equal(path(), 'tables.index', 'Redirects to /tables');
  });
});

test('Displays six tables', function(){
  expect(1);
  visit('/tables').then(function () {
    equal(find('#tables a').length, 6, 'Six tables display');
  });
});

test('Table 2, food menu', function () {
  expect(3);
  visit('/tables/2').then(function () {
    equal(find('div.nine h2').text(), 'Table 2', 'Table 2 heading displayed');
    equal(find('#customer-tab li h3:first').text(), 'Click a food to add it', 'Has call to action text');
    equal(find('#menu li > a').length, 5, 'Has food menu with 5 choices');
  });
});
