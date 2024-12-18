const Video = require("../models/videoModal"); // Import the Video model
const mongoose = require("mongoose");

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      data: videos,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch videos",
      error: error.message,
      status: false,
    });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;

    // Validate videoId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID format",
        status: false,
      });
    }

    // Fetch video by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
        status: false,
      });
    }

    // Fetch related comments
    const comments = await Comment.find({ videoId }).populate("userId", "name"); // Populate user details if needed

    res.status(200).json({
      message: "Video fetched successfully.",
      status: true,
      data: { video, comments },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch video",
      error: error.message,
      status: false,
    });
  }
};

// Upload a new video
// exports.uploadVids = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const videoFile = req.file;

//     if (!videoFile) {
//       return res.status(400).json({ message: "No video file uploaded" });
//     }

//     // Upload video to Cloudinary
//     const uploadedVideo = await cloudinary.uploader.upload(videoFile.path, {
//       resource_type: "video",
//       folder: "youtube-clone-videos",
//     });

//     // Save video details to MongoDB
//     const newVideo = new Video({
//       title,
//       description,
//       videoUrl: uploadedVideo.secure_url,
//     });

//     await newVideo.save();
//     res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to upload video", error: error.message });
//   }
// };

// // Remove a video
// exports.removeVideo = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const video = await Video.findById(id);
//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     // Extract public_id from video URL to delete it from Cloudinary
//     const publicId = video.videoUrl.split("/").pop().split(".")[0];
//     await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

//     await Video.findByIdAndDelete(id);

//     res.status(200).json({ message: "Video deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete video", error: error.message });
//   }
// };
