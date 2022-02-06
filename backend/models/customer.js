const { Sequelize, Model } = require('sequelize');

const Customer = (sequelize) => {
    /* Extending the customer model from the sequilize Model class */
    class CustomerModel extends Model {

    }

    /* initiating the customer model schema */

    const DT = Sequelize.DataTypes;

    CustomerModel.init(
        {
            customerID: {
                type: DT.INTEGER,
                field: 'customer_id',
                primaryKey: true
            },
            gender: {
                type: DT.ENUM('Male', 'Female'),
                allowNull: false
            }
        },
        {
            sequelize, modelName: 'customer'
            // paranoid: true
        }
    ); 
};

module.exports = Customer;
