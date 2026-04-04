import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import API from "../services/api";

export default function Report() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const submitReport = async () => {
    if (!image || !location) {
      alert("Please capture image and location");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("image", {
      uri: image,
      name: "damage.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);

    try {
      await API.post("/reportDamage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Report Submitted!");
      setImage(null);
      setLocation(null);
    } catch (err) {
      console.log(err);
      alert("❌ Submission Failed");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Road Damage</Text>

      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Tap to Capture Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>Get Location</Text>
      </TouchableOpacity>

      {location && (
        <Text style={styles.locationText}>
          📍 {location.latitude.toFixed(4)},{" "}
          {location.longitude.toFixed(4)}
        </Text>
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={submitReport}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit Report</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
  },
  imageBox: {
    height: 220,
    borderRadius: 14,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  placeholder: {
    color: "#555",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  locationText: {
    marginBottom: 20,
    color: "#333",
  },
  submitBtn: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 12,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});