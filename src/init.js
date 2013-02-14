window.HighTables = {};

HighTables.charts = {};

$(document).ready(function() {
  Highcharts.setOptions({
    credits: {
      enabled: HighTables.includeHighchartsLinks
    }
  });

  var chartConfigs = {
    LineChart: {
      "line": {},
      "spline": { chart: { type: "spline" } },
      "area": { chart: { type: "area" } },
      "stack": { chart: { type: "area" }, plotOptions: { area: { stacking: "normal" } } }
    },
    BarChart: {
      "bar": {},
      "column": { chart: { type: "column" } },
    },
    PieChart: {
      "pie": {}
    }
  };

  function renderCharts(selector, engine, options) {
    $(selector).each(function() {
      engine.renderTo(this, options);
    });
  }

  function renderChartsFromTables(selector, engine, options) {
    $(selector).each(function() {
      engine.renderFromTable(this, options);
    })
  }

  function renderChartFromConfig(engine, config) {
    for (var chartType in config) {
      renderCharts("." + chartType + "-chart", engine, config[chartType]);
      renderChartsFromTables(".render-to-" + chartType + "-table", engine, config[chartType]);
    }
  }

  function renderChartsFromConfigs() {
    for (var engine in chartConfigs) {
      renderChartFromConfig(HighTables[engine], chartConfigs[engine]);
    }
  }

  renderChartsFromConfigs();
});
