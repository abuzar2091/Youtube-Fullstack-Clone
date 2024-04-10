const { Router } = require("express");
const verifyJWT = require("../middlewares/auth.middleware.js");
const { healthCheck } = require("../controllers/healthcheck.controlller.js");


const router = Router();
router.route("/healthcheck").get(verifyJWT, healthCheck);


module.exports = router;