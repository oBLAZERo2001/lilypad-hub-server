const {
	createTemplate,
	getTemplates,
	deleteTemplate,
	cloneTemplate,
	getPublicTemplates,
	updateTemplate,
} = require("../controllers/template");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTemplate);

router.get("/", auth, getTemplates);

router.delete("/:id", auth, deleteTemplate);

router.post("/clone/:id", auth, cloneTemplate);
router.get("/public", auth, getPublicTemplates);

router.patch("/updateTemplate/:id", auth, updateTemplate);

module.exports = router;