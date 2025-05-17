import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
import joblib

#1. Loading the data from csv file
data = pd.read_csv("All_data.csv")

# 2. removing rows with income = 0. Its for clear learning
data = data[data["Income"] > 0]

# 3. Selecting features that will be needed
features = data[["Age", "Gender", "Division"]]
target = data["Income"]

# 4. One-hot encoding for the  categorical variables
features_encoded = pd.get_dummies(features, columns=["Gender", "Division"], drop_first=True)

# Save column names. Its needed for api creation
model_columns = list(features_encoded.columns)
joblib.dump(model_columns, "model_columns.pkl")

# 5. Split data
X_train, X_test, y_train, y_test = train_test_split(features_encoded, target, test_size=0.2, random_state=42)

# 6. Initialize and train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "income_model.pkl")
print("Model and columns saved!")


# # 7. Predict on test set
# y_pred = model.predict(X_test)

# # 8. Evaluate the model
# mae = mean_absolute_error(y_test, y_pred)
# rmse = np.sqrt(mean_squared_error(y_test, y_pred))
# r2 = r2_score(y_test, y_pred)

# print(f"Mean Absolute Error: {mae:.2f}")
# print(f"Root Mean Squared Error: {rmse:.2f}")
# print(f"R² Score: {r2:.2f}")

# print(f"Model Accuracy (R² Score as %): {r2 * 100:.2f}%")


# print(data.head())
# print(features_encoded.head())