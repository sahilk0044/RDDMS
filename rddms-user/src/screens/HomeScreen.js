import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function HomeScreen({ navigation }) {
  const { logout, userToken } = useContext(AuthContext);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

 useFocusEffect(
  useCallback(() => {
    fetchReports();
  }, [])
);

  const fetchReports = async (isInitial = false) => {
  try {
    if (isInitial) setLoading(true); // ✅ only first time

    const res = await axios.get(
      "http://10.100.149.147:8000/api/reports",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const data = Array.isArray(res.data) ? res.data : [];

    const latestReports = data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // ✅ update only if data actually changed
    setReports((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(latestReports)) {
        return latestReports;
      }
      return prev;
    });

    console.log("HOME REPORTS:", latestReports);

  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    if (isInitial) setLoading(false); // ✅ prevent flicker
  }
};

useEffect(() => {
  fetchReports(true); // initial load

  const interval = setInterval(() => {
    fetchReports(false); // background refresh
  }, 8000); // every 8 sec

  return () => clearInterval(interval);
}, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>RDDMS Dashboard</Text>
        <Text style={styles.subtitle}>Monitor road damages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Report Card */}
        <View style={styles.cardMain}>
          <Text style={styles.cardTitle}>Report Road Damage</Text>
          <Text style={styles.cardText}>
            Capture potholes or road issues instantly
          </Text>

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate("Report")}
          >
            <Text style={styles.buttonText}>📸 Report Now</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <Text style={styles.section}>Features</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Map")}
          >
            <Text style={styles.cardTitleSmall}>🗺️ View Map</Text>
            <Text style={styles.cardSub}>See issues</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MyReports")}
          >
            <Text style={styles.cardTitleSmall}>📊 My Reports</Text>
            <Text style={styles.cardSub}>Track reports</Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 Recent Reports */}
        <Text style={styles.section}>Recent Reports</Text>

        <View style={styles.cardBox}>
          {loading ? (
            <ActivityIndicator color="#2563EB" />
          ) : reports.length === 0 ? (
            <Text style={styles.empty}>No reports yet</Text>
          ) : (
            reports.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.reportItem}
                onPress={() =>
                  navigation.navigate("ReportDetail", {
                    reportId: item._id,
                  })
                }
              >
                {/* 🖼 IMAGE */}
                <Image
                  source={{
                    uri: item.image
                      ? `http://10.100.149.147:8000/${item.image}`
                      : "https://via.placeholder.com/150",
                  }}
                  style={styles.reportImage}
                />

                {/* 📄 DETAILS */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.reportTitle}>
                    📍 {
                      item.locationName ||
                      item.location ||
                      (item.latitude && item.longitude
                        ? `${item.latitude}, ${item.longitude}`
                        : "Location unavailable")
                    }
                  </Text>

                  <Text style={styles.reportMeta}>
                    {item.status} • {item.severity}
                  </Text>

                  <Text style={styles.reportDate}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "No date"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#1E40AF",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#c7d2fe",
    marginTop: 4,
    fontSize: 13,
  },

  content: {
    padding: 16,
  },

  cardMain: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardText: {
    color: "#dbeafe",
    marginVertical: 8,
  },

  buttonPrimary: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  section: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    width: "48%",
    elevation: 3,
  },

  cardTitleSmall: {
    fontWeight: "bold",
    fontSize: 14,
  },

  cardSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  cardBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
  },

  empty: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
  },

  /* 🔥 REPORT ITEM */
  reportItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  reportImage: {
    width: 75,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },

  reportTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },

  reportMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  reportDate: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },

  logout: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});