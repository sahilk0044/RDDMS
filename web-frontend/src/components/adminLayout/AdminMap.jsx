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

const center = {
  lat: 12.9716,
  lng: 77.5946, // Bangalore
};

const getMarkerIcon = (status) => {
  if (status === "In Progress") {
    return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
  }
  if (status === "Completed") {
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  }
  return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
};

const AdminMap = () => {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("/api/reports");
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 md:p-6 h-[90vh]">
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Road Damage Map
      </motion.h1>

      <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            {reports
              .filter((r) => r.latitude && r.longitude)
              .map((report) => (
                <Marker
                  key={report._id}
                  position={{
                    lat: report.latitude,
                    lng: report.longitude,
                  }}
                  icon={getMarkerIcon(report.status)}
                  onClick={() => setSelected(report)}
                />
              ))}

            {selected && (
              <InfoWindow
                position={{
                  lat: selected.latitude,
                  lng: selected.longitude,
                }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="w-48">
                  <img
                    src={selected.image}
                    alt=""
                    className="w-full h-24 object-cover rounded"
                  />
                  <h3 className="font-bold mt-1">
                    {selected.damageType || "Damage"}
                  </h3>
                  <p className="text-xs">{selected.location}</p>
                  <p className="text-xs">Severity: {selected.severity}</p>
                  <p className="text-xs font-semibold">
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