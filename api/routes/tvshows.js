const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKEY = "api_key=e9e7cb266dc0d3f00bd94a93dae48419";
const API = "https://api.themoviedb.org/3";

router.get("/popular", (req, res) => {
  axios
    .get(`${API}/tv/popular?${apiKEY}&language=en-US&page=1`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

router.get("/airingtoday", (req, res) => {
  axios
    .get(`${API}/tv/airing_today?${apiKEY}&language=en-US&page=1`)
    .then((response) => res.json(response.data))
    .catch((err) => console.error(err));
});

router.get("/toprated", (req, res) => {
  axios
    .get(`${API}/tv/top_rated?${apiKEY}&language=en-US&page=1`)
    .then((response) => res.json(response.data))
    .catch((err) => console.error(err));
});

router.get("/ontv", (req, res) => {
  axios
    .get(`${API}/tv/on_the_air?${apiKEY}&language=en-US&page=1`)
    .then((response) => res.json(response.data))
    .catch((err) => console.error(err));
});

// single tvshow
router.get("/tv/:showid", (req, res) => {
  axios
    .get(`${API}/tv/${req.params.showid}?${apiKEY}&language=en-US`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
