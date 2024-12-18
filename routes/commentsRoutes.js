const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

// Fetch all comments by videoId
router.get("/:videoId", getComments);

// Add a new comment
router.post("/", addComment);

// Edit a comment by commentId
router.put("/:commentId", editComment);

// Delete a comment by commentId
router.delete("/:commentId", deleteComment);

module.exports = router;
