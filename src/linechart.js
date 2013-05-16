HighTables.LineChart = function() {
  var lineCharts = HighTables.charts["line"] = [];

  function getCategories(table, options) {
    var labelColumn = options.labelColumn || 0;
    return table.getColumnData(0, $.extend({}, options, { numeric: false }));
  }

  function getSeries(table, options) {
    var series = [];
    var valueColumns = options.valueColumns;
    if (valueColumns) {
      for (var i = 0; i < valueColumns.length; ++i) {
        series.push({
          name: table.getColumnHeader(valueColumns[i]),
          data: table.getColumnData(valueColumns[i], options)
        });
      }

    } else {
      for (var i = 1; i < table.columnCount(); i++) {
        series.push({
          name: table.getColumnHeader(i),
          data: table.getColumnData(i, options)
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
