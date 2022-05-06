const mongoose = require("mongoose");

const costSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: [
				"food",
				"health",
				"sport",
				"housing",
				"transportation",
				"education",
			],
			required: true,
		},
		year: { type: Number, required: true },

		month: {
			type: String,
			enum: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
			required: true,
		},

		sum: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;
