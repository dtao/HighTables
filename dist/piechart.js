window.HighTables = window.HighTables || {};

HighTables.PieChart = function() {
  var pieCharts = [];

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

    pieCharts.push(new Highcharts.Chart({
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
