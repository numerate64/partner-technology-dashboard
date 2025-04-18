# Partner Technology Dashboard

## Overview
This dashboard provides a mock, interactive view of aggregate sales activity for a set of technology partners, similar to what you might see from a Salesforce tenant. It is designed for demo and internal reporting use, with realistic sample data for all major partners and time periods.

## Features
- **Partner stack rank**: See all partners in a sortable table with columns for Closed Won, Closed Lost, and Forecasted revenue/gross profit.
- **Time filters**: Filter data by week, month, quarter, or year, and select the reporting year (last 6 years supported).
- **Totals**: See column totals for all metrics at a glance.
- **Details on click**: Click any partner or revenue cell to drill down into opportunity-level details, including company, status, revenue, gross profit, sales rep, SA, and close date, with subtotals.
- **Branding**: Aqueduct Technologies logo in the upper left for a professional look.
- **Fully interactive**: Sorting, filtering, and drill-downs are all handled in-browser with no backend required.
- **Export**: Export the dashboard as CSV, Excel (.xlsx), or PDF with a single click. All exports reflect current filters and sorting.

## How to Use
1. **Open the Dashboard**
   - Simply open `index.html` in your web browser (Chrome, Edge, Firefox, Safari, etc.).
   - No server or dependencies are required—everything runs client-side.
2. **Explore the Data**
   - Use the filters at the top to select the year and time period (week, month, quarter, year).
   - Click any column header to sort by that column.
   - Click on a partner name or any revenue/gross profit figure to see detailed opportunities for that partner and period.
3. **Export Reports**
   - Use the export buttons at the top to download the dashboard as CSV, Excel, or PDF.
   - Exports always include all visible partners and totals, matching your current filters and sort order.

## How It Was Built
- **HTML/CSS/JavaScript only**: No frameworks or build steps. All logic is in `app.js`, styles in `style.css`, and markup in `index.html`.
- **Mock data**: Generated in-browser for all partners and all filter permutations, including realistic opportunity names, companies, statuses, revenue, and gross profit margins.
- **Responsive design**: Layout is clean and modern, suitable for desktop and large tablet screens.
- **Branding**: Uses the official Aqueduct Technologies PNG logo.
- **Export libraries**: Uses SheetJS for Excel export and jsPDF (with autoTable) for PDF export. No installation required—libraries are included locally.

## Customization
- To add or remove partners, edit the `mockData` array in `app.js`.
- To change branding, replace `aqueduct-logo.png`.
- For more realistic data or Salesforce integration, logic can be extended in `app.js`.
- To modify export formats or add more export options, see the export logic in `app.js`.

---
For questions or further customization, contact the Aqueduct Technologies engineering team.
