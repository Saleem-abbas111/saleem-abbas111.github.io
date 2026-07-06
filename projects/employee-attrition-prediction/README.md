# Project 1: Employee Attrition Prediction (R)

## Overview
Employee turnover is expensive — it costs organizations in recruitment, training, and lost institutional knowledge, yet most HR teams still react to attrition after it happens rather than predicting it. This project builds and validates two classification models (Logistic Regression and Decision Tree) in R to predict the likelihood of employee attrition, identifies the strongest behavioral and demographic drivers of turnover, and translates those findings into concrete HR policy recommendations.

## Data Source
[Employee Attrition Prediction Dataset — Kaggle](https://www.kaggle.com/datasets/ziya07/employee-attrition-prediction-dataset?select=employee_attrition_dataset.csv)

The raw dataset spans **4,410 employees** across 4 linked files:
- `general_data.csv` — 29 core fields (demographics, job role, compensation, tenure, `Attrition` target)
- `employee_survey_data.csv` — EnvironmentSatisfaction, JobSatisfaction, WorkLifeBalance
- `manager_survey_data.csv` — JobInvolvement, PerformanceRating
- `working_hours.csv` — daily clock-in/out records per employee, used to engineer overtime and leave variables

## Tools & Technologies
- **R**: `dplyr`, `openxlsx`, `rpart`/`rpart.plot` (Decision Tree), `pROC`/`PRROC` (ROC & PR curve evaluation), `glm`/`step()` (logistic regression + stepwise selection)
- **Microsoft Excel**: data cleaning, EDA, and new-variable construction prior to modeling (17-sheet workbook covering raw/cleaned data, outlier and age analysis, correlation matrix, working-hours derivation, and full train/test outputs for the main model plus 4 cross-validation folds)

## Methodology
1. **Data dictionary & problem framing**: Mapped all 29 input variables (demographics, job role, compensation, satisfaction scores, tenure) against the `Attrition` target.
2. **EDA & cleaning (in Excel)**:
   - Outlier detection via IQR on `MonthlyIncome` and `DistanceFromHome`. ~340 `MonthlyIncome` values (≈8% of data) fell outside bounds but were retained after review, since they belonged to senior/high-tenure staff rather than data errors.
   - Missing values: `EnvironmentSatisfaction`, `JobSatisfaction`, and `WorkLifeBalance` NAs were imputed with the mode within Department/Job Role/Job Level groups (appropriate since these are ordinal categorical fields); `TotalWorkingYears` NAs used the overall median.
   - `NumCompaniesWorked`: NAs filled with the median; 0-values (logically impossible) were recalculated using `1 + (TotalWorkingYears - YearsAtCompany)`.
   - Removed two constant/non-informative columns (`Over18`, `EmployeeCount`).
   - Engineered 4 new variables from the daily working-hours data: `Overtime`, `No. of Overtimes`, `Total Hours Worked`, and `No. of Leaves`.
3. **Modeling (in R)**: Converted `Attrition` and all categorical/ordinal fields to factors. Split data into a main 80/20 train-test set plus 4 additional stratified folds (A–D, 882 rows each) for cross-validation.
   - Built a full logistic regression model (`glm`, binomial family), then applied **backward stepwise selection** to retain only significant predictors.
   - Built a Decision Tree (`rpart`) with tuned complexity parameters (`minbucket = 40`, `cp = 0.00159`) to control overfitting.
4. **Validation**: Evaluated both models on train and test splits — and across all 4 cross-validation folds — using ROC curves, Precision-Recall curves, and AUC (via `pROC` and `PRROC`).
5. **Interpretation**: Ranked significant variables using coefficient magnitude (Logistic Regression) and feature importance (Decision Tree), linking each to HR theory and concrete policy recommendations.

## Key Findings
- **Logistic Regression outperformed the Decision Tree**: ROC-AUC of **0.8409 (train) / 0.8452 (test)** vs. the Decision Tree's **0.7282 (train) / 0.7332 (test)**.
- **Logistic Regression PR-AUC**: 0.5670 (train) / 0.5685 (test), vs. Decision Tree's 0.4614 (train) / 0.4311 (test).
- **Optimal classification threshold** for Logistic Regression was **0.28–0.29**, achieving a peak test F1-score of **29.97%** (recall 67.42% at that point); F1 rose from 22.69% at threshold 0.10 to a maximum of 28.56% at 0.28 before declining.
- **Decision Tree** was far less threshold-sensitive, holding steady between thresholds 0.24–0.30 with test-set precision 48.41%, recall 41.50%, F1 22.34%.
- **Top predictive drivers of attrition** (consistent across both models): Years Since Last Promotion, Overtime/Total Hours Worked, Environment Satisfaction, Job Satisfaction, Total Working Years, Monthly Income, Marital Status, Age, Job Role, Years with Current Manager, and Number of Companies Worked.
- Translated findings into 5 concrete HR policy recommendations: transparent promotion pathways ("career lattices"), overtime caps with a review trigger, culture/engagement investment, competitive pay benchmarking, and manager-transition ("stay interview") protocols.

## How to Run / Reproduce
1. Place `general_data.csv`, `employee_survey_data.csv`, `manager_survey_data.csv`, and `working_hours.csv` in your working directory (or reference the cleaned, merged sheet in the Excel workbook).
2. Open `Group 10_Excel.xlsx` to review/reproduce the EDA and cleaning steps (Raw Data → Cleaned Data → Outliers/Age/Correlation/Working Hrs sheets).
3. Open `R Coding.R` in RStudio, update `setwd()` to your local path, and source the script — it reads the cleaned data, builds the main train/test split plus 4 cross-validation folds, fits both models, and generates all ROC/PR plots and the decision tree plot.
4. The compiled write-up is available as `Attrition_Project_Report.pdf`.

## Suggested Folder Structure
```
employee-attrition-r/
├── README.md
├── R/
│   └── R_Coding.R
├── data/
│   ├── general_data.csv
│   ├── employee_survey_data.csv
│   ├── manager_survey_data.csv
│   ├── working_hours.csv
│   └── data_dictionary.xlsx
├── excel/
│   └── EDA_and_cleaning.xlsx
├── report/
│   └── Attrition_Project_Report.pdf
└── images/
    ├── roc_pr_curves_logistic.png
    ├── roc_pr_curves_decision_tree.png
    └── decision_tree_plot.png
```
