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
