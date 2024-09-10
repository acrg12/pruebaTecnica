// controllers/animales.js
const Animales = require("../models/Animales");
const { Op } = require("sequelize");

const listarAnimales = async (req, res) => {
  try {
    const busqueda = req.params.busqueda;

    // Realiza la consulta usando Sequelize
    const consulta = await Animales.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${busqueda}%` } },
          { descripcion: { [Op.iLike]: `%${busqueda}%` } },
        ],
      },
    });

    if (consulta.length > 0) {
      return res.status(200).json({
        id: 200,
        Encabezado: "Correcto",
        mensaje: "Animal encontrado correctamente",
        respuesta: consulta,
      });
    } else {
      return res.status(404).json({
        id: 404,
        Encabezado: "No Encontrado",
        mensaje: "No se encontraron animales con esa búsqueda",
        respuesta: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      id: 500,
      Encabezado: "Error",
      mensaje: "Error de Consulta: " + error.message,
    });
  }
};

module.exports = {
  listarAnimales,
};
