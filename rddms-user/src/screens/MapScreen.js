import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import API from "../api/api";

export default function MapScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.log("Map fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const getMarkerColor = (status) => {
    if (status === "Resolved") return "green";
    if (status === "In Progress") return "orange";
    return "red";
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 12.9716,
        longitude: 77.5946,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {reports.map((item) => {
        if (!item.latitude || !item.longitude) return null;

        return (
          <Marker
            key={item._id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            pinColor={getMarkerColor(item.status)}
          >
            <Callout
              onPress={() =>
                navigation.navigate("ReportDetail", {
                  reportId: item._id,
                })
              }
            >
              <View style={styles.callout}>
                <Text style={styles.title}>
                  {item.damageType || "Road Damage"}
                </Text>

                <Text>Status: {item.status}</Text>
                <Text>{item.location}</Text>

                <Text style={styles.link}>
                  Tap for details →
                </Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callout: {
    width: 200,
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
  },
  link: {
    color: "#2563EB",
    marginTop: 5,
  },
});