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

  function parseIntegersWithRanges(sequence, max) {
    var current = 0;
    var next;

    var values = [];
    for (i = 0; i < sequence.length; ++i) {
      if (sequence[i] === "...") {
        next = sequence[i + 1] || max + 1;
        while (current < next) {
          values.push(current++);
        }
      } else {
        current = parseInt(sequence[i]);
        values.push(current++);
      }
    }

    return values;
  }

  return {
    number: parseNumber,
    integers: parseIntegers,
    integersWithRanges: parseIntegersWithRanges
  };
}();
