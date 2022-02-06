const { Sequelize, Model } = require('sequelize');

const Policy = (sequelize) => {
    /* Extending the Policy model from the sequilize Model class */
    class PolicyModel extends Model {

    }

    /* initiating the Policy model schema */

    const DT = Sequelize.DataTypes;

    PolicyModel.init(
        {
            policyID: {
                type: DT.INTEGER,
                field: 'policy_id',
                primaryKey: true
            },
            dateOfPurchase: {
                type: DT.DATE,
                field: 'date_of_purchase',
                allowNull: true,
            },
            customerID: {
                type: DT.INTEGER,
                field: 'customer_id',
                allowNull: false,
            },
            // fuelType: {
            //     type: DT.ENUM('CNG', 'Petrol', 'Diesel'),
            //     field: 'fuel_type',
            //     allowNull: false
            // },
            vehicleSegment: {
                type: DT.ENUM('A', 'B', 'C'),
                field: 'vehicle_segment',
                allowNull: false
            },
            premium: {
                type: DT.INTEGER,
                allowNull: false
            },
            bodilyInjuryLiability: {
                type: DT.BOOLEAN,
                field: 'bodily_injury_liability',
                allowNull: false
            },
            personalInjuryProtection: {
                type: DT.BOOLEAN,
                field: 'personal_injury_protection',
                allowNull: false
            },
            propertyDamageLiability: {
                type: DT.BOOLEAN,
                field: 'property_damage_liability',
                allowNull: false
            },
            collision: {
                type: DT.BOOLEAN,
                allowNull: false
            },
            comprehensive: {
                type: DT.BOOLEAN,
                allowNull: false
            },
            customerMaritalStatus: {
                type: DT.BOOLEAN,
                field: 'customer_marital_status',
                allowNull: false
            },
            // customerGender:{
            //     type: DT.ENUM('Male', 'Female'),
            //     field: 'customer_gender',
            //     allowNull: false
            // },
            // customerIncomeRange: {
            //     type: DT.ENUM('0- $25K', '$25-$70K', '>$70K'),
            //     field: 'customer_income_group',
            //     allowNull: false
            // },
            // customerRegion: {
            //     type: DT.ENUM('North', 'South', 'East', 'West'),
            //     field: 'customer_region',
            //     allowNull: false
            // }
        },
        {
            sequelize, modelName: 'policy',
            paranoid: true
        }
    );
};

module.exports = Policy;
