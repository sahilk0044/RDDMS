import React from "react";
import { Container } from "react-bootstrap";

const AdminFooter = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center small">
        © {new Date().getFullYear()} RDDMS Admin Panel
      </Container>
    </footer>
  );
};

export default AdminFooter;