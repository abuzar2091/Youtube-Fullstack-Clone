const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");
const Video = require("../models/video.model.js");
const User = require("../models/user.model.js");
const Comment = require("../models/comment.model.js");

const getAllVideos = wrapAsyncHandler(async (req, res) => {
  const videos = await Video.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerInfo",
      },
    },
    // {
    //   $addFields: {
    //     avatar: { $arrayElemAt: ["$ownerInfo.avatar", 0] }, // Add avatar field from ownerInfo array
    //   },
    // },
    // {
    //   $project: {
    //     ownerInfo: 0 // Exclude ownerInfo object
    //   }
    // }
  ]);
  res.status(200).json(
    new ApiResponse(
      200,
      {
        videos,
      },
      "Successfully fetched videos."
    )
  );
});
// const getAllVideos = wrapAsyncHandler(async (req, res) => {
//   //const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
//   const page = 1,
//     limit = 10,
//     query = "",
//     sortBy = "",
//     sortType = "";

//   // Constructing the query object based on the query parameter
//   const queryObject = query ? { $text: { $search: query } } : {};

//   // If userId is provided, add it to the query to filter videos by owner
//   // if (userId && mongoose.Types.ObjectId.isValid(userId)) {
//   //   queryObject.owner = mongoose.Types.ObjectId(userId);
//   // }

//   // Constructing the sort object based on the sortBy and sortType parameters
//   const sortObject = sortBy ? { [sortBy]: sortType === "desc" ? -1 : 1 } : {};

//   // Finding videos based on the constructed query object, applying pagination and sorting
//   const videos = await Video.find(queryObject)
//     .sort(sortObject)
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit));

//   // Counting total videos to calculate pagination metadata
//   const totalVideos = await Video.countDocuments(queryObject);

//   // Sending the response with videos and pagination metadata
//   res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           videos,
//           totalPages: Math.ceil(totalVideos / limit),
//           currentPage: parseInt(page),
//         },
//         "Successfully fetched videos."
//       )
//     );
// });

const publishAVideo = wrapAsyncHandler(async (req, res) => {
  const { title, description, videotags } = req.body;
  // TODO: get video, upload to cloudinary
  // get the title, description
  const tags = videotags.split(",").map((tag) => tag.trim());
console.log("come");
  if (!title) {
    throw new ApiError("Set the title of Video");
  }

  const localVideoFilePath = req.file?.path;
  if (!localVideoFilePath) {
    throw new ApiError(400, "VideoFile is required");
  }
  const videoFile = await uploadOnCloudinary(localVideoFilePath);
  if (!videoFile) {
    throw new ApiError(400, "videoFile is not uploded");
  }
  console.log("url",videoFile);

  const createdVideo = await Video.create({
    title,
    description: description || "",
    videoUrl: videoFile.url,
    tags,
    owner: req.user?._id,
    duration: Math.floor(videoFile.duration),
  });
  if (!createdVideo) {
    throw new ApiError(500, "Something went wrong while uploading the video");
  }
  res
    .status(201)
    .json(new ApiResponse(200, createdVideo, "Video Uploaded Successfully"));
});
const getChannelVideos = wrapAsyncHandler(async (req, res) => {
  const { username } = req.params;
  console.log(username);
  // console.log("user name inside video fetch ",username);
  const user=await User.findOne({username});
  // console.log("come here",user);
  if(!user){
    throw new ApiError(404,"User did not find with this username");
  }
  const allChannelVideos = await Video.aggregate([
    {
     
          $match: {
            owner: new mongoose.Types.ObjectId(user._id), // Convert videoId to ObjectId
          },
      
      }
    
  ]).sort("-createdAt");
  if (!allChannelVideos) {
    return ApiError("No video Found");
  }
  // console.log(allChannelVideos);
  return res
    .status(200)
    .json(new ApiResponse(200, allChannelVideos, "Channel Video fetched"));
});
const getVideoById = wrapAsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  console.log(videoId);
  //first method
  //const video = await Video.findById(videoId).populate("owner", "-refreshToken -password");
  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId), // Convert videoId to ObjectId
      },
    },
    {
      $lookup: {
        from: "users", // Collection name
        localField: "owner", // Field in the video collection
        foreignField: "_id", // Field in the users collection
        as: "ownerInfo", // Alias for the joined user information
      },
    },
    {
      $project: {
        // Project only necessary fields from the ownerInfo
        "ownerInfo.password": 0,
        "ownerInfo.refreshToken": 0,
      },
    },
  ]);
  if (!video) {
    return next(new ApiError(404, "No video with this ID found"));
  }
  return res.json(new ApiResponse(200, video, "Video Successflly fetched"));
});

const updateVideo = wrapAsyncHandler(async (req, res) => {
  //TODO: update video details like title, description, thumbnail
  const { videoId } = req.params;
  const localVideoFilePath = req.file?.path;
  const { title, description, thumbnail } = req.body;
  if (!title || !description || !thumbnail) {
    throw new ApiError(404, "No Data is found for updation");
  }
  let videoFile;
  if (localVideoFilePath) {
    videoFile = await uploadOnCloudinary(localVideoFilePath);
    if (!videoFile) {
      throw new ApiError(402, "videoFile is not uploded");
    }
  }
  const updatedObject = {
    title,
    description,
    thumbnail, // Use provided description or empty string
  };
  if (videoFile) {
    updatedObject.videoFile = videoFile.url;
  }

  const video = await Video.findByIdAndUpdate(videoId, updatedObject, {
    new: true,
  });
  return res.status(200).json(new ApiResponse(200, video, "Video updated"));
});

const deleteVideo = wrapAsyncHandler(async (req, res) => {
  //TODO: delete video
  const { videoId } = req.params;

  // Delete the video
  const video = await Video.findByIdAndDelete(videoId);
  console.log(video);
  // Delete comments associated with the video
  await Comment.deleteMany({ video: videoId });

  // Update user watch history to remove the deleted video
  await User.updateMany(
    { watchHistory: { $elemMatch: { video: videoId } } },
    { $pull: { watchHistory: { video: videoId } } }
  );

  return res.status(200).json(new ApiResponse(200, video, "Video deleted"));
});

const togglePublishStatus = wrapAsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  let video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found for toggling");
  }

  video.isPublished = !video.isPublished;
  video = await Video.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, video, "publish status changed"));
});

module.exports = {
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  getAllVideos,
  getChannelVideos,
};
