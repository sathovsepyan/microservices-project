'use strict';
const bodyParser = require('body-parser');
const compression = require('compression');
const bookingController = require('./booking.controller');
const feeCalculationController = require('./fee-calculation.controller');
const paymentController = require('./payment.controller');

const logger = require('./helpers/logger');
const infoLogger = require('./helpers/infoLogger')(logger);
const globalErrorHandler = require('./helpers/globalErrorHandler')(logger);

const configureMiddlware = (app) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(compression());


    app.use(infoLogger.logInfo);

    //all the routes that API Gateway should access should be added here
    app.use(bookingController);
    app.use(feeCalculationController);
    app.use(paymentController);

    app.use(globalErrorHandler.handleError);
};

module.exports = configureMiddlware;