describe 'Tables on initial startup', ->

  beforeEach ->
    Ember.run ->
      @tablesController = App.TablesController.create()

  xit 'should have 6 tables', ->
    Ember.run ->
      anchors = $('#tables a')
      expect(anchors).to.have.length 6
