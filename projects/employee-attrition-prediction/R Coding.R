
library(dplyr)
library(openxlsx)
library(PRROC)
library(pROC)
library(rpart)
library(rpart.plot)

setwd("C:/Users/krish/OneDrive/Desktop/IBA/7th Semester/AAMD/Final Project")
list.files()

data <- read.xlsx("Project File.xlsx", sheet = 2)

# Dropping the random variable column
data <- data[,-c(8,32)]

str(data)

# Converting 'Attrition' from character to factor
data$Attrition <- as.factor(data$Attrition)

# Converting all character columns to factor
char_vars <- sapply(data, is.character)
data[char_vars] <- lapply(data[char_vars], as.factor)

str(data)

# Converting the relevant num/int variables to factors
# As these are ordinal scales and not numbers 

factor_vars <- c(
  "Education",                  # 1 to 5
  "JobLevel",                   # 1 to 5
  "StockOptionLevel",           # 0 to 3
  "EnvironmentSatisfaction",    # 1 to 4
  "JobSatisfaction",            # 1 to 4
  "WorkLifeBalance",            # 1 to 4
  "JobInvolvement",             # 1 to 4
  "PerformanceRating"           # 3 or 4
)

data[factor_vars] <- lapply(data[factor_vars], as.factor)

str(data)

# Splitting the data set for the main model  and Cross validation ---------
set.seed(123)
fold_size <- 882

# Test A
test_A  <- data[1:fold_size, ]
train_A <- data[-(1:fold_size), ]

# Test B
test_B <- data[(fold_size + 1):(2 * fold_size), ]
train_B <- data[-((fold_size + 1):(2 * fold_size)), ]

# Test C
test_C <- data[(2 * fold_size + 1):(3 * fold_size), ]
train_C <- data[-((2 * fold_size + 1):(3 * fold_size)), ]

# Test D
test_D  <- data[(3 * fold_size + 1):(4 * fold_size), ]
train_D <- data[-((3 * fold_size + 1):(4 * fold_size)), ]

# Main Model 
test  <- data[(4 * fold_size + 1):(5 * fold_size), ]
train <- data[-((4 * fold_size + 1):(5 *fold_size)),]



# Making the Main logistic model ----------
model <- glm(Attrition ~ ., data = train, family = binomial)
summary(model)

# Backward step wise regression model
model_final <- step(model, direction = "backward")
summary(model_final)

# Predicting the probabilities using the final model 
train_pred <- model_final$fitted.values
test_pred  <- predict(model_final, newdata = test, type = "response")

# combining the train/test with pred prob and renaming the pred_prob column
full_train <- mutate(train,train_pred)
full_test <- mutate(test,test_pred)

full_train$Train_Test <- "Train"
full_test$Train_Test <- "Test"

full_train <- full_train %>% rename(pred_prob = train_pred)
full_test <- full_test %>% rename(pred_prob = test_pred)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_data <- rbind(full_train,full_test)
combined_data <- combined_data[order(as.numeric(rownames(combined_data))), ]
write.csv(combined_data, file="logistic_Final.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
train_outcome <- ifelse(train$Attrition == "Yes", 1, 0)
test_outcome  <- ifelse(test$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train <- roc(train_outcome, train_pred)
plot(roc_train, main = "ROC Curve - Training Data", col = "blue")
auc(roc_train)  # Area Under Curve

# ROC for Testing Data
roc_test <- roc(test_outcome, test_pred)
plot(roc_test, main = "ROC Curve - Test Data", col = "green")
auc(roc_test)

# PR Curve fir Training Data
pr_train <- pr.curve(scores.class0 = train_pred[train_outcome == 1],
                     scores.class1 = train_pred[train_outcome == 0],
                     curve = TRUE)
plot(pr_train, main = "Precision-Recall Curve - Training Data")
pr_train$auc.integral

# PR Curve for Testing Data 
pr_test <- pr.curve(scores.class0 = test_pred[test_outcome == 1],
                    scores.class1 = test_pred[test_outcome == 0],
                    curve = TRUE)
plot(pr_test, main = "Precision-Recall Curve - Test Data")
pr_test$auc.integral

# Decision Tress Plotting for the main model ---------- 

# Making the training tree model 
tree_model <- rpart(Attrition ~ .,data = train,
                    method = "class",control = rpart.control(
                      minbucket = 40, cp = 0.00159))
tree_model

tree_model$variable.importance

# Plotting the Decision tree 
par(mar = c(1, 1, 2, 1))
rpart.plot(tree_model, type = 2, extra = 104, under = TRUE, faclen = 0,
           cex = 0.7, main = "Decision Tree - Attrition")

# Predicting probabilities for "YES" 
train_tree_pred_prob <- predict(tree_model, newdata = train, type = "prob")[, "Yes"]
test_tree_pred_prob  <- predict(tree_model, newdata = test, type = "prob")[, "Yes"]

# combining the train/test with pred prob and renaming the pred_prob column
full_train_tree <- mutate(train,train_tree_pred_prob)
full_test_tree <- mutate(test,test_tree_pred_prob)

full_train_tree$Train_Test <- "Train"
full_test_tree$Train_Test <- "Test"

full_train_tree <- full_train_tree %>% rename(pred_prob = train_tree_pred_prob)
full_test_tree <- full_test_tree %>% rename(pred_prob = test_tree_pred_prob)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_tree_data <- rbind(full_train_tree,full_test_tree)
combined_data <- combined_data[order(as.numeric(rownames(combined_data))), ]
write.csv(combined_tree_data, file="decisiontree_Final.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
traintree_outcome <- ifelse(train$Attrition == "Yes", 1, 0)
testtree_outcome  <- ifelse(test$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train <- roc(traintree_outcome, train_tree_pred_prob)
plot(roc_train, main = "ROC Curve - Training Data", col = "blue")
auc(roc_train)  # Area Under Curve

# ROC for Testing Data
roc_test <- roc(testtree_outcome, test_tree_pred_prob)
plot(roc_test, main = "ROC Curve - Test Data", col = "green")
auc(roc_test)

# PR Curve fir Training Data
pr_train <- pr.curve(scores.class0 = train_tree_pred_prob[traintree_outcome == 1],
                     scores.class1 = train_tree_pred_prob[traintree_outcome == 0],
                     curve = TRUE)
plot(pr_train, main = "Precision-Recall Curve - Training Data")
pr_train$auc.integral

# PR Curve for Testing Data 
pr_test <- pr.curve(scores.class0 = test_tree_pred_prob[testtree_outcome == 1],
                    scores.class1 = test_tree_pred_prob[testtree_outcome == 0],
                    curve = TRUE)
plot(pr_test, main = "Precision-Recall Curve - Test Data")
pr_test$auc.integral

# Test A Logistic Regression  ------------
# Making the logistic model
model <- glm(Attrition ~ ., data = train_A, family = binomial)
summary(model)

# Backward step wise regression model
model_final_A <- step(model, direction = "backward")
summary(model_final_A)

# Predicting the probabilities using the final model 
train_pred_A <- model_final_A$fitted.values
test_pred_A  <- predict(model_final_A, newdata = test_A, type = "response")

# combining the train/test with pred prob and renaming the pred_prob column
full_train_A <- mutate(train_A,train_pred_A)
full_test_A <- mutate(test_A,test_pred_A)

full_train_A$Train_Test <- "Train"
full_test_A$Train_Test <- "Test"

full_train_A <- full_train_A %>% rename(pred_prob_A = train_pred_A)
full_test_A <- full_test_A %>% rename(pred_prob_A = test_pred_A)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_data_A <- rbind(full_train_A,full_test_A)
combined_data_A <- combined_data_A[order(as.numeric(rownames(combined_data_A))), ]
write.csv(combined_data_A, file="logistic_Test_A.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
train_outcome_A <- ifelse(train_A$Attrition == "Yes", 1, 0)
test_outcome_A  <- ifelse(test_A$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_A <- roc(train_outcome_A, train_pred_A)
plot(roc_train_A, main = "ROC Curve - Training Data A", col = "blue")
auc(roc_train_A)  # Area Under Curve

# ROC for Testing Data
roc_test_A <- roc(test_outcome_A, test_pred_A)
plot(roc_test_A, main = "ROC Curve - Test Data A", col = "green")
auc(roc_test_A)

# PR Curve fir Training Data
pr_train_A <- pr.curve(scores.class0 = train_pred_A[train_outcome_A == 1],
                     scores.class1 = train_pred_A[train_outcome_A == 0],
                     curve = TRUE)
plot(pr_train_A, main = "Precision-Recall Curve - Training Data A")
pr_train_A$auc.integral

# PR Curve for Testing Data 
pr_test_A <- pr.curve(scores.class0 = test_pred_A[test_outcome_A == 1],
                    scores.class1 = test_pred_A[test_outcome_A == 0],
                    curve = TRUE)
plot(pr_test_A, main = "Precision-Recall Curve - Test Data A")
pr_test_A$auc.integral


# TEST A Decision Tree ----------------------------------------------------
tree_model_A <- rpart(Attrition ~ .,data = train_A,
                    method = "class",control = rpart.control(
                      minbucket = 40, cp = 0.00159))
tree_model_A

tree_model_A$variable.importance

# Plotting the Decision tree 
par(mar = c(1, 1, 2, 1))
rpart.plot(tree_model_A, type = 2, extra = 104, under = TRUE, faclen = 0,
           cex = 0.7, main = "Decision Tree A - Attrition")

# Predicting probabilities for "YES" 
train_tree_pred_prob_A <- predict(tree_model_A, newdata = train_A, type = "prob")[, "Yes"]
test_tree_pred_prob_A  <- predict(tree_model_A, newdata = test_A, type = "prob")[, "Yes"]

# combining the train/test with pred prob and renaming the pred_prob column
full_train_tree_A <- mutate(train_A,train_tree_pred_prob_A)
full_test_tree_A <- mutate(test_A,test_tree_pred_prob_A)

full_train_tree_A$Train_Test <- "Train"
full_test_tree_A$Train_Test <- "Test"

full_train_tree_A <- full_train_tree_A %>% rename(pred_prob_A = train_tree_pred_prob_A)
full_test_tree_A <- full_test_tree_A %>% rename(pred_prob_A = test_tree_pred_prob_A)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_tree_data_A <- rbind(full_train_tree_A,full_test_tree_A)
combined_tree_data_A <- combined_tree_data_A[order(as.numeric(rownames(combined_tree_data_A))), ]
write.csv(combined_tree_data_A, file="decisiontree_Final_A.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
traintree_outcome_A <- ifelse(train_A$Attrition == "Yes", 1, 0)
testtree_outcome_A  <- ifelse(test_A$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_A <- roc(traintree_outcome_A, train_tree_pred_prob_A)
plot(roc_train_A, main = "ROC Curve - Training Data A", col = "blue")
auc(roc_train_A)  # Area Under Curve

# ROC for Testing Data
roc_test_A <- roc(testtree_outcome_A, test_tree_pred_prob_A)
plot(roc_test_A, main = "ROC Curve - Test Data A", col = "green")
auc(roc_test_A)

# PR Curve fir Training Data
pr_train_A <- pr.curve(scores.class0 = train_tree_pred_prob_A[traintree_outcome_A == 1],
                     scores.class1 = train_tree_pred_prob_A[traintree_outcome_A == 0],
                     curve = TRUE)
plot(pr_train_A, main = "Precision-Recall Curve - Training Data A")
pr_train_A$auc.integral

# PR Curve for Testing Data 
pr_test_A <- pr.curve(scores.class0 = test_tree_pred_prob_A[testtree_outcome_A == 1],
                    scores.class1 = test_tree_pred_prob_A[testtree_outcome_A == 0],
                    curve = TRUE)
plot(pr_test_A, main = "Precision-Recall Curve - Test Data A")
pr_test_A$auc.integral


# TEST B Logistic Regression  ---------------------------------------------
model <- glm(Attrition ~ ., data = train_B, family = binomial)
summary(model)

# Backward step wise regression model
model_final_B <- step(model, direction = "backward")
summary(model_final_B)

# Predicting the probabilities using the final model 
train_pred_B <- model_final_B$fitted.values
test_pred_B  <- predict(model_final_B, newdata = test_B, type = "response")

# combining the train/test with pred prob and renaming the pred_prob column
full_train_B <- mutate(train_B, train_pred_B)
full_test_B  <- mutate(test_B,  test_pred_B)

full_train_B$Train_Test <- "Train"
full_test_B$Train_Test  <- "Test"

full_train_B <- full_train_B %>% rename(pred_prob_B = train_pred_B)
full_test_B  <- full_test_B  %>% rename(pred_prob_B = test_pred_B)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_data_B <- rbind(full_train_B, full_test_B)
combined_data_B <- combined_data_B[order(as.numeric(rownames(combined_data_B))), ]
write.csv(combined_data_B, file = "logistic_Test_B.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
train_outcome_B <- ifelse(train_B$Attrition == "Yes", 1, 0)
test_outcome_B  <- ifelse(test_B$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_B <- roc(train_outcome_B, train_pred_B)
plot(roc_train_B, main = "ROC Curve - Training Data B", col = "blue")
auc(roc_train_B)

# ROC for Testing Data
roc_test_B <- roc(test_outcome_B, test_pred_B)
plot(roc_test_B, main = "ROC Curve - Test Data B", col = "green")
auc(roc_test_B)

# PR Curve for Training Data
pr_train_B <- pr.curve(
  scores.class0 = train_pred_B[train_outcome_B == 1],
  scores.class1 = train_pred_B[train_outcome_B == 0],
  curve = TRUE
)
plot(pr_train_B, main = "Precision-Recall Curve - Training Data B")
pr_train_B$auc.integral

# PR Curve for Testing Data 
pr_test_B <- pr.curve(
  scores.class0 = test_pred_B[test_outcome_B == 1],
  scores.class1 = test_pred_B[test_outcome_B == 0],
  curve = TRUE
)
plot(pr_test_B, main = "Precision-Recall Curve - Test Data B")
pr_test_B$auc.integral



# TEST B Decision Tree ----------------------------------------------------
tree_model_B <- rpart(Attrition ~ .,data = train_B,
                      method = "class",control = rpart.control(
                        minbucket = 40, cp = 0.00159))
tree_model_B

tree_model_B$variable.importance

# Plotting the Decision tree 
par(mar = c(1, 1, 2, 1))
rpart.plot(tree_model_B, type = 2, extra = 104, under = TRUE, faclen = 0,
           cex = 0.7, main = "Decision Tree B - Attrition")

# Predicting probabilities for "YES" 
train_tree_pred_prob_B <- predict(tree_model_B, newdata = train_B, type = "prob")[, "Yes"]
test_tree_pred_prob_B  <- predict(tree_model_B, newdata = test_B, type = "prob")[, "Yes"]

# combining the train/test with pred prob and renaming the pred_prob column
full_train_tree_B <- mutate(train_B,train_tree_pred_prob_B)
full_test_tree_B <- mutate(test_B,test_tree_pred_prob_B)

full_train_tree_B$Train_Test <- "Train"
full_test_tree_B$Train_Test <- "Test"

full_train_tree_B <- full_train_tree_B %>% rename(pred_prob_B = train_tree_pred_prob_B)
full_test_tree_B <- full_test_tree_B %>% rename(pred_prob_B = test_tree_pred_prob_B)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_tree_data_B <- rbind(full_train_tree_B,full_test_tree_B)
combined_tree_data_B <- combined_tree_data_B[order(as.numeric(rownames(combined_tree_data_B))), ]
write.csv(combined_tree_data_B, file="decisiontree_Final_B.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
traintree_outcome_B <- ifelse(train_B$Attrition == "Yes", 1, 0)
testtree_outcome_B  <- ifelse(test_B$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_B <- roc(traintree_outcome_B, train_tree_pred_prob_B)
plot(roc_train_B, main = "ROC Curve - Training Data B", col = "blue")
auc(roc_train_B)  # Area Under Curve

# ROC for Testing Data
roc_test_B <- roc(testtree_outcome_B, test_tree_pred_prob_B)
plot(roc_test_B, main = "ROC Curve - Test Data B", col = "green")
auc(roc_test_B)

# PR Curve fir Training Data
pr_train_B <- pr.curve(scores.class0 = train_tree_pred_prob_B[traintree_outcome_B == 1],
                       scores.class1 = train_tree_pred_prob_B[traintree_outcome_B == 0],
                       curve = TRUE)
plot(pr_train_B, main = "Precision-Recall Curve - Training Data B")
pr_train_B$auc.integral

# PR Curve for Testing Data 
pr_test_B <- pr.curve(scores.class0 = test_tree_pred_prob_B[testtree_outcome_B == 1],
                      scores.class1 = test_tree_pred_prob_B[testtree_outcome_B == 0],
                      curve = TRUE)
plot(pr_test_B, main = "Precision-Recall Curve - Test Data B")
pr_test_B$auc.integral


# TEST C Logistic Regression  ---------------------------------------------
model <- glm(Attrition ~ ., data = train_C, family = binomial)
summary(model)

# Backward step wise regression model
model_final_C <- step(model, direction = "backward")
summary(model_final_C)

# Predicting the probabilities using the final model 
train_pred_C <- model_final_C$fitted.values
test_pred_C  <- predict(model_final_C, newdata = test_C, type = "response")

# combining the train/test with pred prob and renaming the pred_prob column
full_train_C <- mutate(train_C, train_pred_C)
full_test_C  <- mutate(test_C,  test_pred_C)

full_train_C$Train_Test <- "Train"
full_test_C$Train_Test  <- "Test"

full_train_C <- full_train_C %>% rename(pred_prob_C = train_pred_C)
full_test_C  <- full_test_C  %>% rename(pred_prob_C = test_pred_C)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_data_C <- rbind(full_train_C, full_test_C)
combined_data_C <- combined_data_C[order(as.numeric(rownames(combined_data_C))), ]

write.csv(combined_data_C, file = "logistic_Test_C.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
train_outcome_C <- ifelse(train_C$Attrition == "Yes", 1, 0)
test_outcome_C  <- ifelse(test_C$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_C <- roc(train_outcome_C, train_pred_C)
plot(roc_train_C, main = "ROC Curve - Training Data C", col = "blue")
auc(roc_train_C)

# ROC for Testing Data
roc_test_C <- roc(test_outcome_C, test_pred_C)
plot(roc_test_C, main = "ROC Curve - Test Data C", col = "green")
auc(roc_test_C)

# PR Curve for Training Data
pr_train_C <- pr.curve(
  scores.class0 = train_pred_C[train_outcome_C == 1],
  scores.class1 = train_pred_C[train_outcome_C == 0],
  curve = TRUE
)
plot(pr_train_C, main = "Precision-Recall Curve - Training Data C")
pr_train_C$auc.integral

# PR Curve for Testing Data 
pr_test_C <- pr.curve(
  scores.class0 = test_pred_C[test_outcome_C == 1],
  scores.class1 = test_pred_C[test_outcome_C == 0],
  curve = TRUE
)
plot(pr_test_C, main = "Precision-Recall Curve - Test Data C")
pr_test_C$auc.integral



# TEST C Decision Tree ----------------------------------------------------
tree_model_C <- rpart(Attrition ~ .,data = train_C,
                      method = "class",control = rpart.control(
                        minbucket = 40, cp = 0.00159))
tree_model_C

tree_model_C$variable.importance

# Plotting the Decision tree 
par(mar = c(1, 1, 2, 1))
rpart.plot(tree_model_C, type = 2, extra = 104, under = TRUE, faclen = 0,
           cex = 0.7, main = "Decision Tree C - Attrition")

# Predicting probabilities for "YES" 
train_tree_pred_prob_C <- predict(tree_model_C, newdata = train_C, type = "prob")[, "Yes"]
test_tree_pred_prob_C  <- predict(tree_model_C, newdata = test_C, type = "prob")[, "Yes"]

# combining the train/test with pred prob and renaming the pred_prob column
full_train_tree_C <- mutate(train_C,train_tree_pred_prob_C)
full_test_tree_C <- mutate(test_C,test_tree_pred_prob_C)

full_train_tree_C$Train_Test <- "Train"
full_test_tree_C$Train_Test <- "Test"

full_train_tree_C <- full_train_tree_C %>% rename(pred_prob_C = train_tree_pred_prob_C)
full_test_tree_C <- full_test_tree_C %>% rename(pred_prob_C = test_tree_pred_prob_C)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_tree_data_C <- rbind(full_train_tree_C,full_test_tree_C)
combined_tree_data_C <- combined_tree_data_C[order(as.numeric(rownames(combined_tree_data_C))), ]
write.csv(combined_tree_data_C, file="decisiontree_Final_C.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
traintree_outcome_C <- ifelse(train_C$Attrition == "Yes", 1, 0)
testtree_outcome_C  <- ifelse(test_C$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_C <- roc(traintree_outcome_C, train_tree_pred_prob_C)
plot(roc_train_C, main = "ROC Curve - Training Data C", col = "blue")
auc(roc_train_C)  # Area Under Curve

# ROC for Testing Data
roc_test_C <- roc(testtree_outcome_C, test_tree_pred_prob_C)
plot(roc_test_C, main = "ROC Curve - Test Data C", col = "green")
auc(roc_test_C)

# PR Curve fir Training Data
pr_train_C <- pr.curve(scores.class0 = train_tree_pred_prob_C[traintree_outcome_C == 1],
                       scores.class1 = train_tree_pred_prob_C[traintree_outcome_C == 0],
                       curve = TRUE)
plot(pr_train_C, main = "Precision-Recall Curve - Training Data C")
pr_train_C$auc.integral

# PR Curve for Testing Data 
pr_test_C <- pr.curve(scores.class0 = test_tree_pred_prob_C[testtree_outcome_C == 1],
                      scores.class1 = test_tree_pred_prob_C[testtree_outcome_C == 0],
                      curve = TRUE)
plot(pr_test_C, main = "Precision-Recall Curve - Test Data C")
pr_test_C$auc.integral


# TEST D Logistic Regression  ---------------------------------------------
model <- glm(Attrition ~ ., data = train_D, family = binomial)
summary(model)

# Backward step wise regression model
model_final_D <- step(model, direction = "backward")
summary(model_final_D)

# Predicting the probabilities using the final model 
train_pred_D <- model_final_D$fitted.values
test_pred_D  <- predict(model_final_D, newdata = test_D, type = "response")

# combining the train/test with pred prob and renaming the pred_prob column
full_train_D <- mutate(train_D, train_pred_D)
full_test_D  <- mutate(test_D,  test_pred_D)

full_train_D$Train_Test <- "Train"
full_test_D$Train_Test  <- "Test"

full_train_D <- full_train_D %>% rename(pred_prob_D = train_pred_D)
full_test_D  <- full_test_D  %>% rename(pred_prob_D = test_pred_D)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_data_D <- rbind(full_train_D, full_test_D)
combined_data_D <- combined_data_D[order(as.numeric(rownames(combined_data_D))), ]

write.csv(combined_data_D, file = "logistic_Test_D.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
train_outcome_D <- ifelse(train_D$Attrition == "Yes", 1, 0)
test_outcome_D  <- ifelse(test_D$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_D <- roc(train_outcome_D, train_pred_D)
plot(roc_train_D, main = "ROC Curve - Training Data D", col = "blue")
auc(roc_train_D)

# ROC for Testing Data
roc_test_D <- roc(test_outcome_D, test_pred_D)
plot(roc_test_D, main = "ROC Curve - Test Data D", col = "green")
auc(roc_test_D)

# PR Curve for Training Data
pr_train_D <- pr.curve(
  scores.class0 = train_pred_D[train_outcome_D == 1],
  scores.class1 = train_pred_D[train_outcome_D == 0],
  curve = TRUE
)
plot(pr_train_D, main = "Precision-Recall Curve - Training Data D")
pr_train_D$auc.integral

# PR Curve for Testing Data 
pr_test_D <- pr.curve(
  scores.class0 = test_pred_D[test_outcome_D == 1],
  scores.class1 = test_pred_D[test_outcome_D == 0],
  curve = TRUE
)
plot(pr_test_D, main = "Precision-Recall Curve - Test Data D")
pr_test_D$auc.integral



# TEST D Decision Trees ---------------------------------------------------
tree_model_D <- rpart(Attrition ~ .,data = train_D,
                      method = "class",control = rpart.control(
                        minbucket = 40, cp = 0.00159))
tree_model_D

tree_model_D$variable.importance

# Plotting the Decision tree 
par(mar = c(1, 1, 2, 1))
rpart.plot(tree_model_D, type = 2, extra = 104, under = TRUE, faclen = 0,
           cex = 0.7, main = "Decision Tree D - Attrition")

# Predicting probabilities for "YES" 
train_tree_pred_prob_D <- predict(tree_model_D, newdata = train_D, type = "prob")[, "Yes"]
test_tree_pred_prob_D  <- predict(tree_model_D, newdata = test_D, type = "prob")[, "Yes"]

# combining the train/test with pred prob and renaming the pred_prob column
full_train_tree_D <- mutate(train_D,train_tree_pred_prob_D)
full_test_tree_D <- mutate(test_D,test_tree_pred_prob_D)

full_train_tree_D$Train_Test <- "Train"
full_test_tree_D$Train_Test <- "Test"

full_train_tree_D <- full_train_tree_D %>% rename(pred_prob_D = train_tree_pred_prob_D)
full_test_tree_D <- full_test_tree_D %>% rename(pred_prob_D = test_tree_pred_prob_D)

# Combining the Train and Test data set into one data frame and saving it as csv
combined_tree_data_D <- rbind(full_train_tree_D,full_test_tree_D)
combined_tree_data_D <- combined_tree_data_D[order(as.numeric(rownames(combined_tree_data_D))), ]
write.csv(combined_tree_data_D, file="decisiontree_Final_D.csv")

# Convert factor levels to binary for plotting the ROC and PR curve
traintree_outcome_D <- ifelse(train_D$Attrition == "Yes", 1, 0)
testtree_outcome_D  <- ifelse(test_D$Attrition == "Yes", 1, 0)

# ROC for Training Data
roc_train_D <- roc(traintree_outcome_D, train_tree_pred_prob_D)
plot(roc_train_D, main = "ROC Curve - Training Data D", col = "blue")
auc(roc_train_D)  # Area Under Curve

# ROC for Testing Data
roc_test_D <- roc(testtree_outcome_D, test_tree_pred_prob_D)
plot(roc_test_D, main = "ROC Curve - Test Data D", col = "green")
auc(roc_test_D)

# PR Curve fir Training Data
pr_train_D <- pr.curve(scores.class0 = train_tree_pred_prob_D[traintree_outcome_D == 1],
                       scores.class1 = train_tree_pred_prob_D[traintree_outcome_D == 0],
                       curve = TRUE)
plot(pr_train_D, main = "Precision-Recall Curve - Training Data D")
pr_train_D$auc.integral

# PR Curve for Testing Data 
pr_test_D <- pr.curve(scores.class0 = test_tree_pred_prob_D[testtree_outcome_D == 1],
                      scores.class1 = test_tree_pred_prob_D[testtree_outcome_D == 0],
                      curve = TRUE)
plot(pr_test_D, main = "Precision-Recall Curve - Test Data D")
pr_test_D$auc.integral






