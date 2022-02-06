const { defaultServerResponse } = require('./messages');
const { errorLog } = require('./loggers');

const controllerBuilder = async ({
    controllerName,
    serviceCall,
    serviceData,
    succesMsg,
}) => {
    let response = { ...defaultServerResponse };
    try {
        const responseFromService = await serviceCall(serviceData);
        response.status = 200;
        response.message = succesMsg;
        response.body = responseFromService;
    } catch (error) {
        errorLog('ERROR:', `Something went wrong: Controller: ${controllerName}\n${error.message}`);
        response.message = error.message;
    }

    return response;
};



const paginate = (page, pageSize) => {
    const offset = page * pageSize;
    const limit = parseInt(pageSize);

    return {
        offset,
        limit,
    };
}

module.exports = {
    controllerBuilder,
    paginate
}
