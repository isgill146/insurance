const { Sequelize, Model } = require('sequelize');

const IncomeGroup = (sequelize) => {
    /* Extending the Income Group model from the sequilize Model class */
    class IncomeGroupModel extends Model {

    }

    /* initiating the Income Group model schema */

    const DT = Sequelize.DataTypes;

    IncomeGroupModel.init(
        {
            incomeGroupID: {
                type: DT.INTEGER,
                field: 'income_group_id',
                primaryKey: true,
                autoIncrement : true
            },
            incomeRange: {
                type: DT.ENUM('0- $25K', '$25-$70K', '>$70K'),
                field: 'income_range',
                allowNull: false
            }
        },
        {
            sequelize, modelName: 'income_group'
            // paranoid: true
        }
    );
};

module.exports = IncomeGroup;
