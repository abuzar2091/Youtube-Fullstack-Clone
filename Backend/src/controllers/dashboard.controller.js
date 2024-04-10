const mongoose = require("mongoose");
const Video = require("../models/video.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");
const User = require("../models/user.model.js");

const getChannelStats = wrapAsyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    
    const  channelId = req.user?._id;
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
    ]).sort([["createdAt", "descending"]])
      .exec();

      const allVideos=await Video.aggregate([{
        $match:{
            owner:mongoose.Types.ObjectId(channelId)
        }
    },{
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"channelInfo"
        } 
    } ,
    {
        $unwind: "$channelInfo" // Unwind to destructure the array to individual documents
    },
    {
        $project: {
            // Project all fields from the video document
            video: "$$ROOT",
            // Project specific fields from the user document
            "channelInfo.fullName": 1,
            "channelInfo.username": 1,
            "channelInfo.avatar": 1
        }
    }
    ])

    const allVideoLikes=await Video.aggregate([{
        $match:{
            owner:mongoose.Types.ObjectId(channelId)
        }
    },{
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"channelInfo"
        } 
    } ,
    {
        $lookup:{
            from:"likes",
            localField:"_id",
            foreignField:"video",
            as:"likedVideo"
        } 
    } ,
   
    ])
    const allVideoViews = await Video.aggregate([
        {
            $match: {
                owner: mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $group: {
                _id: null, // Group by null to aggregate all documents
                totalViews: { $sum: "$views" } // Sum the views field from all documents
            }
        }
    ]);
    
    const stats = await Video.aggregate([
        {
            $match: {
                owner: mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$views" },
                totalVideos: { $sum: 1 }, // Count the number of videos
                totalLikes: { $sum: "$likes" } // Sum the likes field from all videos
            }
        }
    ]);
    const allsubscriber=await User.findById({ _id: channelId }). subscribersCount;

  
    return res
      .status(200)
      .json(new ApiResponse(200, {subscribers
    ,allVideos, allVideoLikes,allVideoViews}, "Total Subscribers of this channel fetched successfully"));
      });

const getChannelVideos = wrapAsyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
     const channelId=req.user?._id;
    //  const allvideos=await Video.find({owner:channelId});
    const allvideos=await Video.aggregate([{
        $match:{
            owner:mongoose.Types.ObjectId(channelId)
        }
    },{
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"channelInfo"
        } 
    } ,
    {
        $unwind: "$channelInfo" // Unwind to destructure the array to individual documents
    },
    {
        $project: {
            // Project all fields from the video document
            video: "$$ROOT",
            // Project specific fields from the user document
            "channelInfo.fullName": 1,
            "channelInfo.username": 1,
            "channelInfo.avatar": 1
        }
    }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200,allvideos,"All videos fetched"))

})

module.exports= {
    getChannelStats, 
    getChannelVideos
}