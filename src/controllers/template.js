const { Template } = require("../models/template");

async function createTemplate(req, res) {
	console.log("in create template get");
	try {
		const module = await new Template({
			user: req.user._id,
			payload: req.body.payload,
			name: req.body.name,
		}).save();

		res.send(module);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function getTemplates(req, res) {
	try {
		const templates = await Template.find({ user: req.user._id }).sort({
			createdAt: -1,
		});
		res.send(templates);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

async function deleteTemplate(req, res) {
	try {
		const templates = await Template.findByIdAndDelete(req.params.id);
		res.send(templates);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

module.exports = {
	createTemplate,
	getTemplates,
	deleteTemplate,
};
