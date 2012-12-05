$(document).ready(function() {
  Highcharts.setOptions({
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
  });

  $("table.render-to-line-chart").each(function() {
    HighTables.LineChart.renderFromTable(this);
  });

  $("table.render-to-bar-chart").each(function() {
    HighTables.BarChart.renderFromTable(this);
  });

  $("table.render-to-pie-chart").each(function() {
    HighTables.PieChart.renderFromTable(this);
  });
});
