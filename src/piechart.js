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
