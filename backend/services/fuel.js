const { models } = require('../database/index');

//Get List of all fuels
const getListOFFuels = async () => {

    try {
        const fuels = await models.fuel.findAll();
        return fuels
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    getListOFFuels
}