const express = require("express")
const app = express()
const db = require("./db")
const routes = require("./routes")
const cors = require("cors")
const volleyball = require("volleyball")

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(volleyball)
app.use(express.json())
app.use("/api", routes)

app.get("/", (req, res) => {
  res.send("hola!!!!!!!!!! RUTA PRINCIPAL del backend.")
})

const PORT = process.env.PORT || 3001
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON http://localhost:${PORT}`)
  })
})
