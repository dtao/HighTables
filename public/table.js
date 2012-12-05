window.HighTables = window.HighTables || {};

HighTables.Table = function(element) {
  var table = $(element);
  var chartId;
  var firstRow;
  var bodyRows;
  var columnCount;
  var rowCount;

  function getCellValue(cell, numeric) {
    if (numeric) {
      return HighTables.Parse.number(cell.text());
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

  this.bodyRows = function() {
    if (!bodyRows) {
      bodyRows = table.find("tr:gt(0)");
    }
    return bodyRows;
  };

  this.columnCount = function() {
    if (!columnCount) {
      columnCount = this.firstRow().find("th").length;
    }
    return columnCount;
  };

  this.rowCount = function() {
    if (!rowCount) {
      rowCount = table.find("tr").length;
    }
    return rowCount;
  };

  this.getColumnHeader = function(index) {
    return this.firstRow().find("th:nth-child(" + (index + 1) + ")").text();
  };

  this.getColumnData = function(index, options) {
    options = options || { numeric: true };
    return this.bodyRows().map(function() {
      var cell = $(this).find("td:nth-child(" + (index + 1) + ")");
      return getCellValue(cell, options.numeric);
    });
  };

  this.getRowHeader = function(index) {
    return table.find("tr:nth-child(" + (index + 1) + ")").find("td:first").text();
  };

  this.getRowData = function(index, options) {
    options = options || { numeric: true };
    return table.find("tr:nth-child(" + (index + 1) + ")").find("td:gt(0),th:gt(0)").map(function() {
      return getCellValue($(this), options.numeric);
    });
  };
};
