const express = require("express");
const router = express.Router();

const moviesRouter = require("./movies");
const usersRouter = require("./user");
const tvshowsRouter = require("./tvshows");

router.use("/tvshow", tvshowsRouter);
router.use("/movies", moviesRouter);
router.use("/user", usersRouter);

module.exports = router;
