window.HighTables = window.HighTables || {};

HighTables.Table = function(element) {
  var table = $(element);
  var chartId;
  var firstRow;
  var columnCount;

  function getCellValue(cell, numeric) {
    if (numeric) {
      return parseFloat(cell.text().replace(/,/g, ""));
    } else {
      return cell.text();
    }
  }

  this.chartId = function() {
    if (!chartId) {
      chartId = table.data("chart");
    }
    return chartId;
  };

  this.firstRow = function() {
    if (!firstRow) {
      firstRow = table.find("tr:first");
    }
    return firstRow;
  };

  this.columnCount = function() {
    if (!columnCount) {
      columnCount = this.firstRow().find("th").length;
    }
    return columnCount;
  };

  this.getColumnHeader = function(index) {
    return this.firstRow().find("th:nth-child(" + (index + 1) + ")").text();
  };

  this.getColumnData = function(index, options) {
    options = options || { numeric: true };
    return table.find("tr:gt(0)").map(function() {
      var cell = $(this).find("td:nth-child(" + (index + 1) + ")");
      return getCellValue(cell, options.numeric);
    });
  };
};
