const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/conexion"); // Asegúrate de que la ruta sea correcta

const Animales = sequelize.define(
  "Animales",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "animales",
    timestamps: false,
  }
);

module.exports = Animales;
