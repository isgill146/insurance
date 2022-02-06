const { models } = require('../database/index');

//Get List of all Income Groups
const getAllIncomeGroup = async () => {

    try {
        const incomeGroups = await models.income_group.findAll();
        return incomeGroups
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    getAllIncomeGroup
}