import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import API from "../services/api";

type Report = {
  _id: string;
  image: string;
  damageType: string;
  severity: string;
  status: string;
  latitude: number;
  longitude: number;
  location?: string;
  createdAt?: string; // 🔥 needed
};

export default function MyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Status Text Color
  const getStatusColor = (status: string) => {
    if (status === "Resolved") return "#16A34A";
    if (status === "In Progress") return "#F59E0B";
    return "#DC2626";
  };

  // 🎨 Severity Color
  const getSeverityColor = (severity: string) => {
    if (severity === "High") return "#DC2626";
    if (severity === "Medium") return "#F59E0B";
    return "#16A34A";
  };

  // 🔥 Dynamic Border Glow Logic
  const getCardStyle = (item: Report) => {
    const created = new Date(item.createdAt || "");
    const now = new Date();

    const diffDays =
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    // 🔴 Older than 10 days
    if (diffDays > 10) {
      return styles.redShadow;
    }

    // 🟢 Resolved
    if (item.status === "Resolved") {
      return styles.greenShadow;
    }

    // 🟡 Pending / In Progress
    return styles.yellowShadow;
  };

  const renderItem = ({ item }: { item: Report }) => {
    return (
      
      <TouchableOpacity
        style={[styles.card, getCardStyle(item)]}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: "/report-details",
            params: { report: JSON.stringify(item) },
          })
        }
      >
        {/* 📸 Image */}
        <Image
          source={{
            uri: `http://10.151.64.147:8000/${item.image?.replace(/\\/g, "/")}`,
          }}
          style={styles.image}
        />

        {/* 📄 Info */}
        <View style={styles.info}>
          <Text style={styles.title}>
            {item.damageType || "Unknown Damage"}
          </Text>

          <Text style={{ color: getSeverityColor(item.severity) }}>
            Severity: {item.severity}
          </Text>

          <Text style={{ color: getStatusColor(item.status) }}>
            Status: {item.status}
          </Text>

          <Text style={styles.location}>
            📍 {item.location || "Location not available"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // ⏳ Loading
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  // 📭 Empty
  if (reports.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No reports found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Reports</Text>

      <FlatList
        data={reports}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 5,
  },

  // 🔥 SHADOW STYLES
  yellowShadow: {
    borderWidth: 2,
    borderColor: "#FACC15",
  },
  greenShadow: {
    borderWidth: 2,
    borderColor: "#22C55E",
  },
  redShadow: {
    borderWidth: 2,
    borderColor: "#DC2626",
  },

  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 5,
  },
  location: {
    marginTop: 6,
    color: "#333",
    fontWeight: "500",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});