HighTables.PieChart = function() {
  var pieCharts = HighTables.charts["pie"] = [];

  function getCellSelector(options) {
    if (options.valueColumns) {
      return "nth-child(" + options.valueColumns[0] + ")";
    } else {
      return "last-child";
    }
  }

  function getSeriesName(table, options) {
    return table.getCellValue(table.firstRow().find("th:" + getCellSelector(options)), { numeric: false });
  }

  function getLabel(table, row) {
    return table.getCellValue($(row).find("td:first"), { numeric: false });
  }

  function getValue(table, row, options) {
    return table.getCellValue($(row).find("td:" + getCellSelector(options)));
  }

  function getSeriesData(table, options) {
    var seriesData = [];
    table.bodyRows().each(function() {
      var label = getLabel(table, this);
      var value = getValue(table, this, options);
      if (label && value) {
        seriesData.push([label, value]);
      }
    });
    return seriesData;
  }

  function getSeries(table, options) {
    var name = getSeriesName(table, options);
    var data = getSeriesData(table, options);

    return [{
      type: "pie",
      name: name,
      data: data
    }];
  }

  function render(table, chart, options) {
    options = options || {};

    var series  = getSeries(table, options);

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
