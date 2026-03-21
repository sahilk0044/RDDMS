import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100vh",
        background: "#212529",
        color: "#fff",
        zIndex: 1000,
        paddingTop: "60px",
      }}
    >
      {/* Close Button */}
      <div className="text-end px-3 mb-3">
        <button
          className="btn btn-sm btn-light"
          onClick={toggleSidebar}
        >
          ✖
        </button>
      </div>

      <Nav className="flex-column px-3">

        <Nav.Link
          as={NavLink}
          to="/admin/dashboard"
          className="text-white mb-2"
          onClick={toggleSidebar}
        >
          Dashboard
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/reports"
          className="text-white mb-2"
          onClick={toggleSidebar}
        >
          Reports
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/admin/users"
          className="text-white mb-2"
          onClick={toggleSidebar}
        >
          Users
        </Nav.Link>

      </Nav>
    </motion.div>
  );
};

export default AdminSidebar;