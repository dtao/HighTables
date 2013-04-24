HighTables.BarChart = function() {
  var barCharts = HighTables.charts["bar"] = [];

  function getCategories(table, options) {
    return table.getRowData(0, $.extend({}, options, { numeric: false }));
  }

  function getSeries(table, options) {
    var series = [];
    for (var i = 1; i < table.rowCount(); i++) {
      series.push({
        name: table.getRowHeader(i),
        data: table.getRowData(i, options)
      });
    }
    return series;
  }

  function render(table, chart, options) {
    options = options || {};

    var categories = getCategories(table, options);
    var series     = getSeries(table, options);

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
