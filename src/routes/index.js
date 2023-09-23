const router = require("express").Router();
const user = require("./user");
const template = require("./template");
const lilypadJob = require("./lilypadJob");

router.use("/user", user);
router.use("/template", template);
router.use("/lilypad", lilypadJob);

module.exports = { routes: router };
