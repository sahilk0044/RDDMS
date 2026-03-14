import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>

      <AdminNavbar toggleSidebar={()=>setSidebarOpen(!sidebarOpen)} />

      <div style={{ display:"flex", flex:1 }}>

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          closeSidebar={()=>setSidebarOpen(false)}
        />

        <div style={{
          flex:1,
          padding:"25px",
          background:"#f1f5f9"
        }}>
          {children}
        </div>

      </div>

      <AdminFooter />

    </div>

  );

};

export default AdminLayout;