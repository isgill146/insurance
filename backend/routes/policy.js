const policyController = require('../controllers/policy');

module.exports = (router) => {
    router.get('/', policyController.list);
    router.get('/count', policyController.count);
    router.put('/', policyController.edit);
    return router;
};
