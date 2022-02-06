const { models } = require('../database/index');


//Get List of all regions
const getAllRegions = async () => {

    try {
        const regions = await models.region.findAll();
        return regions
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    getAllRegions
}