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

  function getCellValueAt(rowIndex, columnIndex, numeric) {
    var cell = table.find("tr:nth-child(" + (rowIndex + 1) + ")")
      .find("th:nth-child(" + columnIndex + "), td:nth-child(" + columnIndex + ")");
    return getCellValue(cell, numeric);
  }

  function getValueOrDefault(object, key, defaultValue) {
    if (key in object) {
      return object[key];
    }
    return defaultValue;
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
      columnCount = this.firstRow().find("td,th").length;
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
    return getCellValue(this.firstRow().find("td:nth-child(" + (index + 1) + "),th:nth-child(" + (index + 1) + ")"));
  };

  this.getColumnData = function(index, options) {
    options = options || {};

    // Ugh -- jQuery removes items when the function passed to map returns null.
    var columnData = [];
    this.bodyRows().each(function() {
      var cell = $(this).find("td:nth-child(" + (index + 1) + ")");
      columnData.push(getCellValue(cell, getValueOrDefault(options, "numeric", true)));
    });

    if (options.order === "descending") {
      columnData.reverse();
    }

    return columnData;
  };

  this.getRowHeader = function(index) {
    return getCellValue(table.find("tr:nth-child(" + (index + 1) + ")").find("td:first"));
  };

  this.getRowData = function(index, options) {
    options = options || {};

    // See comment from getColumnData.
    var rowData = [];
    if (options.valueColumns) {
      for (var i = 0; i < options.valueColumns.length; ++i) {
        rowData.push(getCellValueAt(index, options.valueColumns[i], getValueOrDefault(options, "numeric", true)));
      }
    } else {
      table.find("tr:nth-child(" + (index + 1) + ")").find("td:gt(0):not(.exclude-from-chart),th:gt(0):not(.exclude-from-chart)").each(function() {
        rowData.push(getCellValue($(this), getValueOrDefault(options, "numeric", true)));
      });
    }
    return rowData;
  };
};
