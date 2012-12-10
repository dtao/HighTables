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
