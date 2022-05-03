const Cost = require("../models/cost");
const userService = require("./user.service");

module.exports = {
	async insertCost(description, category, year, month, sum) {
		const newCost = await Cost.create({
			description,
			category,
			year,
			month,
			sum,
		});

		return newCost;
	},
};
