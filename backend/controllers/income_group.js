const messages = require('../helpers/messages');
const { controllerBuilder } = require('../helpers/utils');

const {
    getAllIncomeGroup
} = require('../services/income_group');

const list = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get Income Group List',
        serviceCall: getAllIncomeGroup,
        serviceData: req,
        succesMsg: 'Income Group  List Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

module.exports ={
    list
}