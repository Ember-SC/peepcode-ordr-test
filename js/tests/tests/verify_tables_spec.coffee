describe 'Tables on initial startup', ->

  beforeEach ->
    resetApp()

  it 'should have 6 tables', ->
    App.ready = ->
      Ember.run ->
        anchors = $('#tables a')
      expect(anchors).to.have.length 6
