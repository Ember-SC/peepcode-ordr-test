# Verify that our test system works
describe 'Simple arithmetic', ->
  it 'adds 2 + 3 to be 5', ->
    expect(2 + 3).to.equal 5
