// describe("A Tab", function(){
//     beforeEach(function(){
//         resetApp();
//         waits(200);
//         runs(function(){});
//     });
//     describe(" is like an Order", function(){
//         it(" updates the cents property to the toal of all items.", function(){
//             var tab, tabItem1, tabItem2, cents;
//             Ember.run(function(){
//                 tab = App.Tab.find('1'),
//                 food1 = App.Food.find('1'),
//                 food2 = App.Food.find('2');
//                 tab.get('tabItems').createRecord({
//                     food: food1,
//                     cents: food1.get('cents')
//                 });
//             });
//             cents = tab.get('cents');
//             // expect(cents.get('length')).toEqual(1);
//             expect(cents).toEqual(1500);
//             Ember.run(function(){
//                 tab.get('tabItems').createRecord({
//                     food: food2,
//                     cents: food2.get('cents')
//                 });
//             });
//             expect(tab.get('cents')).toEqual(1800);
//         });
//     });
// });