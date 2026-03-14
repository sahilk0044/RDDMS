import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  useEffect(()=>{
    AOS.init({duration:900});
  },[])

  const handleLogin = async(e) => {

    e.preventDefault();

    try{

      const res = await axios.post("http://localhost:8000/api/users/admin-login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      navigate("/admin");

    }
    catch(err){
      alert("Invalid credentials");
    }

  };

  return (

    <div
      style={{
        background:"#f1f5f9",
        minHeight:"85vh",
        display:"flex",
        alignItems:"center"
      }}
    >

      <Container>

        <Row className="justify-content-center">

          <Col md={5} data-aos="zoom-in">

            <motion.div
              initial={{opacity:0,y:40}}
              animate={{opacity:1,y:0}}
              transition={{duration:0.6}}
            >

              <Card className="shadow border-0">

                <Card.Body style={{padding:"40px"}}>

                  <h3 className="text-center mb-4">
                    RDDMS Admin Login
                  </h3>

                  <Form onSubmit={handleLogin}>

                    {/* Email */}

                    <Form.Group className="mb-3">

                      <Form.Label>Email</Form.Label>

                      <div style={{position:"relative"}}>

                        <Mail
                          size={18}
                          style={{
                            position:"absolute",
                            top:"12px",
                            left:"10px",
                            color:"#64748b"
                          }}
                        />

                        <Form.Control
                          type="email"
                          placeholder="Enter admin email"
                          style={{paddingLeft:"35px"}}
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          required
                        />

                      </div>

                    </Form.Group>


                    {/* Password */}

                    <Form.Group className="mb-4">

                      <Form.Label>Password</Form.Label>

                      <div style={{position:"relative"}}>

                        <Lock
                          size={18}
                          style={{
                            position:"absolute",
                            top:"12px",
                            left:"10px",
                            color:"#64748b"
                          }}
                        />

                        <Form.Control
                          type="password"
                          placeholder="Enter password"
                          style={{paddingLeft:"35px"}}
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          required
                        />

                      </div>

                    </Form.Group>


                    <motion.div whileHover={{scale:1.03}}>

                      <Button
                        type="submit"
                        style={{
                          width:"100%",
                          background:"#22c55e",
                          border:"none",
                          fontWeight:"600",
                          padding:"10px"
                        }}
                      >
                        Login to Dashboard
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

export default Login;