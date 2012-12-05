window.HighTables ?= {}

HighTables.PieChart = ->
  pieCharts = []

  getSeriesName = (table) ->
    table.firstRow().find("th:last").text()

  getLabel = (row) ->
    $(row).find("td:first").text()

  getValue = (row) ->
    HighTables.Parse().number($(row).find("td:last").text())

  getSeriesData = (table) ->
    table.bodyRows().map ->
      label = getLabel(this)
      value = getValue(this)
      [[label, value]] # jQuery.map flattens arrays by default for some reason.

  getSeries = (table) ->
    name = getSeriesName(table)
    data = getSeriesData(table)

    [{
      type: "pie",
      name: name,
      data: data
    }]

  renderFromTable = (element) ->
    table  = new HighTables.Table(element)
    series = getSeries(table)

    pieCharts.push new Highcharts.Chart
      chart:
        backgroundColor: "transparent"
        renderTo: table.getOrCreateChart().attr("id")
        type: "pie"
      title: false,
      series: series

  renderFromTable: renderFromTable
