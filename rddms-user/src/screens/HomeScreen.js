import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>RDDMS Dashboard</Text>
        <Text style={styles.subText}>
          Monitor and report road damages
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Main Feature Card */}
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>Report Road Damage</Text>
          <Text style={styles.mainText}>
            Capture and report potholes or road issues instantly
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Report")}  >
            <Text style={styles.primaryButtonText}>📸 Report Now</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Features</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Map")}
          >
            <Text style={styles.cardTitle}>🗺️ View Map</Text>
            <Text style={styles.cardSub}>See reported issues</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("MyReports")}>
            <Text style={styles.cardTitle}>📊 My Reports</Text>
            <Text style={styles.cardSub}>Track your submissions</Text>
          </TouchableOpacity>

        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Reports</Text>

        <View style={styles.activityCard}>
          <Text style={styles.activityText}>
            No reports submitted yet
          </Text>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subText: {
    color: "#DBEAFE",
    marginTop: 5,
  },

  content: {
    padding: 20,
  },

  mainCard: {
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  mainTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  mainText: {
    color: "#DBEAFE",
    marginVertical: 10,
  },

  primaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#2563EB",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  cardSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },

  activityText: {
    color: "#6B7280",
  },

  logoutButton: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});