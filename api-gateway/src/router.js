'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');

module.exports = (app) => {

    app.get('/booking/available-services', (req, res, next) => {
        console.log("Called: ", req.path)
        throw new Error("My Error thrown on purpose!");
        next()
    })

    // app.get('/booking/available-services', (req, res, next) => {
    //     console.log("Called: ", req.path)
    //     next()
    // })
}