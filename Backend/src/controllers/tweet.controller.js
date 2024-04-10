const mongoose = require("mongoose");
const Comment = require("../models/comment.model.js");
const Tweet = require("../models/tweet.model.js");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");

const createTweet = wrapAsyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;
  console.log(req.body);
  if (!content) {
    throw new ApiError("Do tweet with some appropriate msg");
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user?._id,
  });
  console.log(tweet);
  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet added successfully"));
});

const getUserTweets = wrapAsyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User did not find with this username");
  }

  const allUserTweet = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "_id",
        foreignField: "owner",
        as: "userTweet",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      $project: {
        _id: 1,
        userData: {
          $arrayElemAt: ["$userInfo", 0],
        },
        userTweet: 1,
      },
    },
    {
      $project: {
        _id: 1,
        channelName: "$userData.channelName",
        avatar: "$userData.avatar",
        userTweet: 1,
      },
    },
  ]);
  if (allUserTweet.length === 0 || !allUserTweet[0].userTweet) {
    throw new ApiError("No tweets found for the user");
  }
  // console.log("all tweet ",allUserTweet);
  return res
    .status(200)
    .json(
      new ApiResponse(200, allUserTweet[0], "all tweet fetched successfully")
    );
});

const updateTweet = wrapAsyncHandler(async (req, res) => {
  //TODO: update tweet
  const { tweetId } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new ApiError("To update comment with some appropriate msg");
  }
  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content },
    { new: true }
  );

  if (!updatedTweet) {
    throw new ApiError("Tweet not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = wrapAsyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;

  const deletedTweet = await Comment.findByIdAndDelete(tweetId);

  if (!deletedTweet) {
    throw new ApiError("Tweet not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Tweet deleted successfully"));
});

module.exports = {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
};
