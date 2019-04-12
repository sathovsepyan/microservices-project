'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');

module.exports = (app) => {
    app.post('/payments/payment', (req, res, next) => {
        //call some external service for the payment 
        //return payment id 
        res.status(status.OK).json(uuid())
    })

    app.get('/payments/payment/:paymentId', (req, res, next) => {
        res.status(status.OK).json({})
    })
}