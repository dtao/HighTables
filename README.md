HighTables
==========

HighTables makes it trivial to render charts from existing HTML tables using
[jQuery](http://jquery.com/) and [Highcharts](http://www.highcharts.com).

Installation
------------

To use HighTables on your website, simply include jQuery and Highcharts (in any order) and then
include hightables.min.js <em>after</em> those libraries:

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="highcharts.min.js"></script>
<script type="text/javascript" src="hightables.min.js"></script>
```

Basic Usage
-----------

To render a chart from any table on your page using HighTables, you have two options:

1. Add an extra HighTables-defined class to your `<table>` element, such as `render-to-line-chart`.
   A chart will be rendered automatically (above the table by default) when the page loads. The
   biggest benefit to this approach is that it is **dead simple**.
2. Create a `<div>` element with a HighTables-defined class, such as `pie-chart`. This approach
   requires also specifying a data source via the `data-source` attribute, whose value should be a
   valid jQuery selector (such as `"#foo"` or `".bar"`) for the `<table>` element used to render the
   chart.

Line Charts
-----------

Render a line chart by adding the `render-to-line-chart` class to an existing `<table>` element or
creating a `<div>` element with the `line-chart` class. By default, the first column will be used to
label the X-axis of the chart, and each column after that will be represented as a data series.

Area Charts
-----------

To make an area chart instead of a line chart, add the `render-to-area-chart` class to a `<table>`
element, or create a `<div>` with the class `area-chart`.

Useful to know is that you can also easily render multiple charts from a single table. For example,
adding the `render-to-stack-chart` class to a `<table>` element (or creating another `<div>` with
the `stack-chart` class) will produce an area chart with stacked areas.

Bar & Column Charts
-------------------

Add the class `render-to-bar-chart` to an existing `<table>` element or create a `<div>` with the
`bar-chart` class to create a bar chart. By default, the first column of the table will be used for
bar labels, and each remaining column will be rendered as a group of bars.

The `render-to-column-chart` (for a `<table>`) and `column-chart` classes (for a `<div>`) produce a
bar chart with vertical bars, a.k.a. a column chart.

Pie Charts
----------

You can also render pie charts by adding the `render-to-pie-chart` class to an existing `<table>`
element or creating a `<div>` with the `pie-chart` class. By default, the first column of the table
will be used to name the slices of the pie, and the values in the last column will be used to
determine the width of each slice.

Options
-------

Support for custom chart options is pretty limited right now. From
[dogfooding](http://en.wikipedia.org/wiki/Dogfooding), I've only had need for (and thus only built)
the following customizable options:

- **Title**: to give a chart a title, add the `data-title` attribute to the underlying table.
- **X Interval**: to specify a tick interval for the X-axis, use the `data-x-interval` attribute.

In addition to these options, however, there is support for a more general customization mechanism:
add the `data-options` attribute, and specify the name of a JavaScript function which returns an
object with any Highcharts options you like.

API
---

So far there isn't much you can do to interact with HighTables programmatically. This will almost
certainly change, but for now there's really only one thing you can do: disable the default hiding
of Highcharts links:

```javascript
HighTables.includeHighchartsLinks = true;
```
