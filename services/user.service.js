const User = require("../models/user");

module.exports = {
	async createOrUpdateUser(id, firstName, lastName, maritalStatus, birthday) {
		const newUser = await User.findOneAndUpdate(
			{ id },
			{ firstName, lastName, maritalStatus, birthday },
			{ runValidators: true, upsert: true, new: true }
		);
		return newUser;
	},

	async createOrUpdateUserCosts(id, sum) {
		await User.findOneAndUpdate(
			{ id },
			{ $inc: { sumOfCosts: sum } },
			{ runValidators: true, upsert: true, new: true }
		);
	},
};
