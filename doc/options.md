Options
-------

Support for custom chart options is pretty limited right now:

- **Title**: to give a chart a title, add the `data-title` attribute to the element responsible for rendering the element (the `<table>` or the `<div>`).
- **X-Axis**: to specify a minimum and tick interval for the X-axis, use the `data-x-min` and `data-x-interval` attributes.
- **Y-Axis**: to specify a minimum and tick interval for the Y-axis, use the `data-y-min` and `data-y-interval` attributes.
- **Columns**: to use only certain columns for a table's data, set the `data-value-columns` attribute to a comma-delimited list of the (zero-based) column indices you want to use.

In addition to these options, there is support for a more general customization mechanism: add the `data-options` attribute, and specify the name of a JavaScript function which returns an object with any Highcharts options you like.
