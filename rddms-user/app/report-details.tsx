import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";

export default function ReportDetails() {
  const { report } = useLocalSearchParams();
  const data = JSON.parse(report as string);

  const imageUrl = `http://10.151.64.147:8000/${data.image?.replace(/\\/g, "/")}`;

  // 🔥 Timeline logic
  const steps = ["Reported", "In Progress", "Resolved"];

  const getCurrentStep = () => {
    if (data.status === "Resolved") return 2;
    if (data.status === "In Progress") return 1;
    return 0;
  };

  const currentStep = getCurrentStep();

  return (
    <ScrollView style={styles.container}>
      {/* 📸 Image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        {/* Title */}
        <Text style={styles.title}>
          {data.damageType || "Unknown Damage"}
        </Text>

        {/* 🔥 TIMELINE */}
        <View style={styles.timeline}>
          {steps.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              {index !== 0 && (
                <View
                  style={[
                    styles.line,
                    index <= currentStep && styles.activeLine,
                  ]}
                />
              )}

              <View
                style={[
                  styles.circle,
                  index <= currentStep && styles.activeCircle,
                ]}
              />

              {index !== steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    index < currentStep && styles.activeLine,
                  ]}
                />
              )}

              <Text
                style={[
                  styles.stepText,
                  index <= currentStep && styles.activeText,
                ]}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* 📄 Details */}
        <Text style={styles.text}>
          ⚠️ Severity: {data.severity}
        </Text>

        <Text style={[styles.text, styles.status]}>
          🛠 Status: {data.status}
        </Text>

        <Text style={styles.text}>
          📍 {data.location || "Location not available"}
        </Text>

        <Text style={styles.text}>
          🕒{" "}
          {data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "N/A"}
        </Text>

        <Text style={styles.id}>
          Report ID: {data._id}
        </Text>

        {/* 📍 MAP VIEW */}
        {data.latitude && data.longitude && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: data.latitude,
              longitude: data.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              title="Reported Damage"
            />
          </MapView>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  image: {
    width: "100%",
    height: 260,
    backgroundColor: "#e5e7eb",
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
    textAlign: "center",
  },

  // 🔥 TIMELINE
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    alignItems: "center",
  },
  timelineItem: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
    zIndex: 2,
  },
  activeCircle: {
    backgroundColor: "#2563EB",
  },
  line: {
    position: "absolute",
    top: 7,
    width: "100%",
    height: 2,
    backgroundColor: "#ccc",
    zIndex: 1,
  },
  activeLine: {
    backgroundColor: "#2563EB",
  },
  stepText: {
    marginTop: 8,
    fontSize: 11,
    color: "#888",
    textAlign: "center",
  },
  activeText: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  status: {
    fontWeight: "bold",
    color: "#2563EB",
  },
  id: {
    marginTop: 10,
    fontSize: 12,
    color: "#777",
  },

  // 📍 MAP
  map: {
    width: "100%",
    height: 200,
    marginTop: 15,
    borderRadius: 12,
  },
});