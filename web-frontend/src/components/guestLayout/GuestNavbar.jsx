import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRoad, FaMapMarkedAlt, FaChartLine } from "react-icons/fa";

const GuestNavbar = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navItem = {
    whileHover: { scale: 1.1, color: "#4ade80" },
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "linear-gradient(90deg,#0f172a,#1e293b)",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.3)"
      }}
      data-aos="fade-down"
    >
      <Container>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <FaRoad color="#4ade80" size={24} />
          <Navbar.Brand
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              letterSpacing: "1px"
            }}
          >
            RDDMS
          </Navbar.Brand>
        </motion.div>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "#4ade80" }}
        />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto" style={{ alignItems: "center", gap: "20px" }}>

            {/* <motion.div {...navItem}>
              <NavLink className="nav-link text-light" to="/home">
                Home
              </NavLink>
            </motion.div> */}
{/* 
            <motion.div {...navItem}>
              <NavLink className="nav-link text-light" to="/reports">
                <FaMapMarkedAlt style={{ marginRight: "5px" }} />
                Reports
              </NavLink>
            </motion.div> */}

            {/* <motion.div {...navItem}>
              <NavLink className="nav-link text-light" to="/map">
                Map View
              </NavLink>
            </motion.div> */}

            {/* <motion.div {...navItem}>
              <NavLink className="nav-link text-light" to="/analytics">
                <FaChartLine style={{ marginRight: "5px" }} />
                Analytics
              </NavLink>
            </motion.div> */}

            {/* Login Button */}

            <motion.div whileHover={{ scale: 1.1 }}>
              <NavLink to="/login">
                <Button
                  style={{
                    background: "#4ade80",
                    border: "none",
                    color: "#0f172a",
                    fontWeight: "600",
                    padding: "6px 18px",
                    borderRadius: "20px"
                  }}
                >
                  Admin Login
                </Button>
              </NavLink>
            </motion.div>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default GuestNavbar;