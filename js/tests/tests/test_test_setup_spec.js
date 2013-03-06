// Verify that our test system works
describe("Simple arithmetic", function() {
  it("adds 2 + 3 to be 5", function() {
    chai.expect(2 + 3).to.equal(5);
  });
});
