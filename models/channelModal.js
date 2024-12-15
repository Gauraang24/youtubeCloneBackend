const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: {
    type: String,
    default: "No description provided",
    required: true,
  },
  channelIcon: {
    type: String,
    required: true,
  },
  subscribers: { type: Number, default: 0 },
});

module.exports = mongoose.model("channel", channelSchema);
