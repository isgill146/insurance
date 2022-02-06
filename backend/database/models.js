module.exports = (sequelize) => {
    const modelDefiners = [
        require('../models/customer'),
        require('../models/fuel'),
        require('../models/income_group'),
        require('../models/region'),
        require('../models/policy'),
    ];

    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
    }
};
