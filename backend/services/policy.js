const { models } = require('../database/index');
const { paginate } = require('../helpers/utils');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const moment = require('moment');


//Get Policy List and Search By either CustomerID or PolicyID
const getAndSearchPolicyList = async (req) => {
    const { pageIndex, pageSize, search } = req.query;

    //Validate pageIndex and pageSize
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
            order: [['dateOfPurchase', 'ASC']]
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


//Get Monthly Policy Count based on Region selected. By Default return response for all the regions.
const monthlyPolicyCountBasedOnRegion = async (req) => {
    const { regionName } = req.query;

    try {
        let params = {
            attributes: ['dateOfPurchase',
                [sequelize.literal(`COUNT(*)`), 'count']
            ],
            group: ['date_of_purchase'],
            order: [['date_of_purchase', 'ASC']]
        }

        //If region name exists
        if (regionName && regionName !== 'All') {
            const region = await models.region.findOne({ where: { name: regionName } });
            //Check if region exists in db
            if (!region) { throw new Error('Invalid Input!') }

            //Add RegionID to where clause
            params.where = { regionID: region.regionID };
        }

        const policies = await models.policy.findAll(params)


        //Count Month Wise policies

        //store month and count in hashtable
        let monthlyCountObject = {};

        policies.map((policy) => {
            var check = moment(policy.dateOfPurchase, 'YYYY/MM/DD');

            //Get Month based on date
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
        fuel,
        region,
        incomeRange } = req.body;

    try {
        //Check if Policy Exist
        const ifPolicyExist = await models.policy.findByPk(policyID);
        if (!ifPolicyExist) {
            throw new Error('Policy Does Not Exist');
        }

        //Check if premium more than 1million
        if (premium) {
            if (premium < 0) {
                throw new Error('Premium cannot be negative!')
            }
            else if (premium > 1000000) {
                throw new Error('Premium Cannot be more than 1 million!')
            }
        }

        //Check if fuel, region or incomeGroup exists and update policy accordingly
        let fuelID, regionID, incomeGroupID;
        if (fuel) {
            const fuelExist = await models.fuel.findOne({ where: { type: fuel } });
            if (!fuel) { throw new Error('Not Found!') }
            fuelID = fuelExist.fuelID;
        }

        if (region) {
            const regionExist = await models.region.findOne({ where: { name: region } });
            if (!regionExist) { throw new Error('Not Found!') }
            regionID = regionExist.regionID;
        }

        if (incomeRange) {
            const incomeRangeExist = await models.income_group.findOne({ where: { incomeRange } });
            if (!incomeRangeExist) { throw new Error('Not Found!') }
            incomeGroupID = incomeRangeExist.incomeGroupID;
        }

        //Update Policy Based on incoming request
        const updatedPolicy = await ifPolicyExist.update({
            vehicleSegment: vehicleSegment ? vehicleSegment : ifPolicyExist.vehicleSegment,
            premium: premium != null ? premium : ifPolicyExist.premium,
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