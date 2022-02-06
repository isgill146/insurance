const express = require('express');
const policyRoutes = require('./policy');
const regionRoutes = require('./region');

module.exports = (app) => {
    const routes = [
        {
            basePath: `${process.env.BASE_PATH}/policy`,
            routes: policyRoutes
        },
        {
            basePath: `${process.env.BASE_PATH}/region`,
            routes: regionRoutes
        }
    ];

    for (const route of routes) {
        app.use(route.basePath, route.routes(express.Router()));
    }
};
