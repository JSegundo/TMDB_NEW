import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardSingleTvshow from "../components/CardSingleTvshow"
import { motion } from "framer-motion"
import { baseUrl } from "../utils/baseUrl.js"

const TopTvShowsContainer = () => {
  const [tvshows, setTvshows] = useState({})
  const { options } = useParams()

  useEffect(() => {
    axios.get(`${baseUrl}/tvshow/${options}`).then((obj) => {
      setTvshows(obj.data.results)
    })
  }, [options])

  return (
    <motion.div
      className="container-movies"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.4 } }}
    >
      <CardSingleTvshow tvshows={tvshows} />
    </motion.div>
  )
}

export default TopTvShowsContainer
