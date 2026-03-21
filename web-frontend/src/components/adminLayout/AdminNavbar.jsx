import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { motion } from "framer-motion";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="shadow">
      <Container fluid>

        {/* Hamburger */}
        <motion.div whileTap={{ scale: 0.9 }}>
          <button
            className="btn btn-outline-light me-3"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </motion.div>

        <Navbar.Brand className="fw-bold">
          RDDMS Admin
        </Navbar.Brand>

      </Container>
    </Navbar>
  );
};

export default AdminNavbar;