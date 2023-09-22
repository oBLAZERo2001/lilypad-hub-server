const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		payload: {
			type: Object,
			required: true,
		},
		img: {
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
	},
	{
		timestamps: true,
	}
);

const Template = new mongoose.model("Template", TemplateSchema);

module.exports = { Template };
