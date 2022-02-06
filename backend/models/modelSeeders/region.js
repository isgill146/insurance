module.exports = async function (sequelize) {
    await sequelize.models.region.bulkCreate([
        {
            regionID: 1,
            name: 'North'
        },
        {
            regionID: 2,
            name: 'South'
        },
        {
            regionID: 3,
            name: 'East'
        },
        {
            regionID: 4,
            name: 'West'
        }
    ]);
};
