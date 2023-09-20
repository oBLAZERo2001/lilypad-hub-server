const {
	signin,
	getUser,
	generateNonce,
	updateUsername,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", auth, getUser);

router.post("/updateUsername", auth, updateUsername);

router.post("/signin", signin);

router.post("/generateNonce", generateNonce);

module.exports = router;
