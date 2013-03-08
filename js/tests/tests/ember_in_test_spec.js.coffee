# Asset manager is not compiling as of commit 3/7
describe 'initializing the app', ->
  beforeEach ->
    setTestMode()
  it 'sends me to tables.index', ->
	currentPath
    Ember.run ->
      currentPath = App.__container__.lookup('controller:application').get('currentPath')
    expect(currentPath).to.equal('tables.index')

#describe('initializing the app', function() {
#
#  beforeEach(function () {
#    setTestMode();
#  });
#
#  it('sends me to tables.index', function() {
#    var currentPath;
#    Ember.run(function() {
#      currentPath = App.__container__.lookup('controller:application').get('currentPath');
#    });
#    expect(currentPath).to.equal('tables.index');
#  });
#});
