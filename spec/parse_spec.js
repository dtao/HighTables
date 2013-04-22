describe("HighTables.Parse", function() {
  describe("number", function() {
    beforeEach(function() {
      window.context = null;
      window.func = HighTables.Parse.number;
    });

    it("parses whole numbers", function() {
      test("20", 20);
    });

    it("parses decimal numbers", function() {
      test("3.14", 3.14);
    });

    it("safely ignores commas", function() {
      test("20,000", 20000);
    });

    it("safely ignores leading dollar signs", function() {
      test("$100.99", 100.99);
    });

    it("safely ignores trailing percent signs", function() {
      test("75%", 75);
    });

    it("ignores any words other than the number", function() {
      test("99 bottles", 99);
    });

    it("returns null if no number is found", function() {
      test("foo", null);
    });
  });
});
