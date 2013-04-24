// See the table in SpecRunner.html

describe("HighTables.Table", function() {
  var table;

  describe("basic usage", function() {
    beforeEach(function() {
      table = new HighTables.Table(document.getElementById("basic-table"));
    });

    describe("getColumnData", function() {
      beforeEach(function() {
        window.context = table;
        window.func = table.getColumnData;
      });

      it("returns an array of values (not including header) for the given column", function() {
        test(0, [1, 3, 5]);
      });

      it("supports data in descending order", function() {
        test([0, { order: "descending" }], [5, 3, 1]);
      });
    });

    describe("getRowData", function() {
      beforeEach(function() {
        window.context = table;
        window.func = table.getRowData;
      });

      it("returns an array of values (not including header) for the given row", function() {
        test(1, [2]);
      });
    });
  });

  describe("more advanced usage", function() {
    beforeEach(function() {
      table = new HighTables.Table(document.getElementById("advanced-table"));
    });

    describe("getRowData", function() {
      beforeEach(function() {
        window.context = table;
        window.func = table.getRowData;
      });

      it("returns an array of values (not including header) for the given row", function() {
        test(1, [3]);
      });
    });
  });
});
