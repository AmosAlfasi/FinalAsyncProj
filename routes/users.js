var express = require("express");
const userService = require("../services/user.service");

const router = express.Router();

router.post("/insert-or-update-user", async (req, res) => {
	try {
		const { id, firstName, lastName, maritalStatus, birthday } = req.body;
		const user = await userService.createOrUpdateUser(
			id,
			firstName,
			lastName,
			maritalStatus,
			birthday
		);
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
	}
});

router.get("/get-monthly-report/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { year, month } = req.body
		const report = await userService.generateMonthlyReport(id, year, month);
		res.status(200).send(report)
	} catch (error) {
		console.log(error);
	}
})

module.exports = router;
