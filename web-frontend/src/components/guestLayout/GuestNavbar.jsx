import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const GuestNavbar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        className="shadow-lg py-3"
        data-aos="fade-down"
      >
        <Container>
          {/* Logo / Brand */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Navbar.Brand
              as={NavLink}
              to="/"
              className="fw-bold text-uppercase"
            >
              RDDMS
            </Navbar.Brand>
          </motion.div>

          <Navbar.Toggle aria-controls="guest-navbar-nav" />

          <Navbar.Collapse id="guest-navbar-nav">
            <Nav className="ms-auto gap-3 align-items-center">
              
              {/* Home */}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Nav.Link
                  as={NavLink}
                  to="/home"
                  className="fw-semibold text-white"
                >
                  Home
                </Nav.Link>
              </motion.div>

              {/* Admin Login */}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Nav.Link
                  as={NavLink}
                  to="/AdminLogin"
                  className="fw-semibold px-3 py-2 rounded bg-warning text-dark"
                >
                  Admin Login
                </Nav.Link>
              </motion.div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default GuestNavbar;