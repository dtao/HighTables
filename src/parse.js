window.HighTables = window.HighTables || {};

HighTables.Parse = function() {
  function parseNumber(number) {
    return parseFloat(number.replace(/^\$|,/g, ""));
  }

  return {
    number: parseNumber
  };
}();
