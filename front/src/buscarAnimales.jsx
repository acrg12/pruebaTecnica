import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

function BuscarAnimales() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");

  const buscar = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier mensaje de error previo

    try {
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

      if (request.status === 200) {
        // Si la búsqueda fue exitosa, navega a la página de resultados
        navigate(`/resultados?busqueda=${busqueda}`, {
          state: { resultados: data.respuesta },
        });
      } else if (request.status === 404) {
        // Si no se encontraron resultados, muestra un mensaje de error
        setError("No se encontraron animales con esa búsqueda.");
      } else {
        // Manejar otros posibles errores
        setError("Error en la búsqueda. Inténtelo de nuevo más tarde.");
      }
    } catch (error) {
      setError("Error en la búsqueda. Inténtelo de nuevo más tarde.");
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#">Carolina</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "77vh" }}
      >
        <Row>
          <Col>
            <div className="text-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                style={{ width: "400px" }}
                fluid
              />

              <Form onSubmit={buscar}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup
                    size="lg"
                    className="mb-3"
                    onChange={(e) => setBusqueda(e.target.value)}
                  >
                    <Form.Control
                      aria-label="Buscar"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Buscar en Google"
                      style={{
                        height: "50px",
                        fontSize: "18px",
                        borderRadius: "30px",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                        paddingLeft: "20px",
                        border: "1px solid #dfe1e5",
                      }}
                    />
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#4285f4",
                    borderColor: "#4285f4",
                    borderRadius: "30px",
                    fontSize: "16px",
                    padding: "10px 20px",
                  }}
                >
                  Buscar con Google
                </Button>
              </Form>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="bg-secondary text-light mt-5">
        <Container fluid>
          <Row className="py-3">
            <Col className="text-center">
              <p>&copy; Colombia 2024 </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default BuscarAnimales;
