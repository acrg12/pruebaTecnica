const express = require("express");
const router = express.Router();
const animalesControlador = require("../controllers/animales");

router.get("/listarAnimales/:busqueda", animalesControlador.listarAnimales);

module.exports = router;
