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

	async reportUserUpdate(newCost, id) {
		const user = await User.findOne({ id });
		console.log(user);
		if (!user) {
			console.log(`user with id:${id} not found`);
			return;
		}

		const ueserWithOutRrecords = await User.findOneAndUpdate(
			{
				id,
				$or: [
					{ reportsData: [] },
					{ $nin: { "reportsData.$.year": newCost.year } },
				],
			},
			{
				$push: {
					reportsData: {
						year: newCost.year,
						sum: newCost.sum,
						months: {
							sum: newCost.sum,
							name: newCost.month,
							costsInfo: [
								{
									description: newCost.description,
									category: newCost.category,
									sum: newCost.sum,
								},
							],
						},
					},
				},
			},
			{ runValidators: true, new: true }
		);

		const userWithReports = await User.findOneAndUpdate(
			{
				id,
				"reportsData.$.year": newCost.year,
				$or: [
					{ "reportsData.$[year].months": [] },
					{ $nin: { "reportsData.$[year].months.$.name": newCost.month } },
				],
			},
			{ sumOfCosts: 500 }
		);
	},
};
