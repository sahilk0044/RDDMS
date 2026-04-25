import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import API from "../api/api";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native";

export default function MyReportsScreen({navigation}) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [addresses, setAddresses] = useState({});

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.log("Fetch error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  const getStatusColor = (status) => {
    if (status === "Resolved") return "#16A34A";
    if (status === "In Progress") return "#F59E0B";
    return "#EF4444";
  };


const getAddress = async (item) => {
  try {
    const result = await Location.reverseGeocodeAsync({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    if (result.length > 0) {
      const addr = result[0];

      const name = `${addr.city || addr.region || ""}, ${
        addr.country || ""
      }`;

      setAddresses((prev) => ({
        ...prev,
        [item._id]: name,
      }));
    }
  } catch (err) {
    console.log("Geocode error:", err);
  }
};

  const renderItem = ({ item }) => {
  if (
    item.latitude &&
    item.longitude &&
    !addresses[item._id]
  ) {
    Location.reverseGeocodeAsync({
      latitude: item.latitude,
      longitude: item.longitude,
    })
      .then((res) => {
        if (res.length > 0) {
          const addr = res[0];

          const name = `${
            addr.city || addr.region || "Unknown"
          }, ${addr.country || ""}`;

          setAddresses((prev) => ({
            ...prev,
            [item._id]: name,
          }));
        }
      })
      .catch((err) =>
        console.log("Geocode error:", err.message)
      );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ReportDetail", {
          reportId: item._id,
        })
      }
    >
      {/* Top */}
      <View style={styles.row}>
        <Text style={styles.type}>
          {item.damageType || "Road Damage"}
        </Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Location */}
      <Text style={styles.location}>
        📍{" "}
        {addresses[item._id] ||
          item.location ||
          "Loading location..."}
      </Text>

      {/* Date */}
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
};
  return (
    <FlatList
      data={reports}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <Text style={styles.empty}>No reports found</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F3F4F6",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  type: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  location: {
    color: "#374151",
    marginBottom: 4,
  },

  severity: {
    fontWeight: "500",
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
    color: "#6B7280",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#6B7280",
  },
});