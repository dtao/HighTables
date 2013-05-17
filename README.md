HighTables
==========

HighTables makes it trivial to render charts from existing HTML tables using
[jQuery](http://jquery.com/) and [Highcharts](http://www.highcharts.com).

Basic Usage
-----------

To render a chart from any table on your page using HighTables, you have two options.

### Table-based approach

```html
<table class="render-to-[_____]-chart">
  <!-- ... -->
</table>
```

Fill in the blank above with a valid chart type, e.g. `line`. A chart will be rendered automatically, just above the table, when the page loads.

### Div-based approach

```html
<div class="[_____]-chart" data-source="#chart-data"></div>

<!-- elsewhere on the page -->
<table id="chart-data">
  <!-- ... -->
</table>
```

The value of `data-source` should be a valid CSS selector (such as `"#foo"` or `".bar"`) which identifies the `<table>` element used to render the chart.

The second approach is more flexible than the first as it allows you to render multiple charts from the same table with different custom options. It also decouples the logic used to render your tables from your charting logic, making it possible to (for example) load tables asynchronously from one website and render charts from them on a completely different website.

Line Charts
-----------

```html
<table class="render-to-line-chart">
  <!-- ... -->
</table>

<!-- or: -->
<div class="line-chart" data-source="#line-chart-source"></div>
<table id="line-chart-source">
</table>
```

By default, the first column will be used to label the X-axis of the chart, and each column after that will be represented as a data series.

For a [spline](http://en.wikipedia.org/wiki/Spline_%28mathematics%29), or smoothed line, use `spline` instead of `line`.

Area Charts
-----------

```html
<table class="render-to-area-chart">
  <!-- ... -->
</table>

<!-- or: -->
<div class="area-chart" data-source="#area-chart-source"></div>
<table id="area-chart-source">
</table>
```

Area charts work basically the same as line charts. For a stack chart, use `stack` instead of `area`.

Bar & Column Charts
-------------------

```html
<table class="render-to-bar-chart">
  <!-- ... -->
</table>

<!-- or: -->
<div class="bar-chart" data-source="#bar-chart-source"></div>
<table id="bar-chart-source">
</table>
```

By default, the first column of the table will be used for bar labels, and each remaining column will be rendered as a group of bars. The `data-transpose` option reverses this, using the first *row* for labels and each subsequent *row* as a group of bars.

Use `column` instead of `bar` to produce a bar chart with vertical bars, i.e., a column chart.

Pie Charts
----------

```html
<table class="render-to-pie-chart">
  <!-- ... -->
</table>

<!-- or: -->
<div class="pie-chart" data-source="#pie-chart-source"></div>
<table id="pie-chart-source">
</table>
```

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
- **Order**: to render series in the opposite order they appear in a table, set the `data-order` attribute to "descending".
- **Limit**: to only render the first *N* records in a chart, set `data-limit="[N]"`.
- **Threshold**: to skip values below a certain threshold, use the `data-threshold` attribute.
- **X-Axis**: to specify a minimum and tick interval for the X-axis, use the `data-x-min` and `data-x-interval` attributes.
- **Y-Axis**: to specify a minimum and tick interval for the Y-axis, use the `data-y-min` and `data-y-interval` attributes.
- **Columns**: to use only certain columns for a chart's data, set the `data-value-columns` attribute to a comma-delimited list of the (zero-based) column indices you want to use. Use `"..."` to represent a range; for example:
  - `"5,6"` would use columns 5 and 6 (obviously)
  - `"2,...,5"` would use columns 2, 3, 4, and 5
  - `"3,..."` would use every column starting with column 3
  - `"...,3"` would use every column from 0 to 3
- **Row Filtering**: to filter which rows to use for a chart's data, you can set the `data-row-filter` attribute to the name of a JavaScript function which accepts a row element as an argument and can return `true` to include the row or `false` to exclude it.

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
