import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const GuestFooter = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5" data-aos="fade-up">
      <Container>
        <Row className="gy-4">

          {/* Project Info */}
          <Col md={4}>
            <motion.h5
              whileHover={{ scale: 1.05 }}
              className="fw-bold text-uppercase"
            >
              RDDMS
            </motion.h5>
            <p className="small text-muted">
              Real-Time Disaster Detection & Management System providing quick
              alerts, authority response, and user safety features.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small">
              <motion.li whileHover={{ x: 5 }}>
                <a href="/" className="text-decoration-none text-light">
                  Home
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="/admin/login"
                  className="text-decoration-none text-light"
                >
                  Admin Login
                </a>
              </motion.li>
            </ul>
          </Col>

          {/* Contact / Info */}
          <Col md={4}>
            <h6 className="fw-semibold">Contact</h6>
            <p className="small text-muted mb-1">
              Email: support@rddms.com
            </p>
            <p className="small text-muted">
              Emergency Response System
            </p>
          </Col>

        </Row>

        <hr className="border-secondary mt-4" />

        {/* Bottom */}
        <Row>
          <Col className="text-center small text-muted">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-0"
            >
              © {new Date().getFullYear()} RDDMS. All rights reserved.
            </motion.p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default GuestFooter;