const { Router } = require("express");
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  getSubscribedChannels,
  getUserChannelSubscribers,
} = require("../controllers/subscription.controller.js");

const router = Router();
router.route("/get-user-subscribers").get(verifyJWT, getUserChannelSubscribers);
router
  .route("/get-user-subscribedchannels")
  .get(verifyJWT, getSubscribedChannels);

module.exports = router;
