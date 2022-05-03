var express = require("express");
const costService = require("../services/cost.service");
const userService = require("../services/user.service");

const router = express.Router();

router.post("/insert", async (req, res) => {
	const { description, category, year, month, sum, userId } = req.body;

	const newCost = await costService.insertCost(
		description,
		category,
		year,
		month,
		sum
	);

	await userService.reportUserUpdate(newCost, userId);
	res.status(200).send();
});

module.exports = router;
