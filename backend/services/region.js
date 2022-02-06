const { models } = require('../database/index');


const getAllRegions = async (req) => {

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