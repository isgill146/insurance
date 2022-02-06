module.exports = async function (sequelize) {
    await sequelize.models.income_group.bulkCreate([
        {
            incomeGroupID: 1,
            incomeRange: '0- $25K'
        },
        {
            incomeGroupID: 2,
            incomeRange: '$25-$70K'
        },
        {
            incomeGroupID: 3,
            incomeRange: '>$70K'
        },
    ]);
};
