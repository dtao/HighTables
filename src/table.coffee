window.HighTables ?= {}

class HighTables.Table
  constructor: (@element) ->
    @table = $(@element)

  getCellValue = (cell, numeric) ->
    return HighTables.Parse().number(cell.text()) if numeric
    cell.text()

  getOrCreateChart: ->
    if (!@chart)
      @chart = $("<div>").addClass("chart")
      @chart.attr("id", "chart-" + $(".chart").length + 1)
      @chart.insertBefore(@table)
    @chart

  firstRow: ->
    if (!@_firstRow)
      @_firstRow = @table.find("tr:first")
    @_firstRow

  bodyRows: ->
    if (!@_bodyRows)
      @_bodyRows = @table.find("tr:gt(0)")
    @_bodyRows

  columnCount: ->
    if (!@_columnCount)
      @_columnCount = this.firstRow().find("th").length
    @_columnCount

  rowCount: ->
    if (!@_rowCount)
      @_rowCount = @table.find("tr").length
    @_rowCount

  getColumnHeader: (index) ->
    this.firstRow().find("th:nth-child(" + (index + 1) + ")").text()

  getColumnData: (index, options) ->
    options ?= { numeric: true }
    this.bodyRows().map ->
      cell = $(this).find("td:nth-child(" + (index + 1) + ")")
      getCellValue(cell, options.numeric)

  getRowHeader: (index) ->
    @table.find("tr:nth-child(" + (index + 1) + ")").find("td:first").text()

  getRowData: (index, options) ->
    options ?= { numeric: true }
    @table.find("tr:nth-child(" + (index + 1) + ")").find("td:gt(0),th:gt(0)").map ->
      getCellValue($(this), options.numeric)
