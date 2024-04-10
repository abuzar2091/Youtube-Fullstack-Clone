const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
  videos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video"
  }],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true});

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;

//add plugin to enable pagination for aggregation queries


