import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import API from "../api/api";

export default function ReportScreen() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📸 Camera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return Alert.alert("Permission required", "Camera access needed");
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 📍 Location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return Alert.alert("Permission required", "Location access needed");
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  // 🚀 Submit
  const submitReport = async () => {
    if (!image || !location) {
      return Alert.alert("Missing Data", "Image and location required");
    }

    const formData = new FormData();

    formData.append("image", {
      uri: image,
      name: "report.jpg",
      type: "image/jpeg",
    });

    formData.append("latitude", location.latitude.toString());
    formData.append("longitude", location.longitude.toString());

    formData.append(
      "location",
      `${location.latitude}, ${location.longitude}`
    );

    try {
      setLoading(true);

      await API.post("/reportDamage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ FORCE CLEAN SUCCESS MESSAGE
      Alert.alert("Success", "Report submitted successfully");

      setImage(null);
      setLocation(null);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);

      Alert.alert(
        "Error",
        err.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Road Damage</Text>

      {/* Image */}
      <TouchableOpacity style={styles.imageBox} onPress={openCamera}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>📸 Capture Image</Text>
        )}
      </TouchableOpacity>

      {/* Location */}
      <TouchableOpacity style={styles.locationBtn} onPress={getLocation}>
        <Text style={styles.locationText}>
          {location
            ? `📍 ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
            : "Get Location"}
        </Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={submitReport}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit Report</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  imageBox: {
    height: 200,
    backgroundColor: "#E5E7EB",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholder: {
    color: "#6B7280",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  locationBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationText: {
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});