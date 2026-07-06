# Project 4: Ecommerce Sales & Vendor Performance Dashboard (SQL + Excel + Power BI)

## Overview
Ecommerce platforms generate order, payment, delivery, and review data across multiple disconnected systems, making it hard to see the full sales and customer-experience picture in one place. This project builds a complete SQL Server → Excel → Power BI pipeline on a Brazilian ecommerce marketplace dataset — cleaning and modeling ~100K orders in SQL, staging KPI tables in Excel, and delivering an interactive Power BI dashboard covering sales trends, order behavior, payment methods, delivery performance, and customer review sentiment.

## Data Source
A Brazilian ecommerce marketplace dataset (Olist-style public dataset) spanning 7 linked CSV tables:

| Table | Rows |
|---|---|
| orders | 112,277 |
| Customers | 99,442 |
| delivery_status | 99,442 |
| payment_mode | 99,441 |
| reviews | 104,124 |
| products | 32,952 |
| sellers | 3,096 |

**[ASK USER]** Please confirm the exact public source/link for this dataset (it matches the well-known Brazilian E-Commerce Public Dataset by Olist on Kaggle) so it can be properly credited in the README.

## Tools & Technologies
- **SQL Server (T-SQL)**: data cleaning (deduplication, null handling) and KPI queries (window functions, joins, date functions)
- **Python (pandas-profiling)**: automated exploratory data-quality reports generated per table
- **Microsoft Excel**: staging workbook consolidating SQL KPI outputs into pivot-ready tables
- **Power BI Desktop**: final interactive dashboard (Power Query, DAX, cards, area/bar/donut charts, pivot tables)

## Methodology
1. **Data cleaning (SQL Server)**:
   - Removed duplicate order rows using `ROW_NUMBER() OVER (PARTITION BY ...)` keyed on customer, freight value, order date, product, quantity, seller, and ship date.
   - Standardized nulls in the `products` table (category name set to `'NULL'`; numeric fields like description length, dimensions, weight, and photo count defaulted to 0 via `ISNULL`).
   - Standardized null review comment titles/messages to `'NULL'` for consistent downstream filtering.
2. **Automated data profiling (Python)**: Generated a `pandas-profiling` HTML report for each of the 7 tables (customers, orders, products, sellers, reviews, payment mode, delivery status) to catch data-quality issues before KPI development.
3. **KPI development (SQL Server)**, including:
   - Sales growth by year/month
   - Average orders per hour of day (via `DATEPART(HOUR, ...)`, deduplicated by distinct order per hour/day)
   - Top 5 product categories by total sales
   - Top 10 most frequent negative-review comment titles (review score < 3)
   - Regional performance: average order value, freight cost, quantity ordered, and delivery days by customer region
4. **Excel staging**: SQL KPI outputs and cross-tab tables (review category by payment type, delivery status counts, category × rating breakdown) were loaded into a dedicated Excel workbook (`DMV Project-Excel.xlsx`) to prepare clean, pivot-ready tables for Power BI.
5. **Power BI dashboard**: Final single-page report combining all of the above into KPI cards, a year/month sales trend area chart, top-5-category bar chart, payment-type donut chart, review-category donut chart, average-orders-per-hour column chart, delivery-status table, and a category × rating pivot table.

## Key Findings
*(from the Power BI dashboard)*
- **Total Sales**: 26.9M | **Total Orders**: 98K | **Average Order Value**: 273.9 | **Average Freight Value**: 20 | **Cancellation Rate**: 0.53%
- **Delivery outcomes**: 96,478 delivered, 1,107 shipped, 625 canceled, 609 unavailable, 314 invoiced — out of 99,441 total order-status records.
- **Payment methods**: Credit card dominates at 75,387 transactions (75.8%), followed by boleto (19,784 / 19.9%), voucher (2,739 / 2.75%), and debit card (1,527 / 2.75% combined with "not defined").
- **Review sentiment**: 76,049 "Good" (rating > 3) reviews vs. 14,486 "Bad" (rating < 3) and 8,138 "Neutral" (rating = 3) — a healthy ~78% positive-review rate.
- **Top 5 categories by sales**: beleza_saúde (health & beauty, ~2.5M), relógios_presentes (watches & gifts, ~2.4M), cama_mesa_banho (bed/bath/table, ~2.0M), esporte_lazer (sports & leisure, ~2.0M), informática_acessórios (computer accessories, ~1.8M).
- **Order timing**: order volume shows a clear intraday pattern, ramping from early morning, peaking mid-afternoon, and tapering into the evening.

## How to Run / Reproduce
1. Restore the 7 source CSVs (`orders`, `Customers`, `delivery_status`, `payment_mode`, `reviews`, `products`, `sellers`) into a SQL Server database.
2. Run `Data Cleaning Queries.sql` first to deduplicate and standardize nulls, then `KPIs and Tables.sql` to generate the KPI result sets and staging tables.
3. Load the SQL outputs into `DMV Project-Excel.xlsx` (or re-point its Power Query connections at your own SQL Server instance).
4. Open `DMV Project-Power BI.pbix` in Power BI Desktop and refresh the data connections to pull from your SQL Server/Excel sources.
5. (Optional) Regenerate the pandas-profiling HTML reports per table for a fresh data-quality check before re-running the pipeline.

## Suggested Folder Structure
```
ecommerce-sql-excel-powerbi/
├── README.md
├── sql/
│   ├── Data Cleaning Queries.sql
│   └── KPIs and Tables.sql
├── excel/
│   └── DMV Project-Excel.xlsx
├── powerbi/
│   └── DMV Project-Power BI.pbix
├── data/
│   └── (7 source CSVs — orders, customers, products, sellers, reviews, payment_mode, delivery_status)
├── profiling/
│   └── (7 pandas-profiling HTML reports, one per table)
└── images/
    └── dashboard_screenshot.png
```
