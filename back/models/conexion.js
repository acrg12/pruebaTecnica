const { Sequelize } = require("sequelize");

// Configuración de la base de datos
const dbConfig = {
  database: "prueba",
  username: "postgres",
  password: "12345",
  host: "localhost",
  dialect: "postgres",
};

// Crear instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Cambia a true si quieres ver los logs de las consultas
  }
);

// Función que verifica la conexión
const conexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a PostgreSQL con Sequelize");
  } catch (error) {
    console.error("Error en la conexión =>", error);
    throw new Error("No se ha podido conectar a la Base de datos!");
  }
};

// Sincronizar la base de datos con los modelos
const sincronizarBaseDatos = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.error("Error al sincronizar la base de datos =>", error);
  }
};

// Exportar los elementos necesarios
module.exports = {
  conexion,
  sincronizarBaseDatos,
  sequelize, // Asegúrate de exportar la instancia de Sequelize
};
