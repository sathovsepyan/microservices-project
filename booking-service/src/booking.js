'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');

module.exports = (app) => {
    //list all available slots
    app.get('/booking/available-slots', (req, res, next) => {
        
        
        res.status(status.OK).json({'res': 'yaye I was called'})
    })

    app.post('/booking', (req, res, next) => {
        c   
        
        res.status(status.OK).json({})
    })
}