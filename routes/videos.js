const express = require("express");
const { getVideos, getVideoById } = require("../controllers/videoController");

const router = express.Router();

// Routes
router.get("/", getVideos); // Fetch all videos
router.get("/:id", getVideoById); //Fetch by id

module.exports = router;
