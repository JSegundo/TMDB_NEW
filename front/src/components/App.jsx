import React, { useEffect } from "react"
// import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom"

import TopMoviesContainer from "../containers/TopMoviesContainer"
import TopTvShowsContainer from "../containers/TopTvShowsContainer"
import SingleMovieDetailsContainer from "../containers/SingleMovieDetailsContainer"
import SingleTvshowDetailsContainer from "../containers/SingleTvshowDetailsContainer"

import Navbar from "../layouts/Navbar"
import Home from "../layouts/HeroHome"
import Login from "../layouts/Login"
import Register from "../layouts/Register"
import UserProfile from "../layouts/UserProfile"
import Footer from "../layouts/Footer"

import { useUser } from "../context/UserContext.js"

import { AnimatePresence } from "framer-motion"

const App = () => {
  const { user, setUser } = useUser()
  let sessUser = JSON.parse(localStorage.getItem("sess-user"))

  useEffect(() => {
    if (!sessUser) return
    setUser(sessUser)
  }, [])

  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/tvshow/:options" element={<TopTvShowsContainer />} />
          <Route path="/movies/:filterby" element={<TopMoviesContainer />} />
          <Route
            path="/movies/singlemovie/:movieid"
            element={<SingleMovieDetailsContainer />}
          />
          <Route
            path="/tvshow/tv/:showid"
            element={<SingleTvshowDetailsContainer />}
          />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
