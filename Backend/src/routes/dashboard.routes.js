const { Router } = require("express");
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  getChannelStats,
  getChannelVideos,
} = require("../controllers/dashboard.controller.js");

const router = Router();
router.route("/getchannelstats").get(verifyJWT, getChannelStats);
router.route("/getchannelvideos").get(verifyJWT, getChannelVideos);

module.exports = router;
