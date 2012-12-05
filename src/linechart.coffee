window.HighTables ?= {}

HighTables.LineChart = ->
  lineCharts = []

  getCategories = (table) ->
    table.getColumnData 0,
      numeric: false

  getSeries = (table) ->
    seriesFromColumn(table, i) for i in [1..table.columnCount()]

  seriesFromColumn = (table, i) ->
    name: table.getColumnHeader(i)
    data: table.getColumnData(i)

  renderFromTable = (element) ->
    table      = new HighTables.Table(element)
    categories = getCategories(table)
    series     = getSeries(table)

    lineCharts.push new Highcharts.Chart
      chart:
        backgroundColor: "transparent"
        renderTo: table.getOrCreateChart().attr("id")
        type: "line"
      xAxis:
        categories: categories
      yAxis:
        title: false
      title: false
      series: series

  renderFromTable: renderFromTable
