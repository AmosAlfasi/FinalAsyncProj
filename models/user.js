const mongoose = require("mongoose");
const { Schema } = mongoose;

//the user must contain id,firstname,lastname,maritalStatus and birthday.
//the report data will be added by adding costs data to user
const userSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			minlength: 9,
			maxlength: 9,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		maritalStatus: {
			type: String,
			required: true,
			enum: ["single", "married", "devorsed"],
		},
		birthday: {
			type: String,
			required: true,
		},
		reportsData: [
			{
				year: Number,
				sum: Number,
				months: [
					{
						sum: Number,
						name: {
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
						},
						costsInfo: [
							{
								description: String,
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
								},
								sum: Number,
							},
						],
					},
				],
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
