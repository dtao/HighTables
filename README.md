HighTables
==========

HighTables makes it trivial to render charts from existing HTML tables using
[jQuery](http://jquery.com/) and [Highcharts](http://www.highcharts.com).

Basic Usage
-----------

To render a chart from any table on your page using HighTables, you have two options:

1. Add a `render-to-[*]-chart` class to your `<table>` element (where `[*]` is a valid chart type, e.g. `line`). A chart will be rendered automatically, just above the table, when the page loads.

2. Create a `<div>` element with a `[*]-chart` class, and specify a data source via the `data-source` attribute. The value of `data-source` should be a valid jQuery selector (such as `"#foo"` or `".bar"`) which identifies the `<table>` element used to render the chart.

The second approach is more flexible than the first as it allows you to render multiple charts from the same table with different custom options. It also decouples the logic used to render your tables from your charting logic, making it possible to (for example) load tables asynchronously from one website and render charts from them on a completely different website.

Line Charts
-----------

- `<table>` class: `render-to-line-chart`
- `<div>` class: `line-chart`

By default, the first column will be used to label the X-axis of the chart, and each column after that will be represented as a data series.

For a [spline](http://en.wikipedia.org/wiki/Spline_%28mathematics%29), or smoothed line, use `spline` instead of `line`.

Area Charts
-----------

- `<table>` class: `render-to-area-chart`
- `<div>` class: `area-chart`

Area charts work basically the same as line charts. For a stack chart, use `stack` instead of `area`.

Bar & Column Charts
-------------------

- `<table>` class: `render-to-bar-chart`
- `<div>` class: `bar-chart`

By default, the first column of the table will be used for bar labels, and each remaining column will be rendered as a group of bars.

Use `column` instead of `bar` to produce a bar chart with vertical bars, i.e., a column chart.

Pie Charts
----------

- `<table>` class: `render-to-pie-chart`
- `<div>` class: `pie-chart`

By default, the first column of the table will be used to name the slices of the pie, and the values in the last column will be used to determine the width of each slice.

Installation
------------

To use HighTables on your website, simply include [hightables.min.js](http://dtao.github.com/HighTables/hightables.min.js) (or [hightables.js](http://dtao.github.com/HighTables/hightables.js)) *after* including jQuery and Highcharts:

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="highcharts.min.js"></script>
<script type="text/javascript" src="hightables.min.js"></script>
```

Options
-------

Support for custom chart options is pretty limited right now:

- **Title**: to give a chart a title, add the `data-title` attribute to the element responsible for rendering the element (the `<table>` or the `<div>`).
- **X-Axis**: to specify a minimum and tick interval for the X-axis, use the `data-x-min` and `data-x-interval` attributes.
- **Y-Axis**: to specify a minimum and tick interval for the Y-axis, use the `data-y-min` and `data-y-interval` attributes.
- **Columns**: to use only certain columns for a table's data, set the `data-value-columns` attribute to a comma-delimited list of the (zero-based) column indices you want to use.

In addition to these options, there is support for a more general customization mechanism: add the `data-options` attribute, and specify the name of a JavaScript function which returns an object with any Highcharts options you like.

API
---

HighTables will automatically render charts when the page loads. However, you can also render charts manually, e.g. if the content of your page is dynamic and/or you want to make charts update and re-render based on user actions.

To render a chart directly above a table, call `HighTables.renderChartFromTable(table)`, where `table` is a raw `<table>` DOM element (not a jQuery object) with an appropriate `render-to-[*]-chart` class.

To render a chart within any arbitrary `<div>` with a `[*]-chart` class, call `HighTables.renderChart(div)`.

You can also immediately re-render all charts on a page by calling `HighTables.renderCharts()`.

So far there isn't much you can do to customize the HighTables library's default behavior. This will almost certainly change, but for now there's really only one configurable default option: the display of Highcharts links (off by default). To show Highcharts some love and turn the display on:

```javascript
HighTables.includeHighchartsLinks = true;
```
