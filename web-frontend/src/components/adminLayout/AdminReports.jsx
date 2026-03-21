import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch reports
  const fetchReports = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/reports",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setReports(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 🔄 Update Status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(
        "http://localhost:8000/api/reports/status",
        {
          reportId: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchReports(); // refresh after update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid>
      <h2 className="fw-bold mb-4">Road Damage Reports</h2>

      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <Row className="g-4">

          {reports.map((report) => (
            <Col md={4} key={report._id}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="shadow border-0 h-100">

                  {/* 📸 IMAGE */}
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/${report.image}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <Card.Body>

                    {/* 📍 LOCATION */}
                    <h6 className="fw-semibold">
                      📍 {report.location}
                    </h6>

                    {/* 👤 USER */}
                    <p className="small text-muted mb-1">
                      {report.userId?.name} ({report.userId?.email})
                    </p>

                    {/* ⚠️ DAMAGE TYPE */}
                    <p className="mb-1">
                      Damage: <strong>{report.damageType}</strong>
                    </p>

                    {/* 🔥 SEVERITY */}
                    <Badge
                      bg={
                        report.severity === "High"
                          ? "danger"
                          : report.severity === "Medium"
                          ? "warning"
                          : "secondary"
                      }
                      className="me-2"
                    >
                      {report.severity}
                    </Badge>

                    {/* 📌 STATUS */}
                    <Badge
                      bg={
                        report.status === "Reported"
                          ? "warning"
                          : "success"
                      }
                    >
                      {report.status}
                    </Badge>

                    {/* 🔘 ACTION BUTTON */}
                    <div className="mt-3">
                      {report.status !== "Repaired" && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() =>
                            handleStatusUpdate(
                              report._id,
                              "Repaired"
                            )
                          }
                        >
                          Mark as Repaired
                        </Button>
                      )}
                    </div>

                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}

        </Row>
      )}
    </Container>
  );
};

export default AdminReports;