const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
