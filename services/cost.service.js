const Cost = require('../models/cost');
const userService = require('./user.service');

module.exports = {
    async insertCost(description, category, sum, userId) {
        const newCost = await Cost.create(
            { description, category, sum })
        await userService.createOrUpdateUserCosts(userId, sum);
    },

}

