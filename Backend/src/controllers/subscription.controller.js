const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");
const Subscription = require("../models/subscription.model.js");

const toggleSubscription = wrapAsyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError("Provide an appropriate Id");
  }
  const subscribed = await Subscription.findOne({
    subscriber: req.user?._id,
    channel: channelId,
  });
  if (subscribed) {
    await Subscription.findOneAndDelete({
      subscriber: req.user?._id,
      channel: channelId,
    });
    return res.status(200).json(new ApiResponse(200, {}, "channel unsubsribed"));
  } else {
    const subscribedChannel = await Subscription.create({
      subscriber: req.user?._id,
      channel: channelId,
    });
    return res.status(200).json(new ApiResponse(200, subscribedChannel, "channel unsubsribed"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = wrapAsyncHandler(async (req, res) => {s
  const { channelId } = req.params;
  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError("Invalid Id, Provide an appropriate Id");
  }
  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "Subscribers",
      },
    },
  ])
    .sort([["createdAt", "descending"]])
    .exec();

  return res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Total Subscribers of this channel fetched successfully"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = wrapAsyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!mongoose.isValidObjectId(subscriberId)) {
    throw new ApiError("Provide an appropriate Id");
  }
  const channels = await Subscription.aggregate([
    {
      $match: {
        subscriber: mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedChannels",
      },
    },
  ])
    .sort([["createdAt", "descending"]])
    .exec();

  return res
    .status(200)
    .json(new ApiResponse(200, channels, "Total Subscribed channels fetched successfully"));
});

module.exports = {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
};
