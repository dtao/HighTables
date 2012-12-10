HighTables.LineChart = function() {
  var lineCharts = HighTables.charts["line"] = [];

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

    lineCharts.push(new Highcharts.Chart($.extend(true, {
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
