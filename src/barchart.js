HighTables.BarChart = function() {
  var barCharts = HighTables.charts["bar"] = [];

  function getCategories(table, options) {
    if (options.transpose) {
      return table.getColumnData(0, $.extend({}, options, { numeric: false }));
    } else {
      return table.getRowData(0, $.extend({}, options, { numeric: false }));
    }
  }

  function anyValues(data) {
    for (var i = 0; i < data.length; ++i) {
      if (data[i]) {
        return true;
      }
    }
    return false;
  }

  function getSeries(table, options) {
    var series = [];

    var recordCount = options.transpose ?
      table.columnCount() :
      table.rowCount();

    var limit = options.limit ?
      Math.min(options.limit + 1, recordCount) :
      recordCount;

    var dataPoint;
    for (var i = 1; i < limit; i++) {
      if (options.transpose) {
        dataPoint = {
          name: table.getColumnHeader(i),
          data: table.getColumnData(i, options)
        };

      } else {
        dataPoint = {
          name: table.getRowHeader(i),
          data: table.getRowData(i, options)
        };
      }

      if (anyValues(dataPoint.data)) {
        series.push(dataPoint);
      }
    }
    return series;
  }

  function render(table, chart, options) {
    options = options || {};

    var categories = getCategories(table, options);
    var series     = getSeries(table, options);

    barCharts.push(new Highcharts.Chart($.extend(true, {
      chart: {
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
