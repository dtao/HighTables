Basic Usage
-----------

To render a chart from any table on your page using HighTables, you have two options:

1. Add a `render-to-[*]-chart` class to your `<table>` element (where `[*]` is a valid chart type, e.g. `line`). A chart will be rendered automatically, just above the table, when the page loads.

2. Create a `<div>` element with a `[*]-chart` class, and specify a data source via the `data-source` attribute. The value of `data-source` should be a valid jQuery selector (such as `"#foo"` or `".bar"`) which identifies the `<table>` element used to render the chart.

The second approach is more flexible than the first as it allows you to render multiple charts from the same table with different custom options. It also decouples the logic used to render your tables from your charting logic, making it possible to (for example) load tables asynchronously from one website and render charts from them on a completely different website.
