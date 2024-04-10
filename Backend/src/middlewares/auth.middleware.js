const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");
const User = require("../models/user.model.js");

const verifyJWT = wrapAsyncHandler(async (req,_, next) => {
  try {
      // console.log("verifying",req.cookies);
    const token =req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request jsonweb token not found");
    }
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
     const user= await User.findById(decodedToken?._id).select("-password -refreshToken");
     if(!user){
      throw new ApiError(404,"Invalid Access Token, User not found!");
     }
     req.user= user;
     console.log("verified done!",req.user);
      next();
  } catch (error) {
    throw new ApiError(404, error?.message || "Invalid access Token");
  }
});

module.exports=verifyJWT
