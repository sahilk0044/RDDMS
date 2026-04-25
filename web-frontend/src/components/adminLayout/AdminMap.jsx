import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { motion } from "framer-motion";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// fallback center (Bangalore)
const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

const getMarkerIcon = (status) => {
  if (status === "in_progress") {
    return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
  }
  if (status === "repaired") {
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  }
  return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
};

const AdminMap = () => {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:8000/api/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reportsData = Array.isArray(data) ? data : data.reports;

      setReports(reportsData || []);

      // 🔥 auto-center on first report
      const firstValid = reportsData.find(
        (r) => r.latitude && r.longitude
      );

      if (firstValid) {
        setCenter({
          lat: Number(firstValid.latitude),
          lng: Number(firstValid.longitude),
        });
      }

    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 h-[90vh]">

      <motion.h1
        className="mb-4 text-2xl font-bold md:text-3xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🗺️ Road Damage Map
      </motion.h1>

      <div className="w-full h-full overflow-hidden shadow-lg rounded-2xl">

        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >

            {/* 📍 MARKERS */}
            {reports
              .filter((r) => r.latitude && r.longitude)
              .map((report) => (
                <Marker
                  key={report._id}
                  position={{
                    lat: Number(report.latitude),
                    lng: Number(report.longitude),
                  }}
                  icon={getMarkerIcon(report.status)}
                  onClick={() => setSelected(report)}
                />
              ))}

            {/* 📌 INFO WINDOW */}
            {selected && (
              <InfoWindow
                position={{
                  lat: Number(selected.latitude),
                  lng: Number(selected.longitude),
                }}
                onCloseClick={() => setSelected(null)}
              >
                <div style={{ width: "200px" }}>

                  {/* 🖼 IMAGE */}
                  <img
                    src={
                      selected.image
                        ? `http://localhost:8000/${selected.image}`
                        : "https://via.placeholder.com/200x100"
                    }
                    alt="damage"
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />

                  {/* 📄 DETAILS */}
                  <h6 style={{ marginTop: "5px" }}>
                    {selected.damageType || "Road Damage"}
                  </h6>

                  <p style={{ fontSize: "12px", margin: 0 }}>
                    📍 {selected.locationName || selected.location || "Unknown"}
                  </p>

                  <p style={{ fontSize: "12px", margin: 0 }}>
                    Severity: {selected.severity || "N/A"}
                  </p>

                  <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                    Status: {selected.status}
                  </p>

                </div>
              </InfoWindow>
            )}

          </GoogleMap>
        </LoadScript>

      </div>
    </div>
  );
};

export default AdminMap;