const {
	signin,
	getUser,
	generateNonce,
	updateUsername,
	getUserWithAddress,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/signin", signin);

router.get("/", auth, getUser);

router.get("/:address", getUserWithAddress);

router.post("/updateUsername", auth, updateUsername);

router.post("/generateNonce", generateNonce);

module.exports = router;
