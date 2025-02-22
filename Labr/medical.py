import pytesseract
from pdf2image import convert_from_bytes, convert_from_path
import re
import numpy as np
import pickle
from PIL import Image
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import io
import docx

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained model
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)
with open('label_encoder.pkl', 'rb') as le_file:
    label_encoder = pickle.load(le_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

#  test names and regex pattern
TESTS = ["Blood Glucose", "HbA1C", "Systolic BP", "Diastolic BP", "LDL", "HDL", "Triglycerides", "Haemoglobin", "MCV"]
PATTERN = r"(?i)({})[^\d]+([\d]+(?:\.\d+)?)".format("|".join(TESTS))

#  image
def extract_text_from_image(image: Image.Image):
    return pytesseract.image_to_string(image)

#  PDF
#  PDF
def extract_text_from_pdf(pdf_bytes: bytes):
    image_list = convert_from_bytes(pdf_bytes)  # Use convert_from_bytes instead of convert_from_path
    extracted_text = pytesseract.image_to_string(image_list[0], lang="eng")
    return extracted_text
#  DOCX
def extract_text_from_docx(docx_bytes: bytes):
    doc = docx.Document(io.BytesIO(docx_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

# Function to extract medical values
def extract_medical_values(text):
    extracted_values = {}
    matches = re.findall(PATTERN, text)
    for test, value in matches:
        extracted_values[test] = float(value)  
    return extracted_values


def predict_disease(values):
    try:
        EXPECTED_FEATURES = ["Blood Glucose", "HbA1C", "Systolic BP", "Diastolic BP", "LDL", "HDL", "Triglycerides", "Haemoglobin", "MCV"]
        
        # Ensure all features exist in input, default to 0 if missing
        feature_values = [values.get(feature, 0.0) for feature in EXPECTED_FEATURES]

        # Convert to NumPy array and reshape for prediction
        features = np.array([feature_values]).astype(float)

        # Ensure the input matches model's expected shape
        if features.shape[1] != model.n_features_in_:
            return {"error": f"Expected {model.n_features_in_} features, got {features.shape[1]}"}

        #  scaling
        features_scaled = scaler.transform(features)

        prediction_encoded = model.predict(features_scaled)[0]

        # Decoding category name
        predicted_disease = label_encoder.inverse_transform([prediction_encoded])[0]

        return {"disease_prediction": predicted_disease}
    except Exception as e:
        return {"error": str(e)}

@app.post("/extract")
async def extract_medical_data(file: UploadFile = File(...)):
    contents = await file.read()
    
    # Extract tex
    if file.filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(contents)
    elif file.filename.endswith(".docx"):
        extracted_text = extract_text_from_docx(contents)
    else:
        image = Image.open(io.BytesIO(contents))
        extracted_text = extract_text_from_image(image)
    
    # Extract medical tes values
    medical_values = extract_medical_values(extracted_text)

    # Predict disease using extracted values
    prediction = predict_disease(medical_values)

    return {
        "extracted_values": medical_values,
        "model_prediction": prediction
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)



# uvicorn medical:app --reload --host 0.0.0.0 --port 8002 
# Lab report upload