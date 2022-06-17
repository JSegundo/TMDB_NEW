const express = require("express")
const app = express()
const db = require("./db")
const routes = require("./routes")
const cors = require("cors")
const volleyball = require("volleyball")
const path = require("path")

app.use(cors())

app.use(express.static(path.join(__dirname, "..", "/front/build")))

app.use(volleyball)
app.use(express.json())
app.use("/api", routes)

app.get("/api", (req, res) => {
  res.send("hola! RUTA PRINCIPAL del backend.")
})

const PUERTO = process.env.PORT || 3001

db.sync({ force: false }).then(() => {
  console.log("database sync")
})

app.listen(PUERTO, () => {
  console.log(`SERVER LISTENING ON http://localhost:${PUERTO}`)
})
