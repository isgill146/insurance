const fuelController = require('../controllers/fuel');

module.exports = (router) => {
    router.get('/', fuelController.list);
    return router;
};
