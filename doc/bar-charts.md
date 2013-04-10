Bar & Column Charts
-------------------

```html
<table class="render-to-bar-chart">
  <!-- ... -->
</table>

<!-- OR: -->

<div class="bar-chart" data-source="#bar-chart-source"></div>

<!-- elsewhere -->
<table id="bar-chart-source"><!-- ... --></table>
```

By default, the first column of the table will be used for bar labels, and each remaining column will be rendered as a group of bars.

Use `column` instead of `bar` to produce a bar chart with vertical bars, i.e., a column chart.
