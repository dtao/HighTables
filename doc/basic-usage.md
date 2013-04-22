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
