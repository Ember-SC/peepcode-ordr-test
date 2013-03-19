/*global window,App,Ember,jQuery,$,minispade,describe,it,runs,waits*/

describe('Peepcode Ordr Application Integration Tests', function () {
  var q;

  // Select within qunit fixture element
  q = function (query) {
    return Ember.$(query, '#app-root');
  };
  // Select text and trim
  q.trimText = function (query) {
    return Ember.$.trim( q(query).text() );
  };

  it('should display the h1 and h2 headings on tables index route', function () {
    waits(250);

    runs(function () {
      document.location.hash = "/tables";
    });

    waits(500);

    runs(function () {
      expect(q.trimText('h1')).toEqual('Ordr');
      expect(q.trimText('#order h2')).toEqual('Select a table at left');
    });
  });

  it('should list six (6) tables in a common menu', function () {
    var menuItems;

    waits(750);

    runs(function () {
      document.location.hash = "/tables";
    });

    waits(125);

    runs(function () {
      menuItems = q('#tables a');
    });

    waits(125);

    runs(function () {
      var menuItem;
      expect(menuItems.length).toBe(6);
      for (var i = 0; i < 6; i++) {
        menuItem = q.trimText(menuItems[i]);
        expect(parseInt(menuItem), 10).toBe(i + 1);
      }
    });
  });

  it('should display a menu with five (5) food choices, ready to add to tab for table 1', function () {
    waits(1375);

    runs(function () {
      // Select table 1
      document.location.hash = "/tables/1";
    });

    waits(125);

    runs(function () {
      expect(q('#menu li > a').length).toBe(5);
      expect(q.trimText('#order h2')).toBe('Table 1');
    });
  });

  it('should add pizza to tap on table 1', function () {
    waits(1875);

    runs(function () {
      document.location.hash = "/tables/1";
    });

    waits(125);

    runs(function () {
      q('#menu li:eq(0) > a').trigger('click');
    });

    waits(125);

    runs(function () {
      expect(q.trimText('#customer-tab li:eq(0) > h3')).toBe('Pizza $15.00');
    });
  });

  it('should add fries to tap on table 1', function () {
    waits(2375);

    runs(function () {
      document.location.hash = "/tables/1";
    });

    waits(125);

    runs(function () {
      q('#menu li:eq(2) > a').trigger('click');
    });

    waits(125);

    runs(function () {
      expect(q.trimText('#customer-tab li:eq(1) > h3')).toBe('Fries $7.00');
      expect(q.trimText('#total span')).toBe('$22.00');
    });
  });

  it('should confirm foods already added to tab on table 4', function () {
    var actual = [], expected = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';

    waits(2750);

    runs(function () {
      // Select table 4
      document.location.hash = "/tables/4";
    });

    waits(250);

    runs(function () {
      q('#customer-tab > li').each(function () {
        actual.push(q.trimText(this));
      });
    });

    waits(125);

    runs(function () {
      expect(actual.join('').replace(/\s/g, '')).toBe(expected);
      expect(q.trimText('#total span')).toBe('$54.50');
    });
  });

  it('should table 1 still has a total of $22 after viewing table 4', function () {
    var actual = [], expected = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';

    waits(3375);

    runs(function () {
      // Select table 1
      document.location.hash = "/tables/1";
    });

    waits(125);

    runs(function () {
      expect(q.trimText('#total span')).toBe('$22.00');

      // done back to start...
      document.location.hash = "/tables";
    });
  });

});

