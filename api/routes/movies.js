const axios = require("axios");
const express = require("express");
const router = express.Router();
const API = "https://api.themoviedb.org/3";
const apiKEY = "api_key=e9e7cb266dc0d3f00bd94a93dae48419";

//populares
router.get("/popular", (req, res) => {
  axios
    .get(`${API}/movie/popular?${apiKEY}&language=en-US`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

router.get("/top_rated", (req, res) => {
  axios
    .get(`${API}/movie/top_rated?${apiKEY}&language=en-US&page=1`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

router.get("/upcoming", (req, res) => {
  axios
    .get(`${API}/movie/upcoming?${apiKEY}&language=en-US&page=1`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});
// single movie
router.get("/singlemovie/:movieid", (req, res) => {
  axios
    .get(`${API}/movie/${req.params.movieid}?${apiKEY}&language=en-US`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
