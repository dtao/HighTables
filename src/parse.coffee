window.HighTables ?= {}

HighTables.Parse = ->
  parseNumber = (number) ->
    parseFloat(number.replace(/^\$|,/g, ""))

  number: parseNumber
