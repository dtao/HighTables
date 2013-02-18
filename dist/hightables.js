window.HighTables = {};

HighTables.charts = {};

$(document).ready(function() {
  Highcharts.setOptions({
    credits: {
      enabled: !!HighTables.includeHighchartsLinks
    }
  });

  var chartConfigs = {
    "line": { engine: HighTables.LineChart },
    "spline": { engine: HighTables.LineChart, options: { chart: { type: "spline" } } },
    "area": { engine: HighTables.LineChart, options: { chart: { type: "area" } } },
    "stack": { engine: HighTables.LineChart, options: { chart: { type: "area" }, plotOptions: { area: { stacking: "normal" } } } },
    "bar": { engine: HighTables.BarChart },
    "column": { engine: HighTables.BarChart, options: { chart: { type: "column" } } },
    "pie": { engine: HighTables.PieChart }
  };

  function renderCharts(chartType) {
    var engine  = chartConfigs[chartType].engine;
    var options = chartConfigs[chartType].options;
    $("." + chartType + "-chart").each(function() {
      engine.renderTo(this, options);
    });
  }

  function renderChartsFromTables(chartType) {
    var engine  = chartConfigs[chartType].engine;
    var options = chartConfigs[chartType].options;
    $("table.render-to-" + chartType + "-chart").each(function() {
      engine.renderFromTable(this, options);
    })
  }

  function renderChartsFromConfigs() {
    for (var chartType in chartConfigs) {
      renderCharts(chartType);
      renderChartsFromTables(chartType);
    }
  }

  function getChartType(chart) {
    var chartClasses = $(chart).attr("class").split(/\s+/);
    for (var i = 0; i < chartClasses.length; ++i) {
      if (chartClasses[i].match(/^(?:line|spline|area|stack|bar|column|pie)-chart$/)) {
        return chartClasses[i].replace(/-chart$/g, "");
      }
    }
  }

  function getChartTypeFromTable(table) {
    var chartClasses = $(table).attr("class").split(/\s+/);
    for (var i = 0; i < chartClasses.length; ++i) {
      if (chartClasses[i].match(/^render-to-(?:line|spline|area|stack|bar|column|pie)-chart$/)) {
        return chartClasses[i].replace(/^render-to-/g, "").replace(/-chart$/g, "");
      }
    }
  }

  HighTables.renderCharts = renderChartsFromConfigs;

  HighTables.renderChart = function(chart) {
    var chartType = getChartType(chart);
    var engine    = chartConfigs[chartType].engine;
    var options   = chartConfigs[chartType].options;
    engine.renderTo(chart, options);
  };

  HighTables.renderChartFromTable = function(table) {
    var chartType = getChartTypeFromTable(chart);
    var engine    = chartConfigs[chartType].engine;
    var options   = chartConfigs[chartType].options;
    engine.renderFromTable(table, options);
  };

  renderChartsFromConfigs();
});

HighTables.Parse = function() {
  function parseNumber(number) {
    return parseFloat(number.replace(/^\$|,/g, ""));
  }

  function parseIntegers(integers) {
    var results = [];
    for (var i = 0; i < integers.length; ++i) {
      results.push(parseInt(integers[i]));
    }
    return results;
  }

  return {
    number: parseNumber,
    integers: parseIntegers
  };
}();

HighTables.Base = function(element) {
  element = $(element);

  var options;
  var labelColumn;
  var valueColumns;

  var CHART_OPTIONS_MAP = {
    "options": function(value) { return safeEval(value); },
    "title": function(value) { return { title: { text: value } }; },
    "x-interval": function(value) { return { xAxis: { tickInterval: parseInt(value) } }; },
    "x-min": function(value) { return { xAxis: { min: parseInt(value) } }; },
    "y-interval": function(value) { return { yAxis: { tickInterval: parseInt(value) } }; },
    "y-min": function(value) { return { yAxis: { min: parseInt(value) } }; }
  };

  function safeEval(name) {
    var parts = name.split(".");
    var result = window;
    while (parts.length > 0) {
      result = result[parts.shift()];
    }
    return (typeof result === "function") ? result() : result;
  }

  function getChartOptions() {
    var options = {};

    var dataAttr;
    for (var key in CHART_OPTIONS_MAP) {
      dataAttr = element.attr("data-" + key);
      if (dataAttr) {
        $.extend(options, CHART_OPTIONS_MAP[key](dataAttr));
      }
    }

    return $.extend(options, {
      labelColumn: getLabelColumn(),
      valueColumns: getValueColumns()
    });
  };

  function getLabelColumn() {
    return parseInt(element.attr("data-label-column"));
  }

  function getValueColumns() {
    var attr = element.attr("data-value-columns");

    if (attr) {
      return HighTables.Parse.integers(attr.split(","));
    } else {
      return null;
    }
  }

  this.options = function() {
    if (!options) {
      options = getChartOptions();
      options.labelColumn = this.labelColumn();
      options.valueColumns = this.valueColumns();
    }

    return options;
  };

  this.labelColumn = function() {
    if (typeof labelColumn === "undefined") {
      labelColumn = getLabelColumn();
    }

    return labelColumn;
  };

  this.valueColumns = function() {
    if (typeof valueColumns === "undefined") {
      valueColumns = getValueColumns();
    }

    return valueColumns;
  };

  this.element = element;
};

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

HighTables.Chart = function(element) {
  $.extend(this, new HighTables.Base(element));

  var chart = this.element;
  var table;

  this.getTable = function() {
    if (!table) {
      table = $(chart.attr("data-source"));
    }
    return table;
  };
};

HighTables.LineChart = function() {
  var lineCharts = HighTables.charts["line"] = [];

  function getCategories(table, options) {
    var labelColumn = options.labelColumn || 0;
    return table.getColumnData(0, { numeric: false });
  }

  function getSeries(table, options) {
    var series = [];
    var valueColumns = options.valueColumns;
    if (valueColumns) {
      for (var i = 0; i < valueColumns.length; ++i) {
        series.push({
          name: table.getColumnHeader(valueColumns[i]),
          data: table.getColumnData(valueColumns[i])
        });
      }

    } else {
      for (var i = 1; i < table.columnCount(); i++) {
        series.push({
          name: table.getColumnHeader(i),
          data: table.getColumnData(i)
        });
      }
    }
    return series;
  }

  function render(table, chart, options) {
    options = options || {};

    var categories = getCategories(table, options);
    var series     = getSeries(table, options);

    lineCharts.push(new Highcharts.Chart($.extend(true, {
      chart: {
        backgroundColor: "transparent",
        renderTo: chart[0],
        type: "line"
      },
      xAxis: { categories: categories },
      yAxis: { title: false },
      title: false,
      series: series
    }, options)));
  }

  function renderTo(element, options) {
    var chart = new HighTables.Chart(element);
    var table = new HighTables.Table(chart.getTable()[0]);
    return render(table, chart.element, $.extend({}, chart.options(), options));
  }

  function renderFromTable(element, options) {
    var table = new HighTables.Table(element);
    return render(table, table.getOrCreateChart(), $.extend({}, table.options(), options));
  }

  return {
    renderTo: renderTo,
    renderFromTable: renderFromTable
  };
}();

HighTables.BarChart = function() {
  var barCharts = HighTables.charts["bar"] = [];

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

  function render(table, chart, options) {
    options = options || {};

    var categories = getCategories(table);
    var series     = getSeries(table);

    barCharts.push(new Highcharts.Chart($.extend(true, {
      chart: {
        backgroundColor: "transparent",
        renderTo: chart[0],
        type: "bar"
      },
      xAxis: { categories: categories },
      yAxis: { title: false },
      title: false,
      series: series
    }, options)));
  }

  function renderTo(element, options) {
    var chart = new HighTables.Chart(element);
    var table = new HighTables.Table(chart.getTable()[0]);
    return render(table, chart.element, $.extend({}, chart.options(), options));
  }

  function renderFromTable(element, options) {
    var table = new HighTables.Table(element);
    return render(table, table.getOrCreateChart(), $.extend({}, table.options(), options));
  }

  return {
    renderTo: renderTo,
    renderFromTable: renderFromTable
  };
}();

HighTables.PieChart = function() {
  var pieCharts = HighTables.charts["pie"] = [];

  function getSeriesName(table) {
    return table.getCellValue(table.firstRow().find("th:last"));
  }

  function getLabel(table, row) {
    return table.getCellValue($(row).find("td:first"));
  }

  function getValue(table, row) {
    return table.getCellValue($(row).find("td:last"), { numeric: true });
  }

  function getSeriesData(table) {
    return table.bodyRows().map(function() {
      var label = getLabel(table, this);
      var value = getValue(table, this);
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

  function render(table, chart, options) {
    options = options || {};

    var series  = getSeries(table);

    pieCharts.push(new Highcharts.Chart($.extend(true, {
      chart: {
        backgroundColor: "transparent",
        renderTo: chart[0],
        type: "pie"
      },
      title: false,
      series: series
    }, options)));
  }

  function renderTo(element, options) {
    var chart = new HighTables.Chart(element);
    var table = new HighTables.Table(chart.getTable()[0]);
    return render(table, chart.element, $.extend({}, chart.options(), options));
  }

  function renderFromTable(element, options) {
    var table = new HighTables.Table(element);
    return render(table, table.getOrCreateChart(), $.extend({}, table.options(), options));
  }

  return {
    renderTo: renderTo,
    renderFromTable: renderFromTable
  };
}();
