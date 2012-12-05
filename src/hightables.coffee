$(document).ready ->
  Highcharts.setOptions
    colors: [
      "#4488FF",
      "#50B432", 
      "#ED561B",
      "#DDDF00",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4"
    ]

  $("table.render-to-line-chart").each ->
    HighTables.LineChart().renderFromTable(this)

  $("table.render-to-bar-chart").each ->
    HighTables.BarChart().renderFromTable(this)

  $("table.render-to-pie-chart").each ->
    HighTables.PieChart().renderFromTable(this)
