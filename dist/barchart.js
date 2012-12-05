window.HighTables = window.HighTables || {};

HighTables.BarChart = function() {
  var lineCharts = [];

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

  function renderFromTable(element) {
    var table      = new HighTables.Table(element);
    var categories = getCategories(table);
    var series     = getSeries(table);

    lineCharts.push(new Highcharts.Chart({
      chart: {
        backgroundColor: "transparent",
        renderTo: table.chartId(),
        type: "bar"
      },
      xAxis: { categories: categories },
      yAxis: { title: false },
      title: false,
      series: series
    }));
  }

  return {
    renderFromTable: renderFromTable
  };
}();
