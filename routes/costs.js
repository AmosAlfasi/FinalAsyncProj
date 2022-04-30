var express = require("express");
const costService = require("../services/cost.service");

const router = express.Router();

router.post("/insert-cost", async (req, res) => {
	const { description, category, sum, userId } = req.body;
	await costService.insertCost(description, category, sum, userId);
	res.status(200).send();
});

module.exports = router;
