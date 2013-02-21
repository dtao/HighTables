HighTables
==========

HighTables makes it trivial to render charts from existing HTML tables using
[jQuery](http://jquery.com/) and [Highcharts](http://www.highcharts.com).

Installation
------------

To use HighTables on your website, simply include [hightables.min.js](https://raw.github.com/dtao/HighTables/master/dist/hightables.min.js) (or [hightables.js](https://raw.github.com/dtao/HighTables/master/dist/hightables.js)) *after* including jQuery and Highcharts:

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="highcharts.min.js"></script>
<script type="text/javascript" src="hightables.min.js"></script>
```

<small>Note: do *not* use the URLs of the above links as the `src` of your `<script>` tag. Unless I'm mistaken, GitHub does not want to be used as a CDN. Just serve the file from your own server.</small>

Basic Usage
-----------

To render a chart from any table on your page using HighTables, you have two options:

1. Add an extra HighTables-defined class to your `<table>` element, such as `render-to-line-chart`.
   A chart will be rendered automatically, just above the table, when the page loads. The biggest
   benefit to this approach is that it is **dead simple**.
2. Create a `<div>` element with a HighTables-defined class, such as `pie-chart`. This approach
   requires also specifying a data source via the `data-source` attribute, whose value should be a
   valid jQuery selector (such as `"#foo"` or `".bar"`) for the `<table>` element used to render the
   chart.

Line Charts
-----------

Render a line chart by adding the `render-to-line-chart` class to an existing `<table>` element or
creating a `<div>` element with the `line-chart` class. By default, the first column will be used to
label the X-axis of the chart, and each column after that will be represented as a data series.

For a [spline](http://en.wikipedia.org/wiki/Spline_%28mathematics%29), or smoothed line, use the
`render-to-spline-chart` (for a `<table>`) or `spline-chart` class (for a `<div>`).

Area Charts
-----------

To make an area chart instead of a line chart, add the `render-to-area-chart` class to a `<table>`
element, or create a `<div>` with the class `area-chart`. For a stack chart, use
`render-to-stack-chart` (for a `<table>` element) or `stack-chart` (for a `<div>`).

Bar & Column Charts
-------------------

Add the class `render-to-bar-chart` to an existing `<table>` element or create a `<div>` with the
`bar-chart` class to create a bar chart. By default, the first column of the table will be used for
bar labels, and each remaining column will be rendered as a group of bars.

The `render-to-column-chart` (for a `<table>`) and `column-chart` classes (for a `<div>`) produce a
bar chart with vertical bars, i.e., a column chart.

Pie Charts
----------

You can also render pie charts by adding the `render-to-pie-chart` class to an existing `<table>`
element or creating a `<div>` with the `pie-chart` class. By default, the first column of the table
will be used to name the slices of the pie, and the values in the last column will be used to
determine the width of each slice.

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

API
---

So far there isn't much you can do to interact with HighTables programmatically. This will almost
certainly change, but for now there's really only one thing you can do: disable the default hiding
of Highcharts links:

```javascript
HighTables.includeHighchartsLinks = true;
```
