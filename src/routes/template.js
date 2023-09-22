const {
	createTemplate,
	getTemplates,
	deleteTemplate,
	cloneTemplate,
	getPublicTemplates,
	updateTemplateVisibility,
} = require("../controllers/template");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTemplate);

router.get("/", auth, getTemplates);

router.delete("/:id", auth, deleteTemplate);

router.post("/clone/:id", auth, cloneTemplate);
router.get("/public", auth, getPublicTemplates);

router.patch("/visibility/:id", auth, updateTemplateVisibility);

module.exports = router;
