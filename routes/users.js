var express = require("express");
const { body, validationResult } = require('express-validator');
const userService = require("../services/user.service");

const router = express.Router();

router.post("/insert-or-update-user",
	body('id').exists().isString().isLength({ min: 9, max: 9 }),
	body('firstName').exists().isString(),
	body('lastName').exists().isString(),
	body('maritalStatus').exists().isString().isIn(['single', 'married', 'devorsed']),
	body('birthday').exists().isString(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

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

router.get("/get-monthly-report/:id",
	body('year').exists().isNumeric(),
	body('month').exists().isString().isIn([
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { id } = req.params;
			const { year, month } = req.body;

			const report = await userService.generateMonthlyReport(id, year, month);

			res.status(200).send(report);
		} catch (error) {
			console.log(error);
		}
	});

module.exports = router;
