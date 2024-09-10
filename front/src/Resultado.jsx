import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import gato from "./assets/gato.jpg";
import leon from "./assets/leon.jpg";

const Resultados = () => {
  const location = useLocation();
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [resultados, setResultados] = useState(
    location.state?.resultados || []
  );
  const [cardImage, setCardImage] = useState(gato); // Estado para la imagen de la tarjeta

  const buscar = async (e) => {
    e.preventDefault();
    const request = await fetch(
      `http://localhost:3900/api/listarAnimales/${busqueda}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await request.json();
    setResultados(data.respuesta);
    console.log(data.respuesta);

    // Actualiza la imagen de la tarjeta según el animal buscado
    const foundAnimal = data.respuesta.find(
      (animal) => animal.nombre.toLowerCase() === busqueda.toLowerCase()
    );
    if (foundAnimal) {
      // Asumiendo que la imagen se asigna en base al nombre del animal
      if (foundAnimal.nombre.toLowerCase() === "el león") {
        setCardImage(leon);
      } else {
        setCardImage(gato);
      }
    } else {
      setCardImage(gato); // Imagen por defecto si no se encuentra el animal
    }
  };

  const handleLinkClick = (url, nombre) => {
    setModalTitle(nombre);
    setIframeUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/" style={styles.googleBrand}>
            <a style={{ textDecoration: "none" }} href="/">
              Google
            </a>
          </Navbar.Brand>
          <Form style={styles.searchForm} onSubmit={buscar}>
            <InputGroup style={styles.inputGroup}>
              <Form.Control
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar en Google o escribir URL"
                aria-label="Buscar Animal"
                style={styles.searchInput}
              />
              <Button
                variant="primary"
                type="submit"
                style={styles.searchButton}
              >
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <div>
              {resultados.map((animal) => (
                <div key={animal.nombre} style={styles.resultItem}>
                  <a
                    href="#"
                    style={styles.resultLink}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(animal.url, animal.nombre);
                    }}
                  >
                    {animal.nombre} | {animal.fuente}
                  </a>
                  <p style={styles.resultUrl}>
                    <a href={animal.url} style={styles.resultUrlLink}>
                      {animal.url}
                    </a>
                  </p>
                  <p style={styles.resultDescription}>{animal.descripcion}</p>
                </div>
              ))}
            </div>
          </Col>

          <Col md={4}>
            <Card style={{ width: "100%", height: "400px" }}>
              <Card.Img
                variant="top"
                src={cardImage} // Usa la imagen del estado
                alt="Imagen Placeholder"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Animal</Card.Title>
                <Card.Text>
                  Descripción del animal que se muestra en la tarjeta.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={iframeUrl}
            title={modalTitle}
            width="100%"
            height="400px"
            style={{ border: "none" }}
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Estilos personalizados para que la barra de búsqueda se parezca a la de Google
const styles = {
  googleBrand: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  searchForm: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px 0",
  },
  inputGroup: {
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "50px",
    overflow: "hidden",
  },
  searchInput: {
    borderRadius: "50px 0 0 50px",
    padding: "10px 20px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  searchButton: {
    borderRadius: "0 50px 50px 0",
    padding: "10px 20px",
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  resultItem: {
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  resultLink: {
    fontSize: "16px",
    color: "#1a0dab",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultUrl: {
    fontSize: "14px",
    color: "#4d5156",
    marginTop: "2px",
  },
  resultUrlLink: {
    color: "#1a0dab",
    textDecoration: "none",
  },
  resultDescription: {
    fontSize: "14px",
    marginTop: "5px",
    color: "#4d5156",
  },
};

export default Resultados;
