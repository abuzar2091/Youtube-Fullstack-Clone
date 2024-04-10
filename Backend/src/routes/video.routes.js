const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  publishAVideo,
  getVideoById,
  getAllVideos,
  updateVideo,
  deleteVideo,
  getChannelVideos,
} = require("../controllers/video.controller.js");

const router = Router();
router.route("/allvideos").get(
  // verifyJWT,
  getAllVideos
);
router
  .route("/publishvideo")
  .post(verifyJWT, upload.single("videoUrl"), publishAVideo);
router.route("/getvideo/:videoId").get(getVideoById);
router.route("/getchannelvideo/:username").get(getChannelVideos);
router.route("/update/:videoId").put(verifyJWT, updateVideo);

router.route("/delete/:videoId").put(verifyJWT, deleteVideo);
module.exports = router;
