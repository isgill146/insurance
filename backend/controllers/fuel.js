const messages = require('../helpers/messages');
const { controllerBuilder } = require('../helpers/utils');

const {
    getListOFFuels
} = require('../services/fuel');

const list = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get Fuel List',
        serviceCall: getListOFFuels,
        serviceData: req,
        succesMsg: 'Fuel List Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

module.exports ={
    list
}