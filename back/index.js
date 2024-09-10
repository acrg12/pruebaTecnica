const { conexion, sincronizarBaseDatos } = require("./models/conexion");
const express = require("express");
const cors = require("cors");

const app = express();
const puerto = 3900;

app.use(cors());
// Convertir body de las peticiones a json
app.use(express.json());
// Recibir body de los formularios
app.use(express.urlencoded({ extended: true }));

const rutaAnimales = require("./routes/animales");

app.use("/api", rutaAnimales);

// Verificar la conexión y sincronizar la base de datos antes de iniciar el servidor
const iniciarServidor = async () => {
  try {
    await conexion(); // Verificar la conexión
    await sincronizarBaseDatos(); // Sincronizar la base de datos
    app.listen(puerto, () => {
      console.log("Servidor ejecutándose en puerto", puerto);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor =>", error);
  }
};

iniciarServidor();
