import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      
      {/* 🚧 HERO SECTION */}
      <section className="bg-dark text-light py-5">
        <Container>
          <Row className="align-items-center">

            <Col md={6}>
              <motion.h1
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="fw-bold"
              >
                AI-Based Road Damage Detection & Monitoring
              </motion.h1>

              <p className="mt-3 text-muted">
                Detect potholes, cracks, and road damages in real-time using AI.
                Improve road safety and help authorities respond faster with smart monitoring.
              </p>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="warning"
                  size="lg"
                  className="mt-3"
                  onClick={() => navigate("/admin/login")}
                >
                  Admin Login
                </Button>
              </motion.div>
            </Col>

            <Col md={6} data-aos="zoom-in">
              <img
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt="road damage"
                className="img-fluid"
              />
            </Col>

          </Row>
        </Container>
      </section>

      {/* 🧠 FEATURES */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            Key Features
          </h2>

          <Row className="g-4">

            {[
              {
                title: "AI Damage Detection",
                desc: "Detect potholes and cracks using image processing and AI.",
              },
              {
                title: "Real-Time Monitoring",
                desc: "Track road conditions and damages instantly.",
              },
              {
                title: "Location Tagging",
                desc: "Automatically capture and store damage location.",
              },
              {
                title: "Admin Dashboard",
                desc: "Authorities can monitor and manage reports easily.",
              },
            ].map((item, index) => (
              <Col md={3} key={index} data-aos="fade-up">
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="shadow border-0 h-100">
                    <Card.Body>
                      <Card.Title className="fw-semibold">
                        {item.title}
                      </Card.Title>
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
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            How It Works
          </h2>

          <Row className="text-center g-4">

            {[
              "Capture road image",
              "AI analyzes damage",
              "Location is tagged",
              "Report sent to authorities",
            ].map((step, index) => (
              <Col md={3} key={index} data-aos="zoom-in">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="p-4 bg-white shadow rounded">
                    <h5 className="fw-bold">Step {index + 1}</h5>
                    <p className="text-muted">{step}</p>
                  </div>
                </motion.div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* 📊 IMPACT SECTION */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            Why RDDMS?
          </h2>

          <Row className="text-center g-4">

            {[
              "Improves road safety",
              "Faster maintenance response",
              "Smart city integration",
              "Data-driven decisions",
            ].map((item, index) => (
              <Col md={3} key={index} data-aos="fade-up">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="p-4 border rounded shadow-sm">
                    <p className="fw-semibold">{item}</p>
                  </div>
                </motion.div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* 📢 CTA */}
      <section className="bg-warning text-dark py-5 text-center">
        <Container>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fw-bold"
          >
            Smart Roads Start With Smart Monitoring
          </motion.h2>

          <p className="mt-3">
            Use AI to detect road damages early and improve infrastructure quality.
          </p>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate("/admin/login")}
            >
              Go to Admin Panel
            </Button>
          </motion.div>
        </Container>
      </section>

    </div>
  );
};

export default Home;