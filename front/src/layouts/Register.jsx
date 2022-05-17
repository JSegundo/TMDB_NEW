import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { baseUrl } from "../utils/baseUrl.js"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    let validEMail = /([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9_-]+)/gi.test(
      email
    )
    if (!validEMail) {
      setError("Email invalido!")
      return
    }
    let passwordValid = /^^(?=.?[A-Z])(?=.?[a-z]).{8,}$/.test(password)
    if (!passwordValid) {
      setError(
        "Contraseña invalida! debe tener minimo 8 caracteres y 1 mayuscula."
      )
      return
    }

    axios
      .post(`${baseUrl}/user/register`, { name, email, password })
      .then(() => {
        navigate("/user/login")
      })
      .catch((err) => console.error(err))
  }

  const handleChange = (e) => {
    if (e.target.name === "name") setName(e.target.value)
    if (e.target.name === "email") setEmail(e.target.value)
    if (e.target.name === "password") setPassword(e.target.value)
  }

  return (
    <motion.div
      className="containerLoginForm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.4 } }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type={"text"}
            name={"name"}
            placeholder={"name.."}
            required
            onChange={handleChange}
            value={name.value}
          />
        </div>
        <div>
          <label htmlFor="mail">Email</label>
          <input
            id="mail"
            type={"text"}
            name={"email"}
            placeholder={"email.."}
            required
            onChange={handleChange}
            value={email.value}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={"password"}
            name={"password"}
            placeholder={"password.."}
            required
            onChange={handleChange}
            value={password.value}
          />
        </div>
        {error && (
          <p
            style={{
              padding: 6,
              width: "fit-content",
              borderBottom: "2px solid red",
            }}
          >
            {error}
          </p>
        )}
        <div>
          <button className="registerbtn" type="submit">
            Register
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Register
