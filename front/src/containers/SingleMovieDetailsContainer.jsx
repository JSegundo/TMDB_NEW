import React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import MovieDetails from "../components/MovieDetails"
import { baseUrl } from "../utils/baseUrl.js"

const SingleMovieDetailsContainer = () => {
  const [movie, setMovie] = React.useState({})
  const { movieid } = useParams()

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/movies/singlemovie/${movieid}`)
      .then((response) => {
        setMovie(response.data)
      })
      .catch((err) => console.error(err))
  }, [movieid])

  return <MovieDetails movie={movie} />
}

export default SingleMovieDetailsContainer
