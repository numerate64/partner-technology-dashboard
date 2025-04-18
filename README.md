# Partner Technology Dashboard

## Overview
This dashboard provides a mock, interactive view of aggregate sales activity for a set of technology partners, similar to what you might see from a Salesforce tenant. It is designed for demo and internal reporting use, with realistic sample data for all major partners and time periods.

## Features
- **Partner rack**: See all partners in a sortable table with columns for Closed Won, Closed Lost, and Forecasted revenue/gross profit.
- **Time filters**: Filter data by week, month, quarter, or year, and select the reporting year (last 6 years supported).
- **Totals**: See column totals for all metrics at a glance.
- **Details on click**: Click any partner or revenue cell to drill down into opportunity-level details, including company, status, revenue, gross profit, sales rep, SA, and close date, with subtotals.
- **Branding**: Aqueduct Technologies logo in the upper left for a professional look.
- **Fully interactive**: Sorting, filtering, and drill-downs are all handled in-browser with no backend required.

## How to Use
1. **Open the Dashboard**
   - Simply open `index.html` in your web browser (Chrome, Edge, Firefox, Safari, etc.).
   - No server or dependencies are required—everything runs client-side.
2. **Explore the Data**
   - Use the filters at the top to select the year and time period (week, month, quarter, year).
   - Click any column header to sort by that column.
   - Click on a partner name or any revenue/gross profit figure to see detailed opportunities for that partner and period.

## How It Was Built
- **HTML/CSS/JavaScript only**: No frameworks or build steps. All logic is in `app.js`, styles in `style.css`, and markup in `index.html`.
- **Mock data**: Generated in-browser for all partners and all filter permutations, including realistic opportunity names, companies, statuses, revenue, and gross profit margins.
- **Responsive design**: Layout is clean and modern, suitable for desktop and large tablet screens.
- **Branding**: Uses the official Aqueduct Technologies PNG logo.

## Customization
- To add or remove partners, edit the `mockData` array in `app.js`.
- To change branding, replace `aqueduct-logo.png`.
- For more realistic data or Salesforce integration, logic can be extended in `app.js`.

---
For questions or further customization, contact the Aqueduct Technologies engineering team.
