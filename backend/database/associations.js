

module.exports = (sequelize) => {
    console.log(sequelize.models);
    const {
        customer,
        fuel,
        region,
        income_group,
        policy
    } = sequelize.models;


    //Policy Table
    policy.belongsTo(customer, {
        foreignKey: {
            name: 'customerID',
            allowNull: true,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });

    customer.hasMany(policy, {
        foreignKey: {
            name: 'customerID',
            allowNull: true,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });

    policy.belongsTo(fuel, {
        foreignKey: {
            name: 'fuelID',
            allowNull: true,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });

    policy.belongsTo(region, {
        foreignKey: {
            name: 'regionID',
            allowNull: true,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });

    policy.belongsTo(income_group, {
        foreignKey: {
            name: 'incomeGroupID',
            allowNull: true,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });


};
