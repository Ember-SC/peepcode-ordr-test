module('Ordr App integration tests: Tabs', {
  setup: function () {
    App.reset();
  }
});

test('Tables 1 and 3, adding foods to the tabs', function(){
  expect(5);
  visit('/tables/1').then(function (){
    equal(find('div.nine h2').text(), 'Table 1', 'Table 1 heading displayed');
    return click('#menu li:eq(0) > a');
  }).then(function(){
    equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Added pizza to tab');
    equal(find('#total span').text(), '$15.00', 'Total price updated with pizza price');
    visit('/tables/3').then(function (){
      equal(find('div.nine h2').text(), 'Table 3', 'Table 3 heading displayed');
      visit('/tables/1').then(function (){
        equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Pizza still in tab');
      });
    });
  });
});

test('Table 4, already had foods added to the tab', function(){
  expect(3);
  visit('/tables/4').then(function (){
    var actual = [],
        expectedFoods = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';

    find('#customer-tab > li').each(function (){
      actual.push( find(this).text() );
    });
    equal(find('div.nine h2').text(), 'Table 4', 'Table 4 heading displayed');
    equal(actual.join('').replace(/\s/g, ''), expectedFoods, 'Pizza, Pancakes, Fries, Hot Dogs, Cake already added');
    equal(find('#total span').text(), '$54.50', 'Already has $54.50 in foods in the tab');
  });
});
