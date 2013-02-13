HighTables.PieChart = function() {
  var pieCharts = HighTables.charts["pie"] = [];

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
