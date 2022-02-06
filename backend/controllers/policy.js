const messages = require('../helpers/messages');
const { controllerBuilder } = require('../helpers/utils');

const {
    getAndSearchPolicyList,
    updatePolicy,
    monthlyPolicyCountBasedOnRegion
} = require('../services/policy');

const list = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get Policy List',
        serviceCall: getAndSearchPolicyList,
        serviceData: req,
        succesMsg: 'Policy List Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

const count = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Get Policy Count',
        serviceCall: monthlyPolicyCountBasedOnRegion,
        serviceData: req,
        succesMsg: 'Policy Count Retrieved Successfully',
    });

    return res.status(response.status).send(response);
};

const edit = async (req, res) => {
    /* Call the controller builder */
    const response = await controllerBuilder({
        controllerName: 'Update Policy',
        serviceCall: updatePolicy,
        serviceData: req,
        succesMsg: 'Policy Updated Successfully',
    });

    return res.status(response.status).send(response);
};


module.exports = {
    list,
    edit,
    count
}