const Sequelize = require("sequelize");

const db = new Sequelize("TMDB", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

db.authenticate()
  .then(() =>
    console.log("Connection to DATABASE has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database!!!!!", err));

// EJEMPLO DE CONEXION A DB
// const db = new Sequelize("postgres://localhost:5432/sep", {
//   logging: false,
// });

module.exports = db;
