from ultralytics import YOLO

# load pretrained YOLO model
model = YOLO("yolov8n.pt")

# train the model
model.train(
    data="dataset.yaml",
    epochs=10,
    imgsz=640
)