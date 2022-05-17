// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// const jwt = require("jsonwebtoken");

// app.post("/login", async (req, res, next) => {
//   const { name, password } = req.body;
//   if (name && password) {
//     // we get the user with the name and save the resolved promise
//     let user = await User.findOne({ where: { name } });
//     if (!user) {
//       res.status(401).json({ msg: "No such user found", user });
//     }
//     if (user.password === password) {
//       // from now on we’ll identify the user by the id and the id is
//       // the only personalized value that goes into our token
//       let payload = { id: user.id };
//       let token = jwt.sign(payload, jwtOptions.secretOrKey);
//       res.json({ msg: "ok", token: token });
//     } else {
//       res.status(401).json({ msg: "Password is incorrect" });
//     }
//   }
// });
