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

	async reportUserUpdate(newCost, id) {
		const user = await User.findOne({ id });
		if (!user) {
			console.log(`user with id:${id} not found`);
			return;
		}

		const yearIndex = user.reportsData.findIndex(
			(element) => element.year === newCost.year
		);

		if (yearIndex === -1) {
			user.reportsData.push({
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
			});

			const updatedUser = await User.findOneAndUpdate(
				{ id },
				{ reportsData: user.reportsData },
				{ runValidators: true, new: true }
			);
			return updatedUser;
		}

		if (yearIndex >= 0) {
			const monthIndex = user.reportsData[yearIndex].months.findIndex(
				(element) => element.name === newCost.month
			);

			if (monthIndex === -1) {
				user.reportsData[yearIndex].months.push({
					sum: newCost.sum,
					name: newCost.month,
					costsInfo: [
						{
							description: newCost.description,
							category: newCost.category,
							sum: newCost.sum,
						},
					],
				});
				user.reportsData[yearIndex].sum += newCost.sum;

				const updatedUser = await User.findOneAndUpdate(
					{ id },
					{ reportsData: user.reportsData },
					{ runValidators: true, new: true }
				);
				return updatedUser;
			}

			if (monthIndex >= 0) {
				user.reportsData[yearIndex].months[monthIndex].costsInfo.push({
					description: newCost.description,
					category: newCost.category,
					sum: newCost.sum,
				});
				user.reportsData[yearIndex].months[monthIndex].sum += newCost.sum;
				user.reportsData[yearIndex].sum += newCost.sum;

				const updatedUser = await User.findOneAndUpdate(
					{ id },
					{ reportsData: user.reportsData },
					{ runValidators: true, new: true }
				);
				return updatedUser;
			}
		}
	},

	async generateMonthlyReport(id, year, month) {
		return User.aggregate([
			{
				$match: { id },
			},
			{
				$unwind: "$reportsData",
			},
			{
				$match: { "reportsData.year": year },
			},
			{
				$unwind: "$reportsData.months",
			},
			{
				$match: { "reportsData.months.name": month },
			},
			{
				$project: {
					id: 1,
					firstName: 1,
					lastName: 1,
					year: "$reportsData.year",
					month: "$reportsData.months.name",
					sum: "$reportsData.months.sum",
					costs: "$reportsData.months.costsInfo",
				},
			},
		]);
	},

	async generateYearlyReport(id, year) {
		return User.aggregate([
			{
				$match: { id },
			},
			{
				$unwind: "$reportsData",
			},
			{
				$match: { "reportsData.year": year },
			},
			{
				$project: {
					firstName: 1,
					lastName: 1,
					id: 1,
					year: "$reportsData.year",
					total: "$reportsData.sum",
					costs: "$reportsData.months",
				},
			},
		]);
	},
};
