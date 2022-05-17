import React, { useEffect, useState } from "react"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext.js"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import YouTube from "react-youtube"
import swal from "sweetalert"
import { baseUrl } from "../utils/baseUrl.js"

const useWindowSize = () => {
  const [size, setSize] = useState([
    window.innerHeight / 2,
    window.innerWidth / 2,
  ])
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth])
    }
    window.addEventListener("resize", handleResize)
  }, [])
  return size
}

const MovieDetails = ({ movie }) => {
  const { user, setUser } = useUser()
  const token = sessionStorage.getItem("token")
  let sessUser = user

  const [corazon, setCorazon] = useState(null)

  const [showTrailer, setShowTrailer] = useState(false)
  const [videoId, setVideoId] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=e9e7cb266dc0d3f00bd94a93dae48419&language=en-US`
      )
      .then((res) => {
        setVideoId(res.data?.results[0].key)
      })
      .catch((err) => console.error(err))
  }, [movie])

  useEffect(() => {
    if (sessUser?.favoriteMovies?.includes(JSON.stringify(movie.id))) {
      setCorazon(
        <FontAwesomeIcon
          icon={faHeart}
          inverse
          className="favoriteIcon"
          size="2x"
          id="corazon-icon"
          style={{ color: "red" }}
        />
      )
    } else {
      setCorazon(
        <FontAwesomeIcon
          icon={faHeart}
          inverse
          className="favoriteIcon"
          size="2x"
          id="corazon-icon"
        />
      )
    }
  }, [sessUser, movie])

  const navigate = useNavigate()

  const authAxios = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const addToFavorite = () => {
    if (!sessUser) {
      swal({
        title: "Error ",
        text: "You have to be logged in to be able to mark a movie as a favorite",
        icon: "error",
        button: "I get it",
        timer: 2000,
      }).then(() => navigate("/user/login"))
      return
    }
    authAxios
      .post(`/user/favs/${sessUser.id}`, { movie })
      .then((res) => res.data)
      .then((obj) => {
        setUser(obj)
        localStorage.setItem("sess-user", JSON.stringify(obj))
      })
      .catch((err) => console.error(err))
  }

  const [height, width] = useWindowSize()

  if (!movie) return <p>Movie does not exist...</p>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.4 } }}
    >
      <div className="movieDetailsPage">
        <div className="singlemovieposter">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt="poster"
          />
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              position: "absolute",
              top: "40%",
              pointer: "true",
            }}
            onClick={() => setShowTrailer(!showTrailer)}
          >
            {showTrailer ? (
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="16x"
                style={{ fontSize: 80 }}
                className="iconoPlayTrailer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCirclePlay}
                size="16x"
                style={{ fontSize: 80 }}
                className="iconoPlayTrailer"
                color="lightblue"
              />
            )}
          </button>
        </div>

        <div className="header-poster">
          <div className="title&desc">
            <h1>
              {movie.title}
              <span className="releaseDate">({movie.release_date})</span>
            </h1>

            <span className="genres">
              {movie.genres ? (
                movie.genres.map((genre, i) => {
                  return <div key={i}>{genre.name}</div>
                })
              ) : (
                <p>Loading</p>
              )}
            </span>
          </div>

          <div className="actions" onClick={addToFavorite}>
            {corazon}
          </div>

          <div className="header-info">
            <h3 className="tagline">"{movie.tagline}"</h3>
            <h2 style={{ color: "white" }}>Overview</h2>
            <p
              style={{
                backgroundColor: "#070a1b",
                padding: 12,
                borderRadius: 6,
              }}
            >
              {movie.overview}
            </p>
          </div>
        </div>

        <div className="people"></div>
      </div>

      {showTrailer && (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <YouTube
            videoId={`${videoId}`}
            opts={{
              height: width < 800 ? height / 2 : height,
              width: width < 800 ? width * 2 : width,
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

export default MovieDetails
