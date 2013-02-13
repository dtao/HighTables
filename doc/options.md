Options
-------

Support for custom chart options is pretty limited right now:

- **Title**: to give a chart a title, add the `data-title` attribute to the element responsible for
  rendering the element (the `<table>` or the `<div>`).
- **X Interval**: to specify a tick interval for the X-axis, use the `data-x-interval` attribute.
- **Y Interval**: to specify a tick interval for the Y-axis, use the `data-y-interval` attribute.

In addition to these options, there is support for a more general customization mechanism: add the
`data-options` attribute, and specify the name of a JavaScript function which returns an object with
any Highcharts options you like.
