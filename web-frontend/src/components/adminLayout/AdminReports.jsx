import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Spinner,
  Alert,
  Row,
  Col,
  Button,
  Badge,
} from "react-bootstrap";

import ReportCard from "../../components/adminLayout/ReportCard";
import AssignModal from "../../components/adminLayout/AssignModal";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  const token = localStorage.getItem("token");
  useEffect(() => {
  fetchReports();

  const interval = setInterval(() => {
    fetchReports();
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
}, []);

  // 📦 FETCH REPORTS
  const fetchReports = async (isInitial = false) => {
  try {
    if (isInitial) setLoading(true); // ✅ only first load

    const { data } = await axios.get(
      "http://localhost:8000/api/reports",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ optional: sort latest first
    const sorted = Array.isArray(data)
      ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [];

    // ✅ update only if changed (prevents re-render flicker)
    setReports((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(sorted)) {
        return sorted;
      }
      return prev;
    });

    setError("");
  } catch (err) {
    console.error(err);
    setError("Failed to fetch reports");
  } finally {
    if (isInitial) setLoading(false); // ✅ only stop loading first time
  }
};
useEffect(() => {
  fetchReports(true); // initial load with loader

  const interval = setInterval(() => {
    fetchReports(false); // background refresh (no loader)
  }, 8000); // 🔥 increased interval for smoother UX

  return () => clearInterval(interval);
}, []);

  const deleteReport = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:8000/api/reports/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 🔥 remove from UI instantly
    setReports((prev) => prev.filter((r) => r._id !== id));

  } catch (err) {
    console.error(err);
    alert("Failed to delete report");
  }
};

  // 🔄 UPDATE STATUS (OPTIMISTIC UPDATE)
  const updateStatus = async (id, status) => {
    try {
      // 🔥 Optimistic UI update (instant change)
      setReports((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );

      const res = await axios.put(
        `http://localhost:8000/api/reports/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATED:", res.data);

    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data || error.message);

      // ❌ rollback if failed
      fetchReports();
      alert("Failed to update status");
    }
  };

  // 🎯 FILTER LOGIC
  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter((r) => r.status === filter);

  // 🔥 Include ALL statuses your system might use
  const filters = ["All", "in_progress", "repaired"];

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔥 HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <h2 className="m-0 fw-bold">📋 Manage Reports</h2>
        <p className="mb-0 text-light">
          View, filter and manage all reported road damages
        </p>
      </div>

      {/* 🎛️ FILTER BAR */}
      <div className="flex-wrap gap-2 mb-3 d-flex">
        {filters.map((f, index) => (
          <Button
            key={index}
            variant={filter === f ? "dark" : "outline-dark"}
            onClick={() => setFilter(f)}
          >
            {f}
            <Badge bg="secondary" className="ms-2">
              {f === "All"
                ? reports.length
                : reports.filter((r) => r.status === f).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="mt-5 text-center">
          <Spinner animation="border" />
        </div>
      )}

      {/* ❌ ERROR */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* 📭 EMPTY */}
      {!loading && filteredReports.length === 0 && (
        <div className="mt-5 text-center text-muted">
          <h5>No reports found</h5>
          <p>Try changing filter</p>
        </div>
      )}

      {/* 📊 GRID */}
      <Row className="g-4">
        {!loading &&
          filteredReports.map((report) => (
            <Col lg={4} md={6} key={report._id}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <ReportCard
                  report={report}
                  onUpdateStatus={updateStatus}
                  onAssign={() => setSelectedReport(report)}
                  onDelete={deleteReport} 
                />
              </motion.div>
            </Col>
          ))}
      </Row>

      {/* 📌 MODAL */}
      {selectedReport && (
        <AssignModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          refresh={fetchReports}
        />
      )}
    </div>
  );
};

export default Report;