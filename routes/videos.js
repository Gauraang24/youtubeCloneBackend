const express = require("express");
const {
  getVideos,
  uploadVids,
  removeVideo,
} = require("../controllers/videoController");
const multer = require("multer");

// Configure Multer for file uploads
// const upload = multer({ dest: "uploads/" }); // Temporary folder for storing uploaded files

const router = express.Router();

// Routes
router.get("/", getVideos); // Fetch all videos
// router.post("/upload", upload.single("video"), uploadVids); // Upload a new video
// router.delete("/video/:id", removeVideo); // Delete a video by ID

module.exports = router;
