# Project 3: Monthly Income & Expense Tracker (Excel)

## Overview
Most people lose track of where their money goes because tracking requires either a subscription app or manual spreadsheet discipline. This project is a self-contained, macro-enabled Excel workbook that logs every income and expense transaction, then automatically rolls it up into monthly and quarterly dashboards — giving an at-a-glance view of net savings trends, category-level spending, and outlier transactions, with zero external tools or add-ins required.

## Data Source
Sample/demo transaction data (not real personal finances) covering **January–March 2025** in **PKR (Pakistani Rupees)** — 81 transaction rows in the "Raw Data" sheet, spanning ~25 income and expense categories such as Groceries, Utilities, Education, Taxes, and Business income, built to demonstrate the tracker's formulas and dashboard design.

## Tools & Technologies
- **Microsoft Excel** (macro-enabled `.xlsm` workbook)
- Formulas: `SUMIF`, `AVERAGEIF`, `COUNTIF`, `COUNTIFS`, `TEXT`, `YEAR`/`MONTH`
- Data Validation (controlled Type/Category input lists)
- Conditional Formatting and Sparklines (in-cell trend indicators)
- 14 native Excel charts embedded across the Summary and monthly sheets

## Methodology
1. **Raw Data sheet**: single source of truth — every transaction logged with Date, Month, Type (Income/Expense), Category, Amount, and Description.
2. **Monthly sheets** (January, February, March): each builds a calendar view of the month alongside Income Summary and Expense Summary tables driven by `SUMIF`/`AVERAGEIF`/`COUNTIF` formulas referencing the Raw Data range.
3. **Outlier/bucket analysis**: transactions are automatically grouped into >10,000 / 6,000–10,000 / <6,000 PKR spending bands using `COUNTIFS`, giving quick visibility into high-value vs routine transactions.
4. **Summary dashboard**: consolidates all three months into total income, total expenses, and net savings, plus income-source and expense-category breakdowns, a highest/lowest expense category callout, and month-over-month sparkline trends.
5. **Data validation** constrains the Type and Category columns to controlled lists so new entries stay consistent with existing reporting logic.

## Key Findings
*(All figures in PKR)*
- **Total income**: 1,670,000 across the quarter (Jan: 585,000 / Feb: 490,000 / Mar: 595,000).
- **Total expenses**: 1,086,500 (Jan: 337,900 / Feb: 310,200 / Mar: 438,400).
- **Net savings**: 583,500 for the quarter — a savings rate ranging from ~26% (March) to ~42% (January).
- **Highest expense category**: Taxes (150,000 total). **Lowest**: Milk (11,900 total).
- **March** saw the largest month-over-month expense increase (+41% vs. February), driven largely by Ramazan Preparation, Gifts & Charity, and bulk grocery purchases.

## How to Run / Reproduce
1. Open `Monthly_Expanse_Tracker.xlsm` in Excel and enable macros when prompted.
2. Add new transactions to the **Raw Data** sheet following the existing 6-column structure (Date, Month, Type, Category, Amount, Description).
3. The Summary sheet and each monthly sheet recalculate automatically from the Raw Data range — no manual refresh needed.
4. To extend the tracker to a new month, duplicate an existing monthly sheet tab, update its calendar/date formulas for the new month, and it will pick up new rows automatically.

## Suggested Folder Structure
```
monthly-expense-tracker/
├── README.md
├── Monthly_Expense_Tracker.xlsm
└── images/
    └── summary_dashboard.png
```
