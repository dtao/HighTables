window.HighTables = {};

HighTables.Parse = function() {
  function parseNumber(number) {
    return parseFloat(number.replace(/^\$|,/g, ""));
  }

  return {
    number: parseNumber
  };
}();

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
    return table.find("tr:nth-child(" + (index + 1) + ")").find("td:gt(0),th:gt(0)").map(function() {
      return getCellValue($(this), options.numeric);
    });
  };
};

HighTables.LineChart = function() {
  HighTables.lineCharts = [];

  function getCategories(table) {
    return table.getColumnData(0, { numeric: false });
  }

  function getSeries(table) {
    var series = [];
    for (var i = 1; i < table.columnCount(); i++) {
      series.push({
        name: table.getColumnHeader(i),
        data: table.getColumnData(i)
      });
    }
    return series;
  }

  function renderFromTable(element, options) {
    options = options || {};

    var table      = new HighTables.Table(element);
    var categories = getCategories(table);
    var series     = getSeries(table);

    HighTables.lineCharts.push(new Highcharts.Chart($.extend(true, {
      chart: {
        backgroundColor: "transparent",
        renderTo: table.getOrCreateChart().attr("id"),
        type: "line"
      },
      xAxis: { categories: categories },
      yAxis: { title: false },
      title: false,
      series: series
    }, table.options(), options)));
  }

  return {
    renderFromTable: renderFromTable
  };
}();

HighTables.BarChart = function() {
  HighTables.barCharts = [];

  function getCategories(table) {
    return table.getRowData(0, { numeric: false });
  }

  function getSeries(table) {
    var series = [];
    for (var i = 1; i < table.rowCount(); i++) {
      series.push({
        name: table.getRowHeader(i),
        data: table.getRowData(i)
      });
    }
    return series;
  }

  function renderFromTable(element, options) {
    options = options || {};

    var table      = new HighTables.Table(element);
    var categories = getCategories(table);
    var series     = getSeries(table);

    HighTables.barCharts.push(new Highcharts.Chart($.extend(true, {
      chart: {
        backgroundColor: "transparent",
        renderTo: table.getOrCreateChart().attr("id"),
        type: "bar"
      },
      xAxis: { categories: categories },
      yAxis: { title: false },
      title: false,
      series: series
    }, options)));
  }

  return {
    renderFromTable: renderFromTable
  };
}();

HighTables.PieChart = function() {
  HighTables.pieCharts = [];

  function getSeriesName(table) {
    return table.firstRow().find("th:last").text();
  }

  function getLabel(row) {
    return $(row).find("td:first").text();
  }

  function getValue(row) {
    return HighTables.Parse.number($(row).find("td:last").text());
  }

  function getSeriesData(table) {
    return table.bodyRows().map(function() {
      var label = getLabel(this);
      var value = getValue(this);
      // jQuery.map flattens arrays by default for some reason.
      return [[label, value]];
    });
  }

  function getSeries(table) {
    var name = getSeriesName(table);
    var data = getSeriesData(table);

    return [{
      type: "pie",
      name: name,
      data: data
    }];
  }

  function renderFromTable(element) {
    var table   = new HighTables.Table(element);
    var series  = getSeries(table);

    HighTables.pieCharts.push(new Highcharts.Chart({
      chart: {
        backgroundColor: "transparent",
        renderTo: table.getOrCreateChart().attr("id"),
        type: "pie"
      },
      title: false,
      series: series
    }));
  }

  return {
    renderFromTable: renderFromTable
  };
}();

$(document).ready(function() {
  Highcharts.setOptions({
    colors: [
      "#4488FF",
      "#50B432", 
      "#ED561B",
      "#DDDF00",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4"
    ]
  });

  $("table.render-to-line-chart").each(function() {
    HighTables.LineChart.renderFromTable(this);
  });

  $("table.render-to-area-chart").each(function() {
    HighTables.LineChart.renderFromTable(this, {
      chart: { type: "area" }
    });
  });

  $("table.render-to-stack-chart").each(function() {
    HighTables.LineChart.renderFromTable(this, {
      chart: { type: "area" },
      plotOptions: { area: { stacking: "normal" } }
    });
  });

  $("table.render-to-bar-chart").each(function() {
    HighTables.BarChart.renderFromTable(this);
  });

  $("table.render-to-bar-chart").each(function() {
    HighTables.BarChart.renderFromTable(this, {
      chart: { type: "column" }
    });
  });

  $("table.render-to-pie-chart").each(function() {
    HighTables.PieChart.renderFromTable(this);
  });

  // Sorry, Highcharts!
  if (!HighTables.includeHighchartsLinks) {
    $("tspan").filter(function() {
      return $.trim(this.textContent) === "Highcharts.com";
    }).remove();
  }
});
