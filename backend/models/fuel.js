const { Sequelize, Model } = require('sequelize');

const Fuel = (sequelize) => {
    /* Extending the Fuel model from the sequilize Model class */
    class FuelModel extends Model {

    }

    /* initiating the Fuel model schema */

    const DT = Sequelize.DataTypes;

    FuelModel.init(
        {
            fuelID: {
                type: DT.INTEGER,
                field: 'fuel_id',
                primaryKey: true,
                autoIncrement : true
            },
            type: {
                type: DT.ENUM('CNG', 'Petrol', 'Diesel'),
                allowNull: false
            }
        },
        {
            sequelize, modelName: 'fuel'
            // paranoid: true
        }
    );
};

module.exports = Fuel;
