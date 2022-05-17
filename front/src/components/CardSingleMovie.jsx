import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const CardSingleMovie = ({ movies }) => {
  if (!movies[0]) return <p>Loading data...</p>
  return (
    <>
      {movies?.map((movie) => {
        return (
          <Link key={movie.id} to={`/movies/singlemovie/${movie.id}`}>
            {movie.poster_path ? (
              <div className="cardMovie">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt="movie"
                />
                <div className="hoverinfo">
                  <h1 className="movie-title">{movie.title}</h1>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <FontAwesomeIcon
                      icon={faStar}
                      inverse
                      className="starIcon"
                      size="1x"
                      id="corazon-icon"
                    />
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </Link>
        )
      })}
    </>
  )
}

export default CardSingleMovie
