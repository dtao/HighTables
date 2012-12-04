window.HighTables = window.HighTables || {};

HighTables.PieChart = function() {
  var pieCharts = [];

  function getChartId(table) {
    return $(table).data("chart");
  }

  function getSeriesName(table) {
    return $(table).find("tr:first").find("th:last").text();
  }

  function getLabel(row) {
    return $(row).find("td:first").text();
  }

  function getValue(row) {
    return parseFloat($(row).find("td:last").text().replace(/,/g, ""));
  }

  function getSeriesData(table) {
    return $(table).find("tr:gt(0)").map(function() {
      var label = getLabel(this);
      var value = getValue(this);
      // jQuery.map flattens arrays by default for some reason.
      return [[label, value]];
    }).toArray();
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

  function renderFromTable(table) {
    var chartId = getChartId(table);
    var series  = getSeries(table);

    pieCharts.push(new Highcharts.Chart({
      chart: {
        backgroundColor: "transparent",
        renderTo: chartId,
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
