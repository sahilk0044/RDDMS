import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 remove token
    localStorage.removeItem("token");

    // optional: clear everything
    // localStorage.clear();

    // redirect to login
    navigate("/AdminLogin");
  };

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 🔥 pushes logout to bottom
      }}
    >
      {/* TOP SECTION */}
      <div>
        {/* Close Button */}
        <div className="px-3 mb-3 text-end">
          <button
            className="btn btn-sm btn-light"
            onClick={toggleSidebar}
          >
            ✖
          </button>
        </div>

        <Nav className="px-3 flex-column">

          <Nav.Link
            as={NavLink}
            to="/admin/dashboard"
            className="mb-2 text-white"
            onClick={toggleSidebar}
          >
            Dashboard
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/admin/reports"
            className="mb-2 text-white"
            onClick={toggleSidebar}
          >
            Reports
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/admin/users"
            className="mb-2 text-white"
            onClick={toggleSidebar}
          >
            Users
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/admin/map"
            className="mb-2 text-white"
            onClick={toggleSidebar}
          >
            Map
          </Nav.Link>

        </Nav>
      </div>

      {/* 🔥 LOGOUT BUTTON (BOTTOM) */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="btn btn-danger w-100"
        >
          🚪 Logout
        </button>
      </div>

    </motion.div>
  );
};

export default AdminSidebar;