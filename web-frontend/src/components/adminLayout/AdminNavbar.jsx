import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <Navbar style={{ background:"#0f172a" }}>

      <Container fluid>

        <Button
          variant="outline-light"
          onClick={toggleSidebar}
        >
          <Menu size={20}/>
        </Button>

        <h5 style={{ color:"white", margin:0 }}>
          RDDMS Admin
        </h5>

        <Button variant="outline-light" onClick={logout}>
          <LogOut size={18}/> Logout
        </Button>

      </Container>

    </Navbar>

  );

};

export default AdminNavbar;