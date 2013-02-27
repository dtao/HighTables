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
