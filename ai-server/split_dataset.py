import os
import random
import shutil

images_dir = "datasets/images"
labels_dir = "datasets/labels"

train_images = "datasets/images/train"
val_images = "datasets/images/val"

train_labels = "datasets/labels/train"
val_labels = "datasets/labels/val"

os.makedirs(train_images, exist_ok=True)
os.makedirs(val_images, exist_ok=True)
os.makedirs(train_labels, exist_ok=True)
os.makedirs(val_labels, exist_ok=True)

images = [f for f in os.listdir(images_dir) if f.endswith(".png") or f.endswith(".jpg")]

random.shuffle(images)

split_ratio = 0.8
split_index = int(len(images) * split_ratio)

train_files = images[:split_index]
val_files = images[split_index:]


def move_files(file_list, img_dest, label_dest):
    for img in file_list:
        label = os.path.splitext(img)[0] + ".txt"

        shutil.move(
            os.path.join(images_dir, img),
            os.path.join(img_dest, img)
        )

        shutil.move(
            os.path.join(labels_dir, label),
            os.path.join(label_dest, label)
        )


move_files(train_files, train_images, train_labels)
move_files(val_files, val_images, val_labels)

print("Dataset split completed!")