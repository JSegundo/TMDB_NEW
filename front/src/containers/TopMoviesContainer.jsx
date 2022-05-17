import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardSingleMovie from "../components/CardSingleMovie"
import { motion } from "framer-motion"
import { baseUrl } from "../utils/baseUrl.js"

const TopMoviesContainer = () => {
  const [movies, setMovies] = useState({})
  const { filterby } = useParams()

  useEffect(() => {
    axios.get(`${baseUrl}/movies/${filterby}`).then((obj) => {
      setMovies(obj.data.results)
    })
  }, [filterby])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.4 } }}
      className="container-movies"
    >
      <CardSingleMovie movies={movies} />
    </motion.div>
  )
}

export default TopMoviesContainer
