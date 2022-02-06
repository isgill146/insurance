const messages = require('../helpers/messages');
const { controllerBuilder } = require('../helpers/utils');

const {
    getAllRegions
} = require('../services/region');

const list = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get Region List',
        serviceCall: getAllRegions,
        serviceData: req,
        succesMsg: 'Region List Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

module.exports ={
    list
}