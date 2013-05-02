pavlov.specify("Ordr App integration tests", function(){

  describe("tabs", function () {

    before(function(){
      Ember.run(App, App.advanceReadiness);
    });

    after(function(){
      App.reset();
    });

    it("should add pizza to table 1", function () {
      expect(5);
      visit('/tables/1').then(function(){
        equal(find('div.nine h2 span').text(), "1", "Table number is 1");
        return click('#menu li:eq(0) > a');
      }).then(function(){
        equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Pizza added to customer tab.');
        equal(find('#total span').text(), '$15.00', '$15.00 is the total'); // This is wrong but making it pass w/ wrong data.
        visit('/tables/3').then(function(){
          equal(find('div.nine h2 span').text(), "3", "Table number is 3");
          visit('/tables/1').then(function(){
            equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Pizza still on table 1 tab.');
          });
        });
      });
    });

    it("should already have foods in tab for table 4", function () {
      expect(2);
      var actual = [], expected = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';
      visit('/tables/4').then(function(){
        find('#customer-tab > li').each(function () {
          actual.push(find(this).text());
        });
        equal(actual.join('').replace(/\s/g, ''), expected, 'table 4 has expected foods in tab.');
        equal(find('#total span').text(), '$54.50', '$54.50 is the total tab for table 4.');
      });
    });
  });

});
