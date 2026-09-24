# Project 2: Vendor & Inventory Performance Analysis (Python)

## Overview
Retail and wholesale distributors lose margin every day to inefficient pricing, slow-moving stock, and over-dependence on a handful of vendors. This project builds a full analytical pipeline — from raw transactional data to a consolidated vendor/brand performance model — to answer five concrete business questions: which brands need pricing/promotion help, which vendors drive the most sales and profit, whether buying in bulk actually lowers unit cost, which vendors are sitting on slow-moving inventory, and whether the profitability gap between top and bottom vendors is statistically real or just noise.

## Data Source
[Vendor Performance Analysis Dataset — Kaggle](https://www.kaggle.com/datasets/vivekkumarkamat/vendor-performance-analysis)

Six raw tables (`begin_inventory`, `end_inventory`, `purchases`, `purchase_prices`, `sales`, `vendor_invoice`) were loaded into a SQLite database (`inventory.db`) using SQLAlchemy/Pandas. Row counts confirmed directly from the data:

| Table | Rows |
|---|---|
| begin_inventory | 206,529 |
| end_inventory | 224,489 |
| purchases | 2,372,474 |
| purchase_prices | 12,261 |
| sales | 12,825,363 |
| vendor_invoice | 5,543 |
| **vendor_sales_summary** (derived) | **10,692** |

## Tools & Technologies
- **Python**: Pandas, NumPy, Matplotlib, Seaborn, SciPy (`stats`, `ttest_ind`)
- **SQL**: SQLite (via `sqlite3` and SQLAlchemy), including CTEs and multi-table joins
- **Jupyter Notebook** for the end-to-end analysis and reporting

## Methodology
1. **Ingestion**: Loaded 6 CSVs into SQLite in 100,000-row chunks via SQLAlchemy; full ingestion completed in 951.59 seconds (~15.9 minutes).
2. **Exploration**: Queried `sqlite_master` and row counts for every table to understand scale and schema before modeling.
3. **Summary table construction**: Built a consolidated `vendor_sales_summary` table using a multi-CTE SQL query joining:
   - `purchase_summary` (purchases joined to purchase prices, filtered to `Price > 0`)
   - `sales_summary` (aggregated sales by vendor/brand)
   - `freight_summary` (freight cost per vendor, **allocated proportionally to each vendor's share of total purchase dollars** to handle the grain mismatch between the freight and purchase tables)
   This consolidation query ran in ~3.21 minutes.
4. **Cleaning**: Filled 178 nulls in sales-derived columns with 0, confirmed 0 duplicate rows, trimmed whitespace from vendor names, cast `Volume` to float.
5. **Feature engineering**: Derived `GrossProfit`, `ProfitMargin`, `StockTurnover`, `SalesToPurchaseRatio`, `UnitPurchasePrice`, and `UnsoldInventoryValue`.
6. **EDA**: Distribution histograms, boxplots, and a correlation heatmap across all numeric fields.
7. **Business analysis** (9 questions), including Pareto-style vendor concentration analysis, bulk-purchase price-elasticity analysis (via `pd.qcut` order-size buckets), inventory turnover screening, and a two-sample hypothesis test comparing profit margins.

## Key Findings
- **Top vendor by sales**: Diageo North America Inc. ($67.99M), followed by Martignetti Companies ($39.32M) and Pernod Ricard USA ($32.05M).
- **Top-selling brands**: Jack Daniel's No. 7 Black ($7.96M), Tito's Handmade Vodka ($7.40M), Grey Goose Vodka ($7.21M).
- **Bulk purchasing effect**: Average unit purchase price falls from **$39.07** (small orders) → **$15.49** (medium) → **$10.78** (large) — roughly a **72% reduction** in unit cost between small and large order sizes.
- **Slow-moving inventory**: Vendors with stock turnover below 1.0 identified, e.g., Alisa Carr Beverages (0.62), Dunn Wine Brokers (0.75), Circa Wines (0.76).
- **Capital locked in unsold inventory**: Diageo North America Inc. alone accounts for ~$724.9K in unsold stock value, followed by Jim Beam Brands Company (~$555.9K).
- **Underperforming brands**: Brands below the 15th percentile of sales ($560.30 threshold) but above the 85th percentile of profit margin were flagged as promotion/pricing candidates.
- **Statistical validation**: Low-performing vendors carry meaningfully higher profit margins (95% CI: 41%–43%, mean 42%) than top-performing vendors (95% CI: 31%–32%, mean 31%). A two-sample t-test confirmed this difference is significant: **t = -17.67, p < 0.0001**, rejecting the null hypothesis of no difference.
- Correlation analysis showed purchase price has almost no relationship with sales revenue or profit (r ≈ -0.01), while purchase and sales quantity are almost perfectly correlated (r = 0.999), confirming efficient inventory pass-through.

## How to Run / Reproduce
1. Download the source CSVs from the [Kaggle dataset](https://www.kaggle.com/datasets/vivekkumarkamat/vendor-performance-analysis) into a local folder.
2. Open `Vendor_Performance_Report.ipynb` in Jupyter and update the `path` variable in the ingestion cell to point to that folder.
3. Run all cells top to bottom — this builds `inventory.db` (SQLite) automatically on first run, then runs the full analysis and generates all charts.
4. A static, pre-rendered version of the full analysis is also available as `Vendor Performance.pdf`.

## Suggested Folder Structure
```
vendor-performance-analysis/
├── README.md
├── notebooks/
│   └── Vendor_Performance_Report.ipynb
├── reports/
│   └── Vendor_Performance_Report.pdf
├── data/
│   └── (source CSVs — see Kaggle link above)
└── images/
    ├── top_vendors_and_brands.png
    ├── purchase_contribution_pareto.png
    └── correlation_heatmap.png
```
