const express = require("express");
const {
  getChannel,
  createChannel,
} = require("../controllers/channelController");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

router.get("/:id", getChannel);
router.post("/", upload.single("channelIcon"), createChannel);

module.exports = router;
