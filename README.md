Line & Area Charts
==================

Rendering a line chart simply requires adding the `render-to-line-chart` class to an existing `<table>` element. By default, the first column will be used to label the X-axis of the chart, and each column after that will be represented as a data series.

Area Charts
-----------

To make an area chart instead of a line chart, add the `render-to-area-chart` class instead.

You can also add multiple classes, which will render multiple charts. The `render-to-stack-chart` class will result in an area chart with stacked areas.

Bar & Column Charts
===================

For bar charts, add the class `render-to-bar-chart` to an existing `<table>` element. By default, the first column of the table will be used for bar labels, and each remaining column will be rendered as a group of bars.

Add the `render-to-column-chart` class for a column chart instead of a bar chart.

Pie Charts
==========

Rendering a pie chart is as simple as adding the class `render-to-pie-chart` to an existing `<table>` element. By default, the first column of the table will be used to name the slices of the pie, and the values in the last column will be used to determine the width of each slice.

Options
=======

Support for custom chart options is pretty limited right now. From [dogfooding](http://en.wikipedia.org/wiki/Dogfooding), I've only had need for (and thus only built) the following customizable options:

- *Title*: to give a chart a title, add the `data-title` attribute to the underlying table.
- *X Interval*: to specify a tick interval for the X-axis, use the `data-x-interval` attribute.

In addition to these options, however, there is support for a more general customization mechanism: add the `data-options` attribute, and specify the name of a JavaScript function which returns an object with any Highcharts options you like.

Installation
============

To use HighTables on your website, simply include jQuery and Highcharts (in any order) and then include hightables.min.js <em>after</em> those libraries:

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="highcharts.min.js"></script>
<script type="text/javascript" src="hightables.min.js"></script>
```

API
===

So far there isn't much you can do to interact with HighTables programmatically. This will almost certainly change, but for now there's really only one thing you can do: disable the default hiding of Highcharts links:

```javascript
HighTables.includeHighchartsLinks = true;
```
