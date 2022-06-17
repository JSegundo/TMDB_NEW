const Sequelize = require("sequelize")
require("dotenv").config()

// localhost
// const db = new Sequelize("TMDB", null, null, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

// DB HEROKU
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

db.authenticate()
  .then(() =>
    console.log("Connection to DATABASE has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database!!!!!", err))

module.exports = db
