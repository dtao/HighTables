HighTables.Table = function(element) {
  $.extend(this, new HighTables.Base(element));

  var table = this.element;
  var chart;
  var firstRow;
  var bodyRows;
  var columnCount;
  var rowCount;

  function getCellValue(cell, numeric) {
    var text = cell.text() || cell.find("input").val();

    if (numeric) {
      return HighTables.Parse.number(text);
    } else {
      return text;
    }
  }

  this.getCellValue = getCellValue;

  this.getOrCreateChart = function() {
    if (!chart) {
      chart = $("<div>").addClass("chart");
      chart.attr("id", "chart-" + $(".chart").length + 1);
      chart.insertBefore(table);
    }
    return chart;
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
    return getCellValue(this.firstRow().find("th:nth-child(" + (index + 1) + ")"));
  };

  this.getColumnData = function(index, options) {
    options = options || { numeric: true };
    return this.bodyRows().map(function() {
      var cell = $(this).find("td:nth-child(" + (index + 1) + ")");
      return getCellValue(cell, options.numeric);
    });
  };

  this.getRowHeader = function(index) {
    return getCellValue(table.find("tr:nth-child(" + (index + 1) + ")").find("td:first"));
  };

  this.getRowData = function(index, options) {
    options = options || { numeric: true };
    return table.find("tr:nth-child(" + (index + 1) + ")").find("td:gt(0):not(.exclude-from-chart),th:gt(0):not(.exclude-from-chart)").map(function() {
      return getCellValue($(this), options.numeric);
    });
  };
};
