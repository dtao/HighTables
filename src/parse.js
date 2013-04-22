HighTables.Parse = function() {
  function parseNumber(number) {
    var result = parseFloat(number && number.replace(/^\$|,/g, ""));
    return isNaN(result) ? null : result;
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
