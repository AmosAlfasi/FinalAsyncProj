var express = require('express');
const userService = require('../services/user.service')

const router = express.Router();

router.post('/insert-or-update-user', async (req, res) => {
    const { id, firstName, lastName, maritalStatus, birthday } = req.body;
    await userService.createOrUpdateUser(id, firstName, lastName, maritalStatus, birthday)
    res.status(200).send(req.body)
});

module.exports = router;