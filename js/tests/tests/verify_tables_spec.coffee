#var menu = $('#menu li a');
# var tables = $('#tables a');
# var tableNumber = $('div.nine h2 span').text();
# var total = $('#total h3 span').text();
# var addFoodText = $('#customer-tab li h3')[0].firstChild

describe 'Tables', ->

  it 'should have 6', (done) ->
    anchors = false
    Ember.run ->
      anchors = $('#tables a')
    expect(anchors.length).to.equal(6)
    expect(select = $('div.eight h2').text()).to.equal("Select a table at left")
    done()

  it 'clicking on table 2 shows tab for table', (done) ->
    Ember.run ->
      table2 = $("[href='/tables/2']")
      table2.click()
    Ember.run.later ( ->
      tableNumber = $('div.nine h2 span').text()
      expect(tableNumber).to.equal('2')
      expect($('#customer-tab li h3:first').text()).to.equal("Click a food to add it")
      done()
    ), 100




