describe 'Tables on initial startup', ->

  it 'should have 6 tables', ->
    App.ready = ->
      Ember.run ->
        anchors = $('#tables a')
      expect(anchors).to.have.length 6
