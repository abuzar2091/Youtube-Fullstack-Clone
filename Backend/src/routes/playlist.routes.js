const { Router } = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getPlaylistById,
  getUserPlaylists,
  deletePlaylist,
  updatePlaylist,
} = require("../controllers/playlist.controller.js");
const router = Router();
router.route("/create-playlist").post(verifyJWT, createPlaylist);
router.route("/addvideotoplaylist").post(verifyJWT,addVideoToPlaylist);
router.route("/remove-video/:videoId").put(verifyJWT, removeVideoFromPlaylist);
router.route("/getplaylistvideo/:playlistId").get(verifyJWT, getPlaylistById);
router.route("/getuserplaylistvideo/:username").get(verifyJWT, getUserPlaylists);
router.route("/delete/:playlistId").put(verifyJWT, deletePlaylist);
router.route("/update/:playlistId").put(verifyJWT, updatePlaylist);

module.exports = router;
