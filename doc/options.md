Options
-------

Support for custom chart options is pretty limited right now. From [dogfooding](http://en.wikipedia.org/wiki/Dogfooding), I've only had need for (and thus only built) the following customizable options:

- **Title**: to give a chart a title, add the `data-title` attribute to the underlying table.
- **X Interval**: to specify a tick interval for the X-axis, use the `data-x-interval` attribute.

In addition to these options, however, there is support for a more general customization mechanism: add the `data-options` attribute, and specify the name of a JavaScript function which returns an object with any Highcharts options you like.
