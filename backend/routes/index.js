const express = require('express');
const policyRoutes = require('./policy');
const regionRoutes = require('./region');
const fuelRoutes = require('./fuel');
const incomeGroupRoutes = require('./income_group');

module.exports = (app) => {
    const routes = [
        {
            basePath: `${process.env.BASE_PATH}/policy`,
            routes: policyRoutes
        },
        {
            basePath: `${process.env.BASE_PATH}/region`,
            routes: regionRoutes
        },
        {
            basePath: `${process.env.BASE_PATH}/fuel`,
            routes: fuelRoutes
        },
        {
            basePath: `${process.env.BASE_PATH}/income-group`,
            routes: incomeGroupRoutes
        }
    ];

    for (const route of routes) {
        app.use(route.basePath, route.routes(express.Router()));
    }
};
