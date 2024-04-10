const mongoose = require("mongoose");
const Comment = require("../models/comment.model.js");
const Video = require("../models/video.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");

const getVideoComments = wrapAsyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  if (!videoId) {
    throw new ApiError("To get video comment provide the video id");
  }

  const videoComment = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId), // Convert videoId to ObjectId
      },
    },
    {
      $lookup: {
        from: "comments", // Collection name
        localField: "_id", // Field in the video collection
        foreignField: "video", // Field in the users collection
        as: "videoComment", // Alias for the joined user information
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
                    fullName: 1,
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
  ])
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  return res
    .status(200)
    .json(
      new ApiResponse(200, videoComment, "Video comment fetched successfully")
    );
});

const addComment = wrapAsyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;
  if(!content){
    throw new ApiError("Do comment with some appropriate msg");
  }
  const comment = await Comment.create({
    content,
    owner: req.user?._id,
    video:videoId
  });
  comment.save();
  return res
  .status(201)
  .json(201,comment,"Comment added successfully")
});

const updateComment = wrapAsyncHandler(async (req, res) => {
  // TODO: update a comment
  const {commentId } = req.params;
  const { content } = req.body;
  if(!content){
    throw new ApiError("To update comment with some appropriate msg");
  }
  const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });

    if (!updatedComment) {
      throw new ApiError("Comment not found");
    }
    return res
    .status(201).json(new ApiResponse(201,updateComment,"Comment updated successfully"))
 
});

const deleteComment = wrapAsyncHandler(async (req, res) => {
  // TODO: delete a comment
  const {commentId } = req.params;

  
  const deletedComment= await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      throw new ApiError("Comment not found");
    }
    return res
    .status(201).json(new ApiResponse(201,{},"Comment deleted successfully"))
 
});

module.exports={
    getVideoComments, addComment, updateComment, deleteComment
}

