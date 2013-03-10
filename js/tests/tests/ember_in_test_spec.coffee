describe 'initializing the app', ->
  it 'sends me to tables.index', ->
    path = ''
    Ember.run ->
      path = App.__container__.lookup('controller:application').get('currentPath')
    expect(path).to.equal('tables.index')
