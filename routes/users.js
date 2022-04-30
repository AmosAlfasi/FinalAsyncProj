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
		console.log(user);
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
