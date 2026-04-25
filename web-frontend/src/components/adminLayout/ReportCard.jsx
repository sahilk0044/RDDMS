import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import axios from "axios";

const ReportCard = ({ report, onUpdateStatus, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("Fetching location...");

  // 📍 Location logic
  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        if (report.locationName) {
          setLocationName(report.locationName);
          return;
        }

        if (report.latitude && report.longitude) {
          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                lat: report.latitude,
                lon: report.longitude,
                format: "json",
              },
            }
          );

          if (!isMounted) return;

          const addr = res.data.address;

          setLocationName(
            `${addr.city || addr.town || addr.village || "Unknown"}, ${
              addr.state || ""
            }`
          );
        } else {
          setLocationName(report.location || "Location not available");
        }
      } catch {
        setLocationName("Location unavailable");
      }
    };

    fetchLocation();

    return () => {
      isMounted = false;
    };
  }, [report]);

  // 🔄 Status update
  const handleStatusChange = async (status) => {
    try {
      setLoading(true);
      await onUpdateStatus(report._id, status);
    } catch {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 Delete
  const handleDelete = () => {
    if (!window.confirm("Delete this report?")) return;
    onDelete(report._id);
  };

  return (
    <motion.div
      className="p-3 bg-white shadow-md rounded-3xl hover:shadow-xl"
      whileHover={{ scale: 1.03 }}
    >
      {/* 🖼 IMAGE */}
      <img
        src={
          report.image
            ? `http://localhost:8000/${report.image}`
            : "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt="report"
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      {/* 📄 CONTENT */}
      <div className="mt-3">
        {/* 📍 LOCATION */}
        <h5 className="mb-1 fw-semibold">📍 {locationName}</h5>

        {/* 📝 DESCRIPTION */}
        <p className="text-muted" style={{ fontSize: "14px" }}>
          {report.description || "No description provided"}
        </p>

        {/* 🏷 STATUS */}
        <div className="mb-2">
          <StatusBadge status={report.status} />
        </div>

        {/* ⚡ ACTION ROW */}
        <div className="flex-wrap gap-2 d-flex justify-content-between align-items-center">

          {/* 🗑 LEFT DELETE */}
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>

          {/* 👉 RIGHT STATUS BUTTONS */}
          <div className="flex-wrap gap-2 d-flex">
            <button
              disabled={loading}
              onClick={() => handleStatusChange("reported")}
              className="btn btn-secondary btn-sm"
            >
              Reported
            </button>

            <button
              disabled={loading}
              onClick={() => handleStatusChange("in_progress")}
              className="btn btn-warning btn-sm"
            >
              In Progress
            </button>

            <button
              disabled={loading}
              onClick={() => handleStatusChange("repaired")}
              className="btn btn-success btn-sm"
            >
              Complete
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ReportCard;