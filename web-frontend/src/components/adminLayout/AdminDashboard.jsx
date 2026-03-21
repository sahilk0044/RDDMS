import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/stats", // ✅ match your API
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStats(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 5000); // 🔄 refresh

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid>
      <h2 className="fw-bold mb-4">Dashboard Overview</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">

          {/* Total Reports */}
          <Col md={3} sm={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="shadow border-0 text-center p-3">
                <h6>Total Reports</h6>
                <h3 className="fw-bold text-warning">
                  {stats?.totalReports ||0}
                </h3>
              </Card>
            </motion.div>
          </Col>

          {/* Pending */}
          <Col md={3} sm={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="shadow border-0 text-center p-3">
                <h6>Pending (Reported)</h6>
                <h3 className="fw-bold text-danger">
                  {stats?.pendingReports||0}
                </h3>
              </Card>
            </motion.div>
          </Col>

          {/* Resolved */}
          <Col md={3} sm={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="shadow border-0 text-center p-3">
                <h6>Resolved (Repaired)</h6>
                <h3 className="fw-bold text-success">
                  {stats?.resolvedReports ||0}
                </h3>
              </Card>
            </motion.div>
          </Col>

          {/* High Severity */}
          <Col md={3} sm={6}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="shadow border-0 text-center p-3">
                <h6>High Severity Cases</h6>
                <h3 className="fw-bold text-primary">
                  {stats?.highSeverity ||0}
                </h3>
              </Card>
            </motion.div>
          </Col>

        </Row>
      )}

      {/* Extra Info */}
      <Row className="mt-5">
        <Col>
          <Card className="shadow border-0 p-4">
            <h5>System Insights</h5>
            <p className="text-muted">
              Dashboard auto-refreshes every 5 seconds. High severity damages require urgent attention.
            </p>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default AdminDashboard;