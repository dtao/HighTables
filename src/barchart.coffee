window.HighTables ?= {}

HighTables.BarChart = ->
  lineCharts = []

  getCategories = (table) ->
    table.getRowData 0,
      numeric: false

  getSeries = (table) ->
    seriesFromRow(table, i) for i in [1..table.rowCount()]

  seriesFromRow = (table, i) ->
    name: table.getRowHeader(i)
    data: table.getRowData(i)

  renderFromTable = (element) ->
    table      = new HighTables.Table(element)
    categories = getCategories(table)
    series     = getSeries(table)

    lineCharts.push new Highcharts.Chart
      chart:
        backgroundColor: "transparent"
        renderTo: table.getOrCreateChart().attr("id")
        type: "bar"
      xAxis:
        categories: categories
      yAxis:
        title: false
      title: false
      series: series

  renderFromTable: renderFromTable
