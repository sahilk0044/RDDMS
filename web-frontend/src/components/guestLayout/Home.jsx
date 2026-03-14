import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Camera,
  MapPin,
  Cpu,
  Wrench,
  BarChart3,
  Radar
} from "lucide-react";

const Home = () => {

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  return (
    <>

      {/* HERO SECTION */}

      <div
        style={{
          background: "linear-gradient(120deg,#0f172a,#1e293b)",
          color: "white",
          padding: "110px 0"
        }}
      >

        <Container>

          <Row className="align-items-center">

            <Col md={6}>

              <motion.h1
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                style={{ fontWeight: "700", lineHeight: "1.3" }}
              >
                AI Powered Road Damage Detection
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: "18px", opacity: 0.9 }}
              >
                RDDMS enables municipalities to detect potholes and road cracks
                using AI-powered image analysis and real-time citizen reporting.
              </motion.p>

              {/* <motion.div whileHover={{ scale: 1.05 }} style={{ marginTop: "25px" }}>
                <Button variant="success">
                  Open Dashboard
                </Button>
              </motion.div> */}

            </Col>

            <Col md={6} data-aos="zoom-in">

              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
                alt="smart city infrastructure"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}
              />

            </Col>

          </Row>

        </Container>

      </div>


      {/* FEATURES */}

      <Container style={{ marginTop: "90px" }}>

        <h2 className="text-center mb-5">
          Intelligent Road Monitoring Platform
        </h2>

        <Row>

          <Col md={4} data-aos="fade-up">

            <Card className="shadow border-0 h-100">

              <Card.Body className="text-center p-4">

                <Camera size={36} color="#22c55e" />

                <h5 className="mt-3">Citizen Damage Reporting</h5>

                <p style={{ fontSize: "14px" }}>
                  Citizens capture road damage images through mobile
                  applications and submit them with GPS coordinates.
                </p>

              </Card.Body>

            </Card>

          </Col>

          <Col md={4} data-aos="fade-up">

            <Card className="shadow border-0 h-100">

              <Card.Body className="text-center p-4">

                <Cpu size={36} color="#22c55e" />

                <h5 className="mt-3">AI Damage Detection</h5>

                <p style={{ fontSize: "14px" }}>
                  The system uses AI models to detect potholes and cracks
                  from images and determine severity levels.
                </p>

              </Card.Body>

            </Card>

          </Col>

          <Col md={4} data-aos="fade-up">

            <Card className="shadow border-0 h-100">

              <Card.Body className="text-center p-4">

                <MapPin size={36} color="#22c55e" />

                <h5 className="mt-3">Geo Map Visualization</h5>

                <p style={{ fontSize: "14px" }}>
                  Road damages are displayed on interactive maps for
                  quick identification and prioritization.
                </p>

              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>


      {/* WORKFLOW */}

      <Container style={{ marginTop: "100px" }}>

        <Row className="align-items-center">

          <Col md={6} data-aos="fade-right">

            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
              alt="road monitoring"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
              }}
            />

          </Col>

          <Col md={6} data-aos="fade-left">

            <h3>How RDDMS Works</h3>

            <p style={{ marginTop: "15px" }}>
              The platform combines citizen participation, artificial
              intelligence, and municipal monitoring dashboards to
              improve road maintenance efficiency.
            </p>

            <ul style={{ lineHeight: "2" }}>

              <li><Radar size={18}/> Image capture with GPS</li>

              <li><Cpu size={18}/> AI pothole detection</li>

              <li><BarChart3 size={18}/> Dashboard monitoring</li>

              <li><Wrench size={18}/> Repair team assignment</li>

            </ul>

          </Col>

        </Row>

      </Container>


      {/* STATISTICS */}

      <div
        style={{
          marginTop: "110px",
          background: "#f1f5f9",
          padding: "80px 0"
        }}
      >

        <Container>

          <Row className="text-center">

            <Col md={3} data-aos="fade-up">

              <motion.h2 whileHover={{ scale: 1.1 }}>
                1200+
              </motion.h2>

              <p>Reports Collected</p>

            </Col>

            <Col md={3} data-aos="fade-up">

              <motion.h2 whileHover={{ scale: 1.1 }}>
                850+
              </motion.h2>

              <p>Repairs Completed</p>

            </Col>

            <Col md={3} data-aos="fade-up">

              <motion.h2 whileHover={{ scale: 1.1 }}>
                40+
              </motion.h2>

              <p>City Zones Monitored</p>

            </Col>

            <Col md={3} data-aos="fade-up">

              <motion.h2 whileHover={{ scale: 1.1 }}>
                92%
              </motion.h2>

              <p>AI Detection Accuracy</p>

            </Col>

          </Row>

        </Container>

      </div>

    </>
  );
};

export default Home;