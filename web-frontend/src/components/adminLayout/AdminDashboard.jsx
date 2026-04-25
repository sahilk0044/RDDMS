import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFire,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    highSeverity: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStats(res.data);
      setError("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
  {
    title: "Total Reports",
    value: stats.totalReports,
    color: "warning",
    icon: <FaClipboardList />,
  },
  {
    title: "Reported",
    value: stats.reported || 0,
    color: "danger",
    icon: <FaExclamationTriangle />,
  },
  {
    title: "In Progress",
    value: stats.inProgress || 0,
    color: "primary",
    icon: <FaFire />,
  },
  {
    title: "Repaired",
    value: stats.repaired || 0,
    color: "success",
    icon: <FaCheckCircle />,
  },
];
  return (
    <Container fluid style={{ padding: "20px" }}>
      
      {/* 🔥 HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "25px",
        }}
      >
        <h2 className="m-0 fw-bold">🚧 RDDMS Admin Dashboard</h2>
        <p className="mb-0 text-light">
          Monitor road damage reports in real-time
        </p>
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="mt-5 text-center">
          <Spinner animation="border" />
        </div>
      )}

      {/* ❌ ERROR */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* 📊 STATS */}
      {!loading && !error && (
        <Row className="g-4">
          {cards.map((card, index) => (
            <Col lg={3} md={6} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  className="border-0 shadow-lg"
                  style={{
                    borderRadius: "15px",
                    padding: "20px",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    
                    <div>
                      <h6 className="text-muted">{card.title}</h6>
                      <h2 className={`fw-bold text-${card.color}`}>
                        {card.value}
                      </h2>
                    </div>

                    <div
                      style={{
                        fontSize: "28px",
                        color: "#ccc",
                      }}
                    >
                      {card.icon}
                    </div>

                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}

      {/* 📌 INFO PANEL */}
      <Row className="mt-5">
        <Col>
          <Card
            className="border-0 shadow"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body>
              <h5>📊 System Insights</h5>
              <p className="mb-1 text-muted">
                • Dashboard refreshes every 5 seconds
              </p>
              <p className="mb-1 text-muted">
                • High severity damages need immediate action
              </p>
              <p className="text-muted">
                • Use admin tools to update report status
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default AdminDashboard;