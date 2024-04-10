const { Router } = require("express");
const verifyJWT = require("../middlewares/auth.middleware.js");
const { getLikedVideos } = require("../controllers/like.controller.js");

const router = Router();
router.route("/getlikedvideo").get(verifyJWT, getLikedVideos);


module.exports = router;