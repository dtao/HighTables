HighTables.Parse = function() {
  function parseNumber(number) {
    return parseFloat(number.replace(/^\$|,/g, ""));
  }

  function parseIntegers(integers) {
    var results = [];
    for (var i = 0; i < integers.length; ++i) {
      results.push(parseInt(integers[i]));
    }
    return results;
  }

  return {
    number: parseNumber,
    integers: parseIntegers
  };
}();
