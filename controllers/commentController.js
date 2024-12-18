const Comment = require("../models/commentModel"); // Updated import
const mongoose = require("mongoose");

// API for Fetching all comments by videoId
exports.getComments = async (req, res) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ videoId }).populate("userId", "name"); // Populate to get user details if needed
    res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
      status: false,
    });
  }
};

// API for Adding a new comment
exports.addComment = async (req, res) => {
  const { userId, comment, videoId } = req.body;

  try {
    const newComment = new Comment({ userId, comment, videoId });
    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      data: newComment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
      status: false,
    });
  }
};

// API for Editing a comment
exports.editComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: "Comment not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Comment updated successfully",
      data: updatedComment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update comment",
      error: error.message,
      status: false,
    });
  }
};

// API for Deleting a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({
        message: "Comment not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      data: deletedComment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete comment",
      error: error.message,
      status: false,
    });
  }
};
