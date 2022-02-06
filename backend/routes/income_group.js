const incomeGroupController = require('../controllers/income_group');

module.exports = (router) => {
    router.get('/', incomeGroupController.list);
    return router;
};
