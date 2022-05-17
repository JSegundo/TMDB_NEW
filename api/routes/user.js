const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const checkJwt = require("../middlewares/jwt")

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  let user = await User.findOne({ where: { email } })
  if (user) {
    return
    // res.redirect("/user/register");
  } else {
    User.create({ name, email, password })
      .then((user) => {
        res.status(201).send(user)
      })
      .catch((err) => console.error(err))
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  // console.log(email, password);
  if (email && password) {
    let user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).json({ msg: "No such user found", user })
      return
    }

    let hash = await user.hasher(password, user.salt)
    if (hash !== user.password) {
      console.log("las contras son incorrecaas")
      res.status(401).json({ msg: "Password is incorrect" })
      return
    } else {
      let payload = { id: user.id }
      let token = jwt.sign(payload, "asd")
      console.log(token)
      res.json({ msg: "ok", token: token, user: user })
    }
  }
})

router.post("/logout", (req, res) => {
  res.sendStatus(200)
})

router.post("/favs/:userid", checkJwt, (req, res) => {
  User.findByPk(req.params.userid)
    .then((user) => {
      let arr = user.favoriteMovies === null ? [] : user.favoriteMovies
      console.log(arr)
      if (arr.includes(String(req.body.movie.id))) {
        arr.splice(arr.indexOf(String(req.body.movie.id)), 1)
      } else {
        arr.push(String(req.body.movie.id))
      }
      return arr
    })
    .then((data) =>
      User.update(
        { favoriteMovies: data },
        { returning: true, where: { id: req.params.userid } }
      )
    )
    .then(([rowsUpdate, [updatedUser]]) => res.send(updatedUser))
})

module.exports = router
