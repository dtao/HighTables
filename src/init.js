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
    var chartType = getChartTypeFromTable(table);
    var engine    = chartConfigs[chartType].engine;
    var options   = chartConfigs[chartType].options;
    engine.renderFromTable(table, options);
  };

  renderChartsFromConfigs();
});
