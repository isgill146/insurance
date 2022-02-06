const { models } = require('../database/index');
const { paginate } = require('../helpers/utils');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const moment = require('moment');


//Get Policy List and Search By either CustomerID or PolicyID
const getAndSearchPolicyList = async (req) => {
    const { pageIndex, pageSize, search } = req.query;

    if (!(pageIndex && pageSize) || (pageIndex < 0 && pageSize < 1)) {
        throw new Error("Invalid PageIndex and PageSize");
    }

    try {
        //Default Param
        let params = {
            distinct: true,
            where: {},
            include: [
                {
                    model: models.customer,
                    attributes: ['customerID', 'gender']
                },
                {
                    model: models.fuel,
                    attributes: ['fuelID', 'type']
                },
                {
                    model: models.income_group,
                    attributes: ['incomeGroupID', 'incomeRange']
                },
                {
                    model: models.region,
                    attributes: ['regionID', 'name']
                }
            ],
            ...paginate(pageIndex, pageSize),
            order: [['premium', 'DESC']]
        }

        //Search Either By CustomerID or PolicyID
        if (search) {
            params['where'] = {
                [Op.or]: {
                    customerID: {
                        [Op.like]: `%${search}%`
                    },
                    policyID: {
                        [Op.like]: `%${search}%`
                    }
                }
            }
        }

        const policy = await models.policy.findAndCountAll(params);

        return policy;
    } catch (e) {
        throw new Error(e);
    }
}


const monthlyPolicyCountBasedOnRegion = async (req) => {
    const { regionID } = req.query;

    try {
        let params = {
            attributes: ['dateOfPurchase',
                [sequelize.literal(`COUNT(*)`), 'count']
            ],
            group: ['date_of_purchase'],
            order: [['date_of_purchase', 'ASC']]
        }

        if (regionID) {
            const region = await models.region.findByPk(regionID);
            //Check if region exists
            if (!region) { throw new Error('Invalid Input!') }

            //Add RegionID to where clause
            params.where = { regionID };
        }

        const policies = await models.policy.findAll(params)


        //Count Month Wise
        let monthlyCountObject = {};

        policies.map((policy) => {
            var check = moment(policy.dateOfPurchase, 'YYYY/MM/DD');

            var month = check.format('MMMM');

            if (monthlyCountObject[month] != null) {
                monthlyCountObject[month] += policy.dataValues.count;
            } else {
                monthlyCountObject[month] = policy.dataValues.count;
            }
        });


        return { monthlyCountObject }
    } catch (e) {
        throw new Error(e);
    }

}


//Update Policy
const updatePolicy = async (req) => {
    const {
        policyID,
        vehicleSegment,
        premium,
        bodilyInjuryLiability,
        personalInjuryProtection,
        propertyDamageLiability,
        collision,
        comprehensive,
        customerMaritalStatus,
        fuelID,
        regionID,
        incomeGroupID } = req.body;

    try {
        //Check if Policy Exist
        const ifPolicyExist = await models.policy.findByPk(policyID);
        if (!ifPolicyExist) {
            throw new Error('Policy Does Not Exist');
        }

        //Check if premium more than 1million
        if (premium) {
            if (premium > 100000) {
                throw new Error('Premium Cannot be more than 1 million!')
            }
        }

        const updatedPolicy = await ifPolicyExist.update({
            vehicleSegment: vehicleSegment ? vehicleSegment : ifPolicyExist.vehicleSegment,
            premium: premium > 0 ? premium : ifPolicyExist.premium,
            bodilyInjuryLiability: bodilyInjuryLiability != null ? bodilyInjuryLiability : ifPolicyExist.bodilyInjuryLiability,
            personalInjuryProtection: personalInjuryProtection != null ? personalInjuryProtection : ifPolicyExist.personalInjuryProtection,
            propertyDamageLiability: propertyDamageLiability != null ? propertyDamageLiability : ifPolicyExist.propertyDamageLiability,
            collision: collision != null ? collision : ifPolicyExist.collision,
            comprehensive: comprehensive != null ? comprehensive : ifPolicyExist.comprehensive,
            customerMaritalStatus: customerMaritalStatus != null ? customerMaritalStatus : ifPolicyExist.customerMaritalStatus,
            fuelID: fuelID ? fuelID : ifPolicyExist.fuelID,
            regionID: regionID ? regionID : ifPolicyExist.regionID,
            incomeGroupID: incomeGroupID ? incomeGroupID : ifPolicyExist.incomeGroupID
        })

        return updatedPolicy;
    } catch (e) {
        throw new Error(e);
    }

}


module.exports = {
    getAndSearchPolicyList,
    updatePolicy,
    monthlyPolicyCountBasedOnRegion
}