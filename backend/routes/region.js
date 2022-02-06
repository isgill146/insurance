const regionController = require('../controllers/region');

module.exports = (router) => {
    router.get('/', regionController.list);
    return router;
};
