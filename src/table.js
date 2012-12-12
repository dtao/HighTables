HighTables.Table = function(element) {
  var table = $(element);
  var options;
  var chart;
  var firstRow;
  var bodyRows;
  var columnCount;
  var rowCount;

  var OPTIONS_MAP = {
    "options": function(value) { return safeEval(value); },
    "title": function(value) { return { title: { text: value } }; },
    "x-interval": function(value) { return { xAxis: { tickInterval: parseInt(value) } }; }
  };

  function safeEval(name) {
    var parts = name.split(".");
    var result = window;
    while (parts.length > 0) {
      result = result[parts.shift()];
    }
    return (typeof result === "function") ? result() : result;
  }

  function getCellValue(cell, numeric) {
    if (numeric) {
      return HighTables.Parse.number(cell.text());
    } else {
      return cell.text();
    }
  }

  function getOptions() {
    var options = {};

    var dataAttr;
    for (var key in OPTIONS_MAP) {
      dataAttr = table.attr("data-" + key);
      if (dataAttr) {
        $.extend(options, OPTIONS_MAP[key](dataAttr));
      }
    }

    return options;
  }

  this.getOrCreateChart = function() {
    if (!chart) {
      chart = $("<div>").addClass("chart");
      chart.attr("id", "chart-" + $(".chart").length + 1);
      chart.insertBefore(table);
    }
    return chart;
  };

  this.options = function() {
    if (!options) {
      options = getOptions();
    }

    return options;
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
    return table.find("tr:nth-child(" + (index + 1) + ")").find("td:gt(0):not(.exclude-from-chart),th:gt(0):not(.exclude-from-chart)").map(function() {
      return getCellValue($(this), options.numeric);
    });
  };
};
