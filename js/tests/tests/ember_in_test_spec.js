// Test we can put ember in testing mode
Ember.testing = true;
Ember.Router.reopen({
    location: 'none'
});
describe("Ember in test mode", function(){
    it("Ember.testing is true", function(){
        chai.expect(Ember.testing).to.be.true;
    });
});
describe("initializing the app", function(){
    it("sends me to tables.index", function(){
        Ember.run(function(){
            App.initialize();
        });
        var currentPath = App.__container__.lookup("controller:application").get('currentPath');
        chai.expect(currentPath).to.equal("tables.index");
    });
});