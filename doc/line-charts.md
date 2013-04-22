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
