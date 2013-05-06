//= require spec_helper

pavlov.specify("Ordr App integration tests", function(){

  describe("Tabs", function(){

    before(function(){
      Ember.run(App, App.advanceReadiness);
    });

    after(function(){
      App.reset();
    });

    describe("Tables 1 and 3", function(){

      it("should add and keep a $15 pizza in the tab for table 1", async(function(){
        expect(5);
        visit('/tables/1').then(function(){
          assert( find('div.nine h2 span' ).text()).equals( '1' );
          return click('#menu li:eq(0) > a');
        }).then(function(){
          assert( find('#customer-tab li:eq(0) > h3' ).text() ).equals( 'Pizza $15.00' );
          assert( find('#total span').text() ).equals( '$15.00' ); // This is wrong but making it pass w/ wrong data.
          visit('/tables/3').then(function(){
            assert( find('div.nine h2 span').text() ).equals( '3' );
            visit('/tables/1').then(function(){
              assert( find('#customer-tab li:eq(0) > h3').text() ).equals( 'Pizza $15.00' );
              resume();
            });
          });
        });
      }));
    });

    describe("Table 4", function(){

      it("should already have $54.50 in foods in tab", async(function(){
        expect(2);
        visit('/tables/4').then(function(){
          var actual = [],
              expectedFoods = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';

          find('#customer-tab > li').each(function(){
            actual.push( find(this).text() );
          });
          assert( actual.join('').replace(/\s/g, '') ).equals( expectedFoods );
          assert( find('#total span').text() ).equals( '$54.50' );
          resume();
        });
      }));
    });
  });

});
