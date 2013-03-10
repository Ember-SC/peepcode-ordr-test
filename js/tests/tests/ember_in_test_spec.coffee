describe 'initializing the app', ->
  beforeEach ->
    Ember.Router.reopen({location: 'none'})

  it 'sends me to tables.index', ->
    path = ''
    Ember.run ->
      App.initialize()
    Ember.run ->
      path = App.__container__.lookup('controller:application').get('currentPath')
    expect(path).to.equal('tables.index')
