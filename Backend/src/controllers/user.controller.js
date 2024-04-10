const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const wrapAsyncHandler = require("../utils/wrapAsyncHandler.js");
const jwt = require("jsonwebtoken");

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findOne(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false }); //To bypass the validations for token generation
  return { accessToken, refreshToken };
};

const registerUser = wrapAsyncHandler(async (req, res, next) => {
  //   //get the user info from frontend
  //   //perform validation--not empty
  //   //check if user already exits:username ,email
  //   // get the local url and store it on the cloudinary
  //   // create user obj and save in db
  //   //remove password and refresh token from the respone
  //   //check for the user creation
  //   //return respone
  console.log(req.body);
  console.log("lets start");

  const { username, email, password, fullName } = req.body;
  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const exitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (exitedUser) {
    throw new ApiError(409, "User with username or email already exits");
  }
  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath = "";
  if (req.files && req.files.coverImage && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files?.coverImage[0]?.path || "";
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  console.log(avatar);
  if (!avatar) {
    throw new ApiError(400, "Avatar is not uploaded");
  }
  //const coverImage = "";
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findOne(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser },
        "User Registered Successfully"
      )
    );
});

const loginUser = wrapAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //const username="abuzar.aaas",email="ali@dgmail.coma",password="12341d";
  console.log(email, password);
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const user = await User.findOne({
    $or: [{ email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exits do signup first");
  }
  //console.log(user);
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentails");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findOne(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { loggedInUser }, "User Logged In Successfully")
    );
});

const logoutUser = wrapAsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
      //   or
      //   $set: { refreshToken: null },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully!"));
});

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized token");
  }
  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decodedToken) {
      throw new ApiError(400, "Unauthorized token");
    }
    const user = await User.findById(decodedToken._id);
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(400, "refresh token expired");
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Tokens are refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      error?.message || "something happening wrong invalid refresh token"
    );
  }
};

const changeCurrentPassword = wrapAsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "Current User is not login");
  }
  const currPassword = await user.isPasswordCorrect(oldPassword);

  if (!currPassword) {
    throw new ApiError(400, "Invalid password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, {}, "Password Changed"));
});

const getCurrentUser = wrapAsyncHandler((req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current User fetched Successfully"));
});

const updateAccountDetails = wrapAsyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or email required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { username, email },
    },
    {
      new: true,
    }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Account detail updated"));
});

const updateUserAvatar = wrapAsyncHandler((req, res) => {
  const localAvatarPath = req.file?.path;
  if (localAvatarPath) {
    throw new ApiError(404, "Avatar is not found");
  }
  const avatar = uploadOnCloudinary(avatarLocalPath);
  const user = User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Image Updated"));
});
const updateUserCoverImage = wrapAsyncHandler((req, res) => {
  const localCoverImagePath = req.file?.path;
  if (localCoverImagePath) {
    throw new ApiError(404, "Avatar is not found");
  }
  const coverImagePath = uploadOnCloudinary(localCoverImagePath);
  const user = User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImagePath.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover Image Updated"));
});

const getUserChannelProfile = wrapAsyncHandler(async (req, res) => {
  const { username } = req.params;
  console.log(username);
  if (!username?.trim()) {
    throw new ApiError(404, "Username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        channelName: 1,
        username: 1,
        email: 1,
        channelsSubscribedToCount: 1,
        subscribersCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel does not exit");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, channel[0], "User channel fetched"));
});

const getUserWatchHistory = wrapAsyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
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
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, user[0].watchHistory, "User watch History fetched")
    );
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateAccountDetails,
  getCurrentUser,
  updateUserCoverImage,
  updateUserAvatar,
  changeCurrentPassword,
  getUserWatchHistory,
  getUserChannelProfile,
};
