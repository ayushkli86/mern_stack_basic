# Data Analysis & Statistics — Compiled Study Questions

---

## Unit I: Data Analysis Pipeline

### 1.1 The Knowledge Discovery from Database (KDD) Process

**Q1 — Selection & Integration in KDD**
Define Knowledge Discovery in Databases (KDD) and explain how the Selection and Integration stages ensure a target dataset is relevant and coherent.

**Q8 — Full KDD Process, Preprocessing, Transformation & GIGO**
Explain the Knowledge Discovery from Databases (KDD) process. Describe the specific actions taken during the "Preprocessing" and "Transformation" stages. Discuss the concept of "Garbage In, Garbage Out" (GIGO). Why is data cleaning considered the foundation of any predictive model?

### 1.3 Overview of Data Preprocessing

**Q13 — Standardization (Z-score Normalization)**
What is Standardization (Z-score normalization)? What is the need of standardization in data analysis? You are given the following 20 data points for a numeric feature X:
46.93, 138.07, 64.77, 51.46, 15.38, 15.37, 11.32, 223.21, 120.23, 19.85, 19.80, 12.39, 55.79, 86.31, 3.99, 101.51, 30.71, 94.28, 102.39, 18.04

---

## Unit II: Statistical Foundation

### 2.2 Empirical Distribution — Numeric Data (Histograms, Normal, Exponential, Power Law)

**Q2 — Normal vs Power Law & Fat Tails**
Compare the Normal Distribution with the Power Law Distribution. Explain the concept of "Fat Tails" and why the mean is often a misleading metric for Power Law data.

**Q9 — Normal, Exponential & Power Law Distributions + Memoryless Property**
Compare and contrast Normal Distribution, Exponential Distribution, and Power Law Distribution. Provide one real-world application for each. Define the "Memoryless Property" of the Exponential Distribution. If a customer has already waited 10 minutes for a call, how does this property affect the probability of waiting another 5 minutes?

**Q11 (Part 2) — Histogram vs Bar Plot for Numeric Data**
Why is a Histogram more suitable for numeric data compared to a Bar Plot? Mention the significance of "Touching Bars" and "Bin Width."

**Q14 — Drawing a Histogram & Classifying Distribution**
Draw the histogram for the following numeric values with appropriate bins. Based on the histogram also determine the nature of empirical distribution. Classify the data as normal, exponential or power laws and why?
46.93, 138.07, 64.77, 51.46, 15.38, 15.37, 11.32, 223.21, 120.23, 19.85, 19.80, 12.39, 55.79, 86.31, 3.99, 101.51, 30.71, 94.28, 102.39, 18.04

### 2.2 Empirical Distribution — Categorical Data (Zipf's Law)

**Q3 — Zipf's Law as a Power Law Application**
Describe Zipf's Law as a specific application of the Power Law. Provide a numerical illustration of how this law applies to word frequencies.

**Q11 (Part 1) — Zipf's Law Word Frequency Calculation**
Explain Zipf's Law. If the most frequent word in a corpus of 50,000 words appears 3,000 times, calculate the predicted frequency of the words ranked 2nd, 3rd, and 10th.

### 2.3 & 2.4 Correlation Analysis & Statistical Significance

**Q15 — Pearson Correlation Coefficient (Age vs Salary)**
Define Pearson correlation. You are provided with the following dataset of 5 individuals, where x represents age and y represents annual salary:

| Age | Salary (Rs) |
|-----|-------------|
| 25  | 30000       |
| 32  | 45000       |
| 40  | 55000       |
| 48  | 65000       |
| 55  | 75000       |

Calculate the Pearson correlation coefficient between Age and Salary and interpret the result. Does the data suggest a strong, weak, or no linear relationship between age and salary?

**Q16 — Chi-Square Test (Marketing Channel vs Purchase Decision)**
A retail brand collected data on marketing channel and purchase decision from 200 customers. The cross-tabulation results are:
*(table in PDF)*

Calculate the Chi-Square statistic using the formula χ² = Σ(O-E)²/E. The critical value at α = 0.05 with df = 1 is 3.84. Determine if there is a significant association between marketing channel and purchase decision.

**Q21 — Full Chi-Square Test (Age Group vs Product Preference)**
A retail store wants to know if customer age group is associated with product category preference. Data from 150 customers:
*(table in PDF)*

(a) State the null and alternative hypotheses.
(b) Calculate the expected frequencies for each cell under the null hypothesis. Show the formula and one example calculation.
(c) Calculate the Chi-Square statistic: χ² = Σ(O-E)²/E.
(d) The critical value for χ² at α = 0.05 is 9.488. Determine if you reject or fail to reject H₀.
(e) What is your conclusion about the association between age group and product preference?

---

## Unit III: Numeric Data

### 3.1 Multivariate Linear Regression

#### 3.1.1 Matrix Formulation & OLS Estimation

**Q12 — OLS Estimator Derivation & Residual Properties**
Provide a step-by-step matrix derivation of the OLS Estimator β. State the two key properties of the Residual Vector (e) in OLS regression.

#### 3.1.2 Measures of Fit (R² & Adjusted R²)

**Q7 — Flaw of R² & How Adjusted R² Prevents Overfitting**
Explain the primary "flaw" of the Coefficient of Determination (R²) in multivariate regression and describe how Adjusted R² penalizes model complexity to prevent overfitting.

**Q10 — Adjusted R² Calculation with Noise Variables**
Define R-Squared (R²). Explain why R² can never decrease in a multivariate regression and why this leads to overfitting. A model with 20 observations and 1 predictor has an R² of 0.60. After adding 4 "noise" variables, R² rises to 0.65. Calculate the Adjusted R² for both scenarios. Was adding the variables a good decision?

#### 3.1.3 Multicollinearity & Variance Inflation Factors (VIF)

**Q4 — Consequences of Multicollinearity & VIF Threshold**
Identify three negative consequences of Multicollinearity in a regression model, specifically its impact on standard errors. Explain how to calculate the Variance Inflation Factor (VIF). What numerical threshold indicates a "Serious Problem"?

**Q6 — Defining Multicollinearity & Detection Methods**
Define Multicollinearity and explain how it degrades the reliability of a regression model's coefficients. Identify two methods an analyst can use to detect its presence.

### 3.2 Non-parametric Regression (Nadaraya-Watson Kernel Regression)

**Q5 — Parametric vs Non-parametric & Bandwidth Impact**
Differentiate between parametric and non-parametric regression. In Nadaraya-Watson Kernel Regression, discuss the consequences of selecting a Bandwidth (h) that is too large versus one that is too small.

**Q17 — Nadaraya-Watson Prediction for x = 15**
What is the key difference between parametric and non-parametric regression? When would you prefer Nadaraya-Watson kernel regression over linear regression? Given three data points: (x₁=10, y₁=20), (x₂=20, y₂=40), (x₃=30, y₃=100). Predict the value of Y for x = 15 using the Nadaraya-Watson estimator with a uniform kernel and bandwidth h = 8. Show all steps.

**Q18 — Bandwidth Selection Methods**
Explain the concept of bandwidth (h) in kernel regression. What happens when h is too small versus when h is too large? Describe three methods for selecting the optimal bandwidth in non-parametric regression. Which method is most commonly used in practice and why?

### 3.3 Principal Component Analysis (PCA)

**Q19 — Dimensionality Reduction & Role of Eigenvalues/Eigenvectors**
Explain the concept of dimensionality reduction using PCA. What are eigenvalues and eigenvectors in the context of PCA?

**Q20 — PCA Computation (Centering, Covariance, Eigenvalues, Interpretation)**
A dataset contains the following measurements for 5 students: Hours Studied (X₁) and Practice Tests Taken (X₂).
*(data in PDF)*

(a) Calculate the mean of each variable and center the data.
(b) Compute the covariance matrix S.
(c) Find the eigenvalues of the covariance matrix by solving |S - λI| = 0.
(d) Calculate the proportion of variance explained by each principal component.
(e) Interpret the first principal component.
