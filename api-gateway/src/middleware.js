'use strict';
// const bodyParser = require('body-parser');
// const compression = require('compression');
const bookingService = require('./bookingService');

const configureMiddlware = (app) => {
    // CHECK IF I NEED THIS
    //   app.use(bodyParser.json());
    //   app.use(bodyParser.urlencoded({
    //     extended: true
    //   }));
    //   app.use(compression());


    app.use(bookingService)
    //all the services that API Gateway should access should be added here
};

module.exports = configureMiddlware;