'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');

var DoctorTypes = Object.freeze({
    "cardiologist": 1,
    "anesthesiologist": 2,
    "surgeon": 3,
    "allergist": 4,
    "other": 5
})

module.exports = (app) => {
    app.get('/fee-calculation/fee', (req, res, next) => {

        let duration = req.query.duration;
        let type = req.query.type;

        let fee = 0;
        switch(parseInt(type)) {
            case DoctorTypes.cardiologist:
            {
                fee = 200;
                break;
            }
            case DoctorTypes.anesthesiologist:
            {
                fee = 100;
                break;
            }
            case DoctorTypes.surgeon:
            {
                fee = 250;
                break;
            }
            case DoctorTypes.allergist:
            {
                fee = 110;
                break;
            }
            case DoctorTypes.other:
            {
                fee = 50;
                break;
            }

        }
        res.status(status.OK).json({fee: fee * duration})
    })
}