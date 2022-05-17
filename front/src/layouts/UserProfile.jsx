import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { baseUrl } from "../utils/baseUrl.js"

import axios from "axios"
const UserProfile = () => {
  let sessUser = JSON.parse(localStorage.getItem("sess-user"))
  const [favMovies, setFavMovies] = useState([])

  useEffect(() => {
    getFavMovies()
  }, [])

  const getFavMovies = async () => {
    let results = []
    results =
      sessUser?.favoriteMovies !== null
        ? await Promise.all(
            sessUser?.favoriteMovies?.map((movieid) => {
              return axios
                .get(`${baseUrl}/movies/singlemovie/${movieid}`)
                .then((obj) => {
                  return obj.data
                })
            })
          )
        : []

    setFavMovies(results)
  }

  const navigate = useNavigate()

  return (
    <motion.div
      className="user-profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.4 } }}
    >
      {sessUser?.id ? (
        <>
          <header
            className="user-header"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div>
              <h1>Welcome, {sessUser.name}</h1>
              <p>
                Member since{" "}
                {sessUser.createdAt.split("T")[0].split("-").join("/")}
              </p>
            </div>
          </header>
          <div className="favorite-movies">
            <div className="favorites-title">
              <h2>Your favorite movies:</h2>
            </div>
            <div className="favs-container">
              {favMovies?.map((movie, i) => {
                return (
                  <a href={`/movies/singlemovie/${movie.id}`} key={i}>
                    <div className="div-container">
                      <h3>{movie.title}</h3>
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        alt="movie favorite"
                        height="350px"
                      ></img>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>You have to log your account. </h1>
          <button onClick={() => navigate("/user/login")}>
            Go to Login page
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default UserProfile
