import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";

export default function Page() {
  const router = useRouter();
  const { userToken, loading, logout } = useContext(AuthContext);

  // 🔐 Redirect properly
  useEffect(() => {
    if (!loading) {
      if (!userToken) {
        router.replace("/login");
      }
    }
  }, [userToken, loading]);

  // ⏳ BLOCK UI until auth checked
  if (loading || !userToken) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>RDDMS</Text>
      <Text style={styles.subtitle}>
        Road Damage Detection & Monitoring System
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/report")}
      >
        <Text style={styles.cardTitle}>📸 Report Damage</Text>
        <Text style={styles.cardDesc}>
          Capture and report road issues instantly
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/my-reports")}
      >
        <Text style={styles.cardTitle}>📄 My Reports</Text>
        <Text style={styles.cardDesc}>
          Track status and AI detection results
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E3A8A",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  cardDesc: {
    marginTop: 5,
    color: "#555",
  },

  // 🔥 NEW
  logoutBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#DC2626",
    padding: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});