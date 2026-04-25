import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import API from "../api/api";
import * as Location from "expo-location";

export default function ReportDetailScreen({ route }) {
    const { reportId } = route.params;

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (report?.latitude && report?.longitude) {
            Location.reverseGeocodeAsync({
                latitude: report.latitude,
                longitude: report.longitude,
            })
                .then((res) => {
                    if (res.length > 0) {
                        const addr = res[0];

                        const name = `${addr.city || addr.region || "Unknown"
                            }, ${addr.country || ""}`;

                        setAddress(name);
                    }
                })
                .catch((err) =>
                    console.log("Geocode error:", err.message)
                );
        }
    }, [report]);

    const fetchReport = async () => {
        try {
            const res = await API.get(`/report/${reportId}`);
            setReport(res.data);
        } catch (err) {
            console.log("Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const getStatusColor = (status) => {
        if (status === "Resolved") return "#16A34A";
        if (status === "In Progress") return "#F59E0B";
        return "#EF4444";
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Image */}
            <Image
                source={{
                    uri: `http://10.100.149.147:8000/${report.image.replace(/\\/g, "/")}`, // 🔴 replace IP
                }}
                style={styles.image}
            />

            <View style={styles.card}>
                {/* Status */}
                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(report.status) },
                    ]}
                >
                    <Text style={styles.statusText}>{report.status}</Text>
                </View>

                {/* Damage Type */}
                <Text style={styles.title}>
                    {report.damageType || "Road Damage"}
                </Text>

                {/* Location */}
                <Text style={styles.info}>
                    📍 {address || report.location || "Loading location..."}
                </Text>

                {/* Date */}
                <Text style={styles.info}>
                    {new Date(report.createdAt).toLocaleString()}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    image: {
        width: "100%",
        height: 260,
    },
    card: {
        backgroundColor: "#FFFFFF",
        marginTop: -30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginBottom: 10,
    },
    statusText: {
        color: "#fff",
        fontWeight: "600",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        marginBottom: 6,
        color: "#374151",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});