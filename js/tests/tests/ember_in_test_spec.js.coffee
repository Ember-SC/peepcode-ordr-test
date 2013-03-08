# Asset manager is not compiling as of commit 3/7
describe 'initializing the app', ->
  # beforeEach ->
  #   setTestMode()
  it 'sends me to tables.index', ->
    path = ""
    Ember.run( ->
      App.initialize()
    )
    Ember.run( ->
      path = App.__container__.lookup('controller:application').get('currentPath')
    )
    expect(path).to.equal('tables.index')
