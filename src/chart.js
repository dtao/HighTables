HighTables.Chart = function(element) {
  $.extend(this, new HighTables.Base(element));

  var chart = this.element;
  var table;

  this.getTable = function() {
    if (!table) {
      table = $(chart.attr("data-table"));
    }
    return table;
  };
};
