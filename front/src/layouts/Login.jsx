import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useUser } from "../context/UserContext.js"
import { baseUrl } from "../utils/baseUrl.js"
const Login = () => {
  const { setUser, setToken } = useUser()

  const [email, setEmail] = useState({})
  const [password, setPassword] = useState({})
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value)
    if (e.target.name === "password") setPassword(e.target.value)
  }
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setError(null)

    e.preventDefault()
    try {
      const result = await axios.post(`${baseUrl}/user/login`, {
        email,
        password,
      })
      localStorage.setItem("sess-user", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setUser(result.data.user)
      navigate("/")
    } catch (err) {
      setError("Your email or password were incorrect.")
    }
  }

  return (
    <motion.div
      className="containerLoginForm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.4 } }}
    >
      <form onSubmit={handleSubmit} method="post">
        {/* <div> */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          autoComplete="email"
          placeholder="email"
          required
          autoFocus
          onChange={handleChange}
          value={email.value}
        />

        <label htmlFor="current-password">Password</label>
        <input
          id="current-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="******"
          required
          autoFocus
          onChange={handleChange}
          value={password.value}
        />
        {/* </div> */}
        <div classname="container-buttons">
          <button type="submit" className="loginbtn">
            Sign in
          </button>
          {/* <button className="loginbtn">Sign in with Google</button> */}
          <Link to={"/user/register"} className="registerbtn">
            <p>Create an account.</p>
          </Link>
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
      </form>
    </motion.div>
  )
}

export default Login
