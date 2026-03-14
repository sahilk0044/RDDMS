from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import shutil
import os
import uuid

app = FastAPI()

# load trained model
model = YOLO("model/best.pt")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.post("/detect")
async def detect(image: UploadFile = File(...)):

    # create unique filename
    filename = f"{uuid.uuid4()}_{image.filename}"
    file_path = f"{UPLOAD_FOLDER}/{filename}"

    # save uploaded image
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # run YOLO detection
    results = model(file_path)

    detections = []

    for r in results:
        for box in r.boxes:
          detections.append({
    "damageType": "Pothole",
    "confidence": float(box.conf)
})

    # delete image after processing
    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "detections": detections
    }