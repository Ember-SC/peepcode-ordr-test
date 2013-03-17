App.ready = function() {

  module('Peepcode Ordr Application Integration Tests');

  test('Given (6) six tables: add food items to the tab on table 1, verify the items/prices on tabs for table 1 and 4', function () {
    var q;

    expect(17);

    // Test helpers
    q = function (query) {
      // Select within qunit fixture element
      return Ember.$(query, '#app-root');
    };
    q.trimText = function (query) {
      return Ember.$.trim( q(query).text() );
    };

    // Headings on tables index route
    setTimeout(function() {
      start();
      document.location.hash = "/tables";
      equal(q.trimText('h1'), 'Ordr', 'Heading is "Ordr".');
      equal(q.trimText('#order h2'), 'Select a table at left', 'Tables index heading correct.');
      stop();
    }, 500);

    // Common table menu
    setTimeout(function() {
      var menuItems;
      start();

      menuItems = q('#tables a');
      equal(menuItems.length, 6, '6 tables in menu.');
      for (var i = 0; i < 6; i++) {
        equal(q.trimText(menuItems[i]), i + 1, 'Passed table menu #' + i + ' is numbered as expected.');
      }

      // Select table 1
      document.location.hash = "/tables/1";
      stop();
    }, 1000);

    // Foods menu
    setTimeout(function() {
      start();
      equal(q('#menu li > a').length, 5, 'Food menu has (5) items.');
      equal(q.trimText('#order h2'), 'Table 1', 'Table 1 Heading correct.');

      // Add pizza to tap on table 1
      q('#menu li:eq(0) > a').trigger('click');
      stop();
    }, 1500);

    // Confirm pizza added to tab on table 1
    setTimeout(function() {
      start();
      equal(q.trimText('#customer-tab li:eq(0) > h3'), 'Pizza $15.00', 'Pizza added to customer tab.');

      // Add fries to tab on table 1
      q('#menu li:eq(2) > a').trigger('click');
      stop();
    }, 2000);

    // Confirm fries added to tab on table 1
    setTimeout(function() {
      start();
      equal(q.trimText('#customer-tab li:eq(1) > h3'), 'Fries $7.00', 'Fries added to customer tab.');
      equal(q.trimText('#total span'), '$22.00', '$22.00 is the total for fries and pizza.');

      // Select table 4
      document.location.hash = "/tables/4";
      stop();
    }, 2500);

    // Confirm foods already in tab on table 4
    setTimeout(function() {
      var actual = [], expected = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';

      start();
      q('#customer-tab > li').each(function () {
        actual.push(q.trimText(this));
      });
      equal(actual.join('').replace(/\s/g, ''), expected, 'table 4 has expected foods in tab.');
      equal(q.trimText('#total span'), '$54.50', '$54.50 is the total tab for table 4.');

      // Select table 1
      document.location.hash = "/tables/1";
      stop();
    }, 3000);

    // Table 1 still has a total after viewing table 4
    setTimeout(function() {
      start();
      equal(q.trimText('#total span'), '$22.00', '$22.00 is still the total for table 1.');
      document.location.hash = "/tables";
    }, 3500);

    stop();
  });

}