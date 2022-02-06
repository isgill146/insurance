const Sequelize = require('sequelize');

const { successLog, noticeLog, errorLog } = require('../helpers/loggers');


function initiateDatabase() {
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER_NAME,
        process.env.DATABASE_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            logging: noticeLog,
            define: {
                timestamps: false,
            },
        }
    );

    //IIFE
    (async function () {
        try {
            await sequelize.authenticate();
            successLog(
                'CONNECTED TO DB :',
                'Connection has been established successfully.'
            );
        } catch (error) {
            errorLog(
                'DB CONNECTION ERROR :',
                'Unable to connect to the database:' + error
            );
        }
    })();

    require('./models')(sequelize);

    require('./associations')(sequelize);


    sequelize.sync();

    //Run Model seeders (For customer and policy extract data from CSV)

    // sequelize.sync({
    //     alter: true,
    //    // force: true
    // }).then(async () => {
    //   //  await require('../models/modelSeeders/fuel')(sequelize)
    //   //  await require('../models/modelSeeders/income_group')(sequelize)
    //    // await require('../models/modelSeeders/region')(sequelize)
    // });

    return sequelize;
}

module.exports = initiateDatabase();
