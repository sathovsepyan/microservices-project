'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');
const redis = require('./redisClient')()

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

        let currentKey = `${type}-${duration}`;

        redis.getAsync(currentKey)
            .then((data) => {
                if (data != null) {
                    console.log('got from redis');
                    return res.status(status.OK).json({
                        fee: data
                    });
                }

                console.log('calculating');

                let fee = 0;
                switch (parseInt(type)) {
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
                let total = fee * duration;
                redis.set(currentKey, total);

                res.status(status.OK).json({
                    fee: total
                })
            })
    })

    app.get('/fee-calculation/fees', (req, res, next) => {
        let currentKey = '*3';

        redis.getAsync(currentKey)
            .then((data) => {
                if (data != null) {
                    console.log('got from redis');
                    return res.status(status.OK).json(JSON.parse(data));
                }

                //in real-life, retrieve the values from the database
                let priceList = {
                    "cardiologist": 200,
                    "anesthesiologist": 100,
                    "surgeon": 250,
                    "allergist": 110,
                    "other": 50,
                };
                redis.set(currentKey, JSON.stringify(priceList));
                res.status(status.OK).json(
                    priceList
                );
            })
    });
}