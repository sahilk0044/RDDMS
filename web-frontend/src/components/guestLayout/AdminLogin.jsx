import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(""); // success or danger
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:8000/api/users/admin-login",
      formData
    );

    const { token, role } = res.data;

    // ✅ CHECK ROLE
    if (role !== "admin") {
      setVariant("danger");
      setMessage("Access denied! Only admins can login.");
      return;
    }

    // ✅ STORE TOKEN
    localStorage.setItem("token", token);

    setVariant("success");
    setMessage("Login successful! Redirecting...");

    setTimeout(() => {
      navigate("/admin");
    }, 2000);

  } catch (error) {
    setVariant("danger");
    setMessage(
      error.response?.data?.message || "Login failed. Try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        
        {/* 🔔 MESSAGE */}
        {message && (
          <Alert variant={variant} className="text-center fw-semibold">
            {message}
          </Alert>
        )}

        <Row className="justify-content-center">
          <Col md={5} data-aos="zoom-in">

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="shadow-lg border-0">
                <Card.Body className="p-4">

                  <h3 className="text-center mb-4 fw-bold">
                    Admin Login
                  </h3>

                  <Form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    {/* PASSWORD */}
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    {/* BUTTON */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        type="submit"
                        variant="warning"
                        className="w-100 fw-semibold"
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </Button>
                    </motion.div>

                  </Form>

                </Card.Body>
              </Card>
            </motion.div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;