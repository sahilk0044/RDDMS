import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaRoad,
  FaMapMarkedAlt,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>

      {/* 🔥 HERO SECTION */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "white",
          padding: "80px 0",
        }}
      >
        <Container>
          <Row className="align-items-center">

            <Col md={6}>
              <motion.h1
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="fw-bold display-5"
              >
                🚧 RDDMS
              </motion.h1>

              <h3 className="mt-3 fw-light">
                Smart Road Damage Detection & Monitoring
              </h3>

              <p className="mt-3 text-light">
                AI-powered system to detect potholes, cracks and road damages in
                real-time. Improve safety and enable faster maintenance.
              </p>

              <Button
                variant="warning"
                size="lg"
                className="px-4 mt-3"
                onClick={() => navigate("/admin/login")}
              >
                Get Started
              </Button>
            </Col>

            <Col md={6} className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt="road"
                className="img-fluid"
                style={{ maxHeight: "300px" }}
              />
            </Col>

          </Row>
        </Container>
      </section>

      {/* ⚡ FEATURES */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-5 text-center fw-bold">
            🚀 Core Features
          </h2>

          <Row className="g-4">

            {[
              {
                icon: <FaBrain size={30} />,
                title: "AI Detection",
                desc: "Advanced AI model detects road damages instantly.",
              },
              {
                icon: <FaMapMarkedAlt size={30} />,
                title: "Live Location",
                desc: "Automatically tags exact damage location.",
              },
              {
                icon: <FaRoad size={30} />,
                title: "Damage Tracking",
                desc: "Monitor potholes and cracks across regions.",
              },
              {
                icon: <FaChartLine size={30} />,
                title: "Analytics",
                desc: "Insights for smarter infrastructure decisions.",
              },
            ].map((item, index) => (
              <Col md={3} sm={6} key={index}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="p-3 text-center border-0 shadow-lg h-100">
                    <Card.Body>
                      <div className="mb-3 text-warning">
                        {item.icon}
                      </div>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text className="text-muted">
                        {item.desc}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* ⚙️ HOW IT WORKS */}
      <section className="py-5">
        <Container>
          <h2 className="mb-5 text-center fw-bold">
            ⚙️ How It Works
          </h2>

          <Row className="text-center g-4">

            {[
              "📸 Capture Image",
              "🤖 AI Detection",
              "📍 Location Tagging",
              "📤 Report Submission",
            ].map((step, index) => (
              <Col md={3} sm={6} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div
                    className="p-4 rounded shadow"
                    style={{
                      background: "#ffffff",
                    }}
                  >
                    <h5 className="fw-bold">Step {index + 1}</h5>
                    <p className="text-muted">{step}</p>
                  </div>
                </motion.div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* 📊 WHY SECTION */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-5 text-center fw-bold">
            🌍 Why RDDMS?
          </h2>

          <Row className="text-center g-4">

            {[
              "🚧 Safer Roads",
              "⚡ Faster Repairs",
              "🏙️ Smart City Ready",
              "📊 Data Insights",
            ].map((item, index) => (
              <Col md={3} sm={6} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="p-4 bg-white border rounded shadow-sm">
                    <p className="fw-semibold">{item}</p>
                  </div>
                </motion.div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* 🚀 CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #ffb347, #ffcc33)",
          padding: "60px 0",
        }}
        className="text-center"
      >
        <Container>
          <h2 className="fw-bold">
            Ready to Transform Road Monitoring?
          </h2>

          <p className="mt-3">
            Join the future of smart infrastructure with AI-powered detection.
          </p>

          <Button
            variant="dark"
            size="lg"
            onClick={() => navigate("/admin/login")}
          >
            Open Dashboard
          </Button>
        </Container>
      </section>

    </div>
  );
};

export default Home;