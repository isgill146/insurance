module.exports = async function (sequelize) {
    await sequelize.models.fuel.bulkCreate([
        {
            fuelID: 1,
            type: 'CNG'
        },
        {
            fuelID: 2,
            type: 'Petrol'
        },
        {
            fuelID: 3,
            type: 'Diesel'
        }
    ]);
};
