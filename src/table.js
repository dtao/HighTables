HighTables.Table = function(element) {
  $.extend(this, new HighTables.Base(element));

  var table = this.element;
  var chart;
  var firstRow;
  var bodyRows;
  var columnCount;
  var rowCount;

  function getValueOrDefault(object, key, defaultValue) {
    if (key in object) {
      return object[key];
    }
    return defaultValue;
  }

  function getCellValue(cell, options) {
    options = options || {};
    var text = cell.text() || cell.find("input").val();
    var number;

    if (getValueOrDefault(options, "numeric", true)) {
      number = HighTables.Parse.number(text);
      if (!options.threshold || number >= options.threshold) {
        return number;
      } else {
        return null;
      }
    } else {
      return text;
    }
  }

  function getCellValueAt(rowIndex, columnIndex, options) {
    var row  = table.find("tr").get(rowIndex),
        cell = $(row).find("th, td").get(columnIndex);
    return getCellValue($(cell), options);
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
    return getCellValue($(this.firstRow().find("th,td").get(index)), {
      numeric: false
    });
  };

  this.getColumnData = function(index, options) {
    options = options || this.options() || {};

    // Ugh -- jQuery removes items when the function passed to map returns null.
    var columnData = [];
    this.bodyRows().each(function() {
      if (options.rowFilter && options.rowFilter(this) === false) {
        return;
      }

      var cell = $(this).find("td").get(index);
      columnData.push(getCellValue($(cell), options));
    });

    if (options.limit) {
      columnData = columnData.slice(0, options.limit);
    }

    if (options.order === "descending") {
      columnData.reverse();
    }

    return columnData;
  };

  this.getRowHeader = function(index) {
    return getCellValue($(table.find("tr").get(index)).find("td:first"), { numeric: false });
  };

  this.getRowData = function(index, options) {
    options = options || this.options() || {};

    // See comment from getColumnData.
    var rowData = [];
    if (options.valueColumns) {
      for (var i = 0; i < options.valueColumns.length; ++i) {
        rowData.push(getCellValueAt(index, options.valueColumns[i], options));
      }
    } else {
      $(table.find("tr").get(index)).find("td:gt(0):not(.exclude-from-chart),th:gt(0):not(.exclude-from-chart)").each(function() {
        rowData.push(getCellValue($(this), options));
      });
    }
    return rowData;
  };
};
