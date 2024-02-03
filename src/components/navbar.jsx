import React from "react";
import {
    Navbar,
    Container,
    Nav,
  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const ProjectNavbar = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

    return (
        <Navbar bg="success" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/home">SHFT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Anasayfa</Nav.Link>
              <Nav.Link href="/favorites">Favorilerim</Nav.Link>
              <Nav.Link href="/my-contents">Gönderilerim</Nav.Link>
              <Nav.Link href="/profile">Profilim</Nav.Link>
            </Nav>
            <Nav.Link onClick={() => handleLogout()}>Çıkış Yap</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default ProjectNavbar