const mongoose = require("mongoose");
const Like = require("../models/like.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");

const toggleVideoLike = wrapAsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;
  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError("Provide an appropriate video id");
  }

  // Check if the user has already liked the video
  const like = await Like.findOne({ video: videoId, likedBy: userId });

  if (like) {
    // User has already liked the video, so remove the like
    await Like.findOneAndDelete({ video: videoId, likedBy: userId });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Like removed successfully"));
  } else {
    // User hasn't liked the video, so add the like
    const newLike = await Like.create({
      video: videoId,
      likedBy: userId,
    });

    await newLike.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newLike, "Like added successfully"));
  }
});

const toggleCommentLike = wrapAsyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!mongoose.isValidObjectId(commentId)) {
    throw new ApiError("Provide an appropriate comment id");
  }
  const userId = req.user._id;

  const like = await Like.findOne({ comment: commentId, likedBy: userId });

  if (like) {
    await Like.findOneAndDelete({ comment: commentId, likedBy: userId });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment Like removed successfully"));
  } else {
    const newLike = await Like.create({
      comment: commentId,
      likedBy: userId,
    });

    await newLike.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newLike, "Comment Like added successfully"));
  }
});

const toggleTweetLike = wrapAsyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!mongoose.isValidObjectId(tweetId)) {
    throw new ApiError("Provide an appropriate tweet id");
  }
  const userId = req.user._id;

  const like = await Like.findOne({ tweet: tweetId, likedBy: userId });

  if (like) {
    await Like.findOneAndDelete({ tweet: tweetId, likedBy: userId });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Tweet Like removed successfully"));
  } else {
    const newLike = await Like.create({
      tweet: tweetId,
      likedBy: userId,
    });

    await newLike.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newLike, "Tweet Like added successfully"));
  }
});

const getLikedVideos = wrapAsyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user?._id;

  const likedVideo = await Like.aggregate([
    {
      $match: {
        likedBy: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideo",
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideo, "Successfully fetched the Liked Videos")
    );
});

module.exports = {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
};
