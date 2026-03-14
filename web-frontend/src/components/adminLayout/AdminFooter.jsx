import React from "react";

const AdminFooter = () => {

  return (

    <div style={{
      background:"#0f172a",
      color:"white",
      textAlign:"center",
      padding:"10px",
      fontSize:"13px"
    }}>

      © {new Date().getFullYear()} RDDMS – Smart Road Monitoring System

    </div>

  );

};

export default AdminFooter;