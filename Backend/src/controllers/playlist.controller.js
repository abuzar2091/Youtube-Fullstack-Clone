// import mongoose, {isValidObjectId} from "mongoose"
const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");
const Playlist = require("../models/playlist.model.js");
const Video = require("../models/video.model.js");

const createPlaylist = wrapAsyncHandler(async (req, res) => {
  const { name, description, videos } = req.body;
  //TODO: create playlist
  if (!name) {
    throw new ApiError("Playlist name is required");
  }
  const playlist = await Playlist.create({
    name,
    description: description ? description : "",
    videos,
    owner: req.user?._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, playlist, "Created a playlist successfully!"));
});

const getUserPlaylists = wrapAsyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  console.log("user found");
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  //TODO: get user playlists

  const playlist = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(user._id), // Convert videoId to ObjectId
      },
    },
    {
      $lookup: {
        from: "playlists",
        localField: "_id",
        foreignField: "owner",
        as: "playlist",
        // pipeline: [
        //   {
        //     $lookup: {
        //       from: "videos",
        //       localField: "vidoes",
        //       foreignField: "_id",
        //       as: "playlistVideos",
        //     },
        //   },
        //     {
        //       $addFields: {
        //         playlistVideos: {
        //           $first: "$playlistVideos",
        //         },
        //       },
        //     },
        // ],
      },
    },
  ]);
  if (!playlist) {
    throw new ApiError("No playlist found corresponding to this username");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, playlist[0].playlist, "User Video playlist fetched"));
});

const getPlaylistById = wrapAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id
  if (!playlistId) {
    throw new ApiError("No playlist found corresponding to this id");
  }
  const playlist = await Playlist.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId), // Convert videoId to ObjectId
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "playlistVideos",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    channelName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, playlist[0], "Video playlist fetched"));
});

const addVideoToPlaylist = wrapAsyncHandler(async (req, res) => {
    // let playlist = await Playlist.findByIdAndUpdate(playlistId ,{$push:{videos:videoId}},{new : true}).populate('owner');
    const { selectedVideos, playlistId } = req.body;
    if (!playlistId || !selectedVideos) {
      throw new ApiError(
        "To add a video in playlist, you should provide both playlist and video ids"
      );
    }
    
    let playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      throw new ApiError("Playlist not found");
    }
  
    for (const videoId of selectedVideos) {
      if (playlist.videos.includes(videoId)) {
        throw new ApiError("This video is already in the playlist!");
      }
      playlist.videos.push(videoId);
    }
  
    await playlist.save();
    return res.status(200).json(new ApiResponse(200,playlist,"videos added successfully"));
  });
  



const removeVideoFromPlaylist = wrapAsyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  if (!playlistId || !videoId) {
    throw new ApiError(
      "To delete a video from playlist  you should provide both playlist and video ids"
    );
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError("Playlist not found");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError("Video not found");
  }
  let index = playlist.videos.indexOf(videoId);
  if (index === -1) {
    throw new ApiError(`The specified video is not in this playlist`);
  }
  // playlist.videos.splice(index ,1);
  // await playlist.save()

  //or

  playlist = await Playlist.findOneAndUpdate(
    { _id: playlistId },
    { $pull: { videos: videoId } },
    { new: true }
  );
  // console.log(playlistData)
  return res.status(200).json(200, playlist, "Video deleted from the playlist");
});

const deletePlaylist = wrapAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!playlistId) {
    throw new ApiError("To delete  playlist  you should provide playlist id");
  }
  await Playlist.findByIdAndDelete(playlistId);

  return res.status(204).json(204, {}, "Playlist has been deleted");
});

const updatePlaylist = wrapAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
  const localVideoFilePath = req.file?.path;
  if (!playlistId) {
    throw new ApiError("To update playlist you should provide playlist id");
  }
  if (!name && !localVideoFilePath) {
    throw new ApiError("To update playlist you should provide sufficient data");
  }
  let videoFile;
  if (localVideoFilePath) {
    videoFile = await uploadOnCloudinary(localVideoFilePath);
    if (!videoFile) {
      throw new ApiError(402, "videoFile is not uploded");
    }
  }
  const updatedObject = {
    name,
    description: description ? description : "", // Use provided description or empty string
  };
  if (videoFile) {
    updatedObject.videoFile = videoFile.url;
  }
  const playlist = await Playlist.findByIdAndUpdate(playlistId, updatedObject, {
    new: true,
  });
  return res
    .status(200)
    .json(200, playlist, "Playlist has been updated successfully");
});

module.exports = {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
