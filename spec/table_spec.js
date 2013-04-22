// See the table in SpecRunner.html

describe("HighTables.Table", function() {
  var table;

  beforeEach(function() {
    table = table || new HighTables.Table(document.getElementById("spec-table"));
  });

  describe("getColumnData", function() {
    beforeEach(function() {
      window.context = table;
      window.func = table.getColumnData;
    });

    it("returns an array of values (not including header) for the given column", function() {
      test(0, [1, 3, 5]);
    });
  });
});
