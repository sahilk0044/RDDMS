import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar1 from "./AdminNavbar1";
import AdminSidebar1 from "./AdminSidebar1";
import AdminFooter1 from "./AdminFooter1";


const AdminLayout1 = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <AdminNavbar1 toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ display: "flex", flex: 1 }}>

        <AdminSidebar1
          sidebarOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <div
          style={{
            flex: 1,
            padding: "25px",
            background: "#f1f5f9",
            marginLeft: sidebarOpen ? "240px" : "0"
          }}
        >
          <Outlet />
        </div>

      </div>

      <AdminFooter1 />

    </div>

  );
};

export default AdminLayout1;