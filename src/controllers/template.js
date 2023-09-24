const { Template } = require("../models/template");

async function createTemplate(req, res) {
	console.log("in create template get");
	try {
		const module = await new Template({
			user: req.user._id,
			payload: req.body.payload,
			name: req.body.name,
			img: req.body.img,
			description: req.body.description,
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

async function cloneTemplate(req, res) {
	const cloningId = req.params.id;
	let newData = {};
	try {
		const { name: newName } = req.body;

		const cloningData = await Template.findOne({ _id: cloningId });
		if (cloningData && cloningData?.visibility === "public") {
			newData = {
				...newData,
				payload: cloningData.payload,
				img: cloningData.img ? cloningData.img : "",
				description: cloningData.description,
				user: req.user._id,
				name: newName,
			};
		}

		const module = await new Template(newData).save();

		// incrwasing clone count
		if (cloningData?.cloneCount)
			await Template.updateOne(
				{ _id: cloningId },
				{
					cloneCount: cloningData.cloneCount + 1,
				}
			);
		else {
			await Template.updateOne(
				{ _id: cloningId },
				{
					cloneCount: 1,
				}
			);
		}

		res.send(module);
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

// sort by needed
async function getPublicTemplates(req, res) {
	try {
		const query = req.query;
		const templates = await Template.find({
			visibility: "public",
			name: { $regex: query?.name ? query.name : "", $options: "i" },
		})
			.populate("user")
			.sort({
				[query?.sortType === "date"
					? "createdAt"
					: query?.sortType === "clones"
					? "cloneCount"
					: "createdAt"]: query?.sortOrder === "old" ? 1 : -1,
			})
			.exec();
		res.send(templates);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

async function getTemplate(req, res) {
	try {
		const template = await Template.findOne({
			user: req.user._id,
			_id: req.params.id,
		})
			.populate("user")
			.exec();
		if (!template)
			return res.status(404).send({ message: "Template not found!" });
		res.send(template);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

// not completed
async function updateTemplate(req, res) {
	const { id } = req.params;
	let updateData = {
		visibility: req.body.visibility,
	};

	if (req.body?.img) {
		updateData = {
			...updateData,
			img: req.body.img,
		};
	}
	if (req.body?.description) {
		updateData = {
			...updateData,
			description: req.body.description,
		};
	}
	try {
		const template = await Template.updateOne(
			{ _id: id, user: req.user._id },
			updateData
		);
		res.send(template);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

module.exports = {
	createTemplate,
	getTemplates,
	cloneTemplate,
	deleteTemplate,
	getPublicTemplates,
	updateTemplate,
	getTemplate,
};
