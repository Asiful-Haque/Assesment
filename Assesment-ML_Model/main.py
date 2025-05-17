from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected input JSON structure
class UserInput(BaseModel):
    Age: int
    Gender: str
    Division: str

# Load model and columns
model = joblib.load("income_model.pkl")
model_columns = joblib.load("model_columns.pkl")

@app.post("/predict")
def predict_income(user: UserInput):
    # Convert user input to dataframe
    input_df = pd.DataFrame([user.model_dump()])

    # One-hot encode categorical features
    input_encoded = pd.get_dummies(input_df, columns=["Gender", "Division"], drop_first=True)

    # Add missing columns (that model expects) and set them to 0
    for col in model_columns:
        if col not in input_encoded.columns:
            input_encoded[col] = 0

    # Reorder columns to match training data
    input_encoded = input_encoded[model_columns]

    # Predict
    prediction = model.predict(input_encoded)[0]

    return {"predicted_income": round(prediction, 2)}
