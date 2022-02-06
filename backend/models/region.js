const { Sequelize, Model } = require('sequelize');

const Region = (sequelize) => {
    /* Extending the Region model from the sequilize Model class */
    class RegionModel extends Model {

    }

    /* initiating the Region model schema */

    const DT = Sequelize.DataTypes;

    RegionModel.init(
        {
            regionID: {
                type: DT.INTEGER,
                field: 'region_id',
                primaryKey: true,
                autoIncrement : true
            },
            name: {
                type: DT.ENUM('North', 'South', 'East', 'West'),
                allowNull: false
            }
        },
        {
            sequelize, modelName: 'region'
        }
    );
};

module.exports = Region;
