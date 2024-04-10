const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credential: true,
}));
app.use(express.json({ limit: "16kb" }));  //for form data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // for url  encoded data
app.use(express.static("public"));  // to serve static files css js
app.use(cookieParser());

 const userRouter=require('./routes/user.routes.js');
 const videoRouter=require('./routes/video.routes.js');
 const playlistRouter=require('./routes/playlist.routes.js');
 const commentRouter=require('./routes/comment.routes.js');
 const likeRouter=require('./routes/like.routes.js');
 const tweetRouter=require('./routes/tweet.routes.js');
 const dashboardRouter=require('./routes/dashboard.routes.js');
 const healthcheckRouter=require('./routes/healthcheck.routes.js');
app.use("/api/users",userRouter)
app.use("/api/tweet",tweetRouter)
app.use("/api/videos",videoRouter)
app.use("/api/playlist",playlistRouter);
app.use("/api/comment",commentRouter);
app.use("/api/like",likeRouter)
app.use("/api/dashboard",dashboardRouter)
app.use("/api/health",healthcheckRouter)
module.exports = {app};
