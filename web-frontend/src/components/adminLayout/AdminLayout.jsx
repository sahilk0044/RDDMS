import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>

      {/* Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        style={{
          marginTop: "70px",
          padding: "20px",
          minHeight: "90vh",
          transition: "margin-left 0.3s",
          marginLeft: isOpen ? "250px" : "0px",
        }}
      >
        <Outlet />
      </div>

      {/* Footer */}
      <AdminFooter />

    </div>
  );
};

export default AdminLayout;