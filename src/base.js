HighTables.Base = function(element) {
  element = $(element);

  var options;

  var OPTIONS_MAP = {
    "options": function(value) { return safeEval(value); },
    "title": function(value) { return { title: { text: value } }; },
    "x-interval": function(value) { return { xAxis: { tickInterval: parseInt(value) } }; }
  };

  function safeEval(name) {
    var parts = name.split(".");
    var result = window;
    while (parts.length > 0) {
      result = result[parts.shift()];
    }
    return (typeof result === "function") ? result() : result;
  }

  function getOptions() {
    var options = {};

    var dataAttr;
    for (var key in OPTIONS_MAP) {
      dataAttr = element.attr("data-" + key);
      if (dataAttr) {
        $.extend(options, OPTIONS_MAP[key](dataAttr));
      }
    }

    return options;
  };

  this.options = function() {
    if (!options) {
      options = getOptions();
    }

    return options;
  };

  this.element = element;
};
