const {
	createTemplate,
	getTemplates,
	deleteTemplate,
	cloneTemplate,
	getPublicTemplates,
	updateTemplate,
	getTemplate,
} = require("../controllers/template");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTemplate);

router.get("/public", getPublicTemplates);
router.get("/:id", auth, getTemplate);
router.get("/", auth, getTemplates);

router.delete("/:id", auth, deleteTemplate);

router.post("/clone/:id", auth, cloneTemplate);

router.patch("/updateTemplate/:id", auth, updateTemplate);

module.exports = router;
