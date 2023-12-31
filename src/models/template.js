const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		payload: {
			type: Object,
			required: true,
		},
		img: {
			type: String,
		},
		description: {
			type: String,
		},
		name: {
			type: String,
		},
		visibility: {
			type: String,
			required: true,
			default: "public",
		},
		cloneCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Template = new mongoose.model("Template", TemplateSchema);

module.exports = { Template };
