'use strict';
// const bodyParser = require('body-parser');
// const compression = require('compression');
const bookingService = require('./bookingService');


const logger = require('./logger');
const infoLogger = require('./infoLogger')(logger);
const globalErrorHandler = require('./globalErrorHandler')(logger);

const configureMiddlware = (app) => {
    // CHECK IF I NEED THIS
    //   app.use(bodyParser.json());
    //   app.use(bodyParser.urlencoded({
    //     extended: true
    //   }));
    //   app.use(compression());

    app.use(infoLogger.logInfo);

    //all the services that API Gateway should access should be added here\
    app.use(bookingService)


    app.use(globalErrorHandler.handleError);
};

module.exports = configureMiddlware;