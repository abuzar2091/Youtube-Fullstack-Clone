const { Router } = require("express");
const verifyJWT = require("../middlewares/auth.middleware.js");
const {
  addComment,
  getVideoComments,
  deleteComment,
  updateComment,
} = require("../controllers/comment.controller.js");
const router = Router();
router.route("/addcomment").post(verifyJWT, addComment);
router.route("/getvideocomment").post(verifyJWT, getVideoComments);
router.route("/delete/:commentId").post(verifyJWT, deleteComment);
router.route("/update/:commentId").put(verifyJWT, updateComment);

module.exports = router;
