describe("Tables on initial startup", function () {

  it("should be in its initial state", function () {
    App.ready = function() {
      expect(window.location.hash).to.equal("#/tables");
    };
  });

  it("should have 6 tables", function () {
    App.ready = function () {
      var anchors = $("#tables a");
      expect(anchors).to.have.length(6);
    };
  });
});
