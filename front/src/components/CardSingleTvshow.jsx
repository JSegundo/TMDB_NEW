import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const CardSingleTvshow = ({ tvshows }) => {
  if (!tvshows[0]) return <p>Loading data...</p>

  return (
    <>
      {tvshows.map((show) => {
        return show.poster_path ? (
          <Link to={`/tvshow/tv/${show.id}`} key={show.id}>
            <div className="cardMovie" key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
                alt="tvshow"
              />

              <div className="hoverinfo">
                <h1 className="movie-title">{show.name}</h1>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <FontAwesomeIcon
                    icon={faStar}
                    inverse
                    className="starIcon"
                    size="1x"
                    id="corazon-icon"
                  />
                  <p>{show.vote_average}</p>
                </div>
              </div>
            </div>
          </Link>
        ) : null
      })}
    </>
  )
}

export default CardSingleTvshow
