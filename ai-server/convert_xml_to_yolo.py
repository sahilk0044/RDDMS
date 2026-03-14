import os
import xml.etree.ElementTree as ET

images_path = "datasets/images"
annotations_path = "datasets/annotations"
labels_path = "datasets/labels"

os.makedirs(labels_path, exist_ok=True)

classes = ["pothole"]

def convert(size, box):
    dw = 1. / size[0]
    dh = 1. / size[1]

    x = (box[0] + box[1]) / 2.0
    y = (box[2] + box[3]) / 2.0
    w = box[1] - box[0]
    h = box[3] - box[2]

    x = x * dw
    w = w * dw
    y = y * dh
    h = h * dh

    return (x, y, w, h)


for xml_file in os.listdir(annotations_path):

    tree = ET.parse(os.path.join(annotations_path, xml_file))
    root = tree.getroot()

    size = root.find("size")
    w = int(size.find("width").text)
    h = int(size.find("height").text)

    label_file = open(
        os.path.join(labels_path, xml_file.replace(".xml", ".txt")),
        "w"
    )

    for obj in root.iter("object"):
        cls = obj.find("name").text

        if cls not in classes:
            continue

        cls_id = classes.index(cls)

        xmlbox = obj.find("bndbox")

        b = (
            float(xmlbox.find("xmin").text),
            float(xmlbox.find("xmax").text),
            float(xmlbox.find("ymin").text),
            float(xmlbox.find("ymax").text)
        )

        bb = convert((w, h), b)

        label_file.write(
            str(cls_id) + " " +
            " ".join([str(a) for a in bb]) + "\n"
        )

    label_file.close()

print("Conversion completed!")