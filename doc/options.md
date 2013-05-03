Options
-------

Support for custom chart options is pretty limited right now:

- **Title**: to give a chart a title, add the `data-title` attribute to the element responsible for rendering the element (the `<table>` or the `<div>`).
- **Order**: to render series in the opposite order they appear in a table, set the `data-order` attribute to "descending".
- **Limit**: to only render the first *N* records in a chart, set `data-limit="[N]"`.
- **X-Axis**: to specify a minimum and tick interval for the X-axis, use the `data-x-min` and `data-x-interval` attributes.
- **Y-Axis**: to specify a minimum and tick interval for the Y-axis, use the `data-y-min` and `data-y-interval` attributes.
- **Columns**: to use only certain columns for a table's data, set the `data-value-columns` attribute to a comma-delimited list of the (zero-based) column indices you want to use. Use `"..."` to represent a range; for example:
  - `"5,6"` would use columns 5 and 6 (obviously)
  - `"2,...,5"` would use columns 2, 3, 4, and 5
  - `"3,..."` would use every column starting with column 3
  - `"...,3"` would use every column from 0 to 3

In addition to these options, there is support for a more general customization mechanism: add the `data-options` attribute, and specify the name of a JavaScript function which returns an object with any Highcharts options you like.
