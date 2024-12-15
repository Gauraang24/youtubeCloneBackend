const channel = require("../models/channelModal");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userModal");

exports.getChannel = async (req, res) => {
  try {
    const channelId = req.params.id;

    const channelInfo = await channel.findById(channelId);

    if (!channelInfo) {
      return res.status(404).json({
        message: "Channel not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Channel fetched successfully",
      status: true,
      data: channelInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch channel",
      error: error.message,
      status: false,
    });
  }
};

exports.createChannel = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    const channelIcon = req.file;

    if (!userId || !name || !channelIcon || !description) {
      return res.status(400).json({
        message: "userId, name, description, and channelIcon are required",
        status: false,
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    // Check if channel already exists for the user
    const channelExist = await channel.findOne({ userId });
    if (channelExist) {
      return res.status(409).json({
        message: "Channel already exists for this user",
        status: false,
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(channelIcon.path, {
      folder: "channels",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });

    const channelIconUrl = uploadResponse.secure_url;

    const newChannel = new channel({
      userId,
      name,
      description,
      channelIcon: channelIconUrl,
    });

    const savedChannel = await newChannel.save();

    res.status(201).json({
      message: "Channel created successfully",
      status: true,
      data: savedChannel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create channel",
      error: error.message,
      status: false,
    });
  }
};
