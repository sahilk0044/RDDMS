import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Map,
  Wrench,
  BarChart3
} from "lucide-react";

const AdminSidebar1 = ({ sidebarOpen, closeSidebar }) => {

  const links = [
    {
      name:"Dashboard",
      icon:<LayoutDashboard size={18}/>,
      path:"/admin/dashboard"
    },
    {
      name:"Reports",
      icon:<Map size={18}/>,
      path:"/admin/reports"
    },
    {
      name:"Repair Updates",
      icon:<Wrench size={18}/>,
      path:"/admin/repairs"
    },
    {
      name:"Analytics",
      icon:<BarChart3 size={18}/>,
      path:"/admin/analytics"
    }
  ];

  return (

    <motion.div

      initial={{ x:-250 }}
      animate={{ x: sidebarOpen ? 0 : -250 }}

      transition={{ duration:0.3 }}

      style={{
        width:"240px",
        background:"#1e293b",
        color:"white",
        height:"100vh",
        position:"fixed",
        zIndex:1000
      }}

    >

      <div style={{ padding:"20px", fontWeight:"600" }}>
        Navigation
      </div>

      {links.map((link,i)=>(

        <NavLink
          key={i}
          to={link.path}
          onClick={closeSidebar}
          style={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
            padding:"12px 20px",
            color:"white",
            textDecoration:"none"
          }}
        >

          {link.icon}
          {link.name}

        </NavLink>

      ))}

    </motion.div>

  );

};

export default AdminSidebar1;