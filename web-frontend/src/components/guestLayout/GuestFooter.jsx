import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRoad, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const GuestFooter = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (

    <footer
      style={{
        background: "linear-gradient(90deg,#0f172a,#1e293b)",
        color: "white",
        marginTop: "60px",
        padding: "40px 0"
      }}
      data-aos="fade-up"
    >

      <Container>

        <Row>

          {/* Project Info */}

          <Col md={4}>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

              <h5 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaRoad color="#4ade80" />
                RDDMS
              </h5>

              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                AI-Powered Smart Road Damage Detection and Monitoring System
                designed to help municipal authorities detect, monitor and
                repair road damages efficiently using citizen reports and
                intelligent analytics.
              </p>

            </motion.div>

          </Col>

          {/* Quick Links */}

          <Col md={4}>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <h6 style={{ marginBottom: "15px" }}>Quick Links</h6>

              <ul style={{ listStyle: "none", padding: 0, fontSize: "14px" }}>

                <li>Home</li>
                <li>Reports</li>
                <li>Map Visualization</li>
                <li>Analytics Dashboard</li>
                <li>Admin Login</li>

              </ul>

            </motion.div>

          </Col>

          {/* Contact */}

          <Col md={4}>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >

              <h6 style={{ marginBottom: "15px" }}>Contact</h6>

              <p style={{ fontSize: "14px" }}>
                <FaEnvelope style={{ marginRight: "8px" }} />
                support@rddms.com
              </p>

              <p style={{ fontSize: "14px" }}>
                <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                Smart Infrastructure Monitoring
              </p>

              <p style={{ fontSize: "14px" }}>
                <FaGithub style={{ marginRight: "8px" }} />
                RDDMS Project Repository
              </p>

            </motion.div>

          </Col>

        </Row>

        {/* Bottom Line */}

        <hr style={{ borderColor: "#334155", marginTop: "30px" }} />

        <motion.p
          style={{
            textAlign: "center",
            fontSize: "13px",
            marginBottom: "0"
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          © {new Date().getFullYear()} RDDMS – AI Smart Road Monitoring System

        </motion.p>

      </Container>

    </footer>

  );

};

export default GuestFooter;