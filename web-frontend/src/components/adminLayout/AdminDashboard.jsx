import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";

const DashboardCards = ({ stats }) => {

  const cards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: <MapPin size={28} />,
      color: "#3b82f6"
    },
    {
      title: "Pending Repairs",
      value: stats.pending,
      icon: <Clock size={28} />,
      color: "#f59e0b"
    },
    {
      title: "Completed Repairs",
      value: stats.completed,
      icon: <CheckCircle size={28} />,
      color: "#22c55e"
    },
    {
      title: "High Severity",
      value: stats.highSeverity,
      icon: <AlertTriangle size={28} />,
      color: "#ef4444"
    }
  ];

  return (
    <Row className="mb-4">

      {cards.map((card, index) => (

        <Col md={3} key={index}>

          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <Card className="shadow-sm border-0">

              <Card.Body>

                <div style={{ display: "flex", justifyContent: "space-between" }}>

                  <div>

                    <p style={{ fontSize: "14px", color: "#64748b" }}>
                      {card.title}
                    </p>

                    <h3>{card.value}</h3>

                  </div>

                  <div style={{ color: card.color }}>
                    {card.icon}
                  </div>

                </div>

              </Card.Body>

            </Card>

          </motion.div>

        </Col>

      ))}

    </Row>
  );
};

export default DashboardCards;