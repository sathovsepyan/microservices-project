'use strict';
const winston = require('winston');
const config = require('./../../config/logger-config');

require('winston-papertrail').Papertrail;
// const { PapertrailConnection, PapertrailTransport } = require('winston-papertrail');



const transports = [];
for (let i = 0; i < config.transports.length; i += 1) {
    config.transports[i].file.formatter =
        options => `${new Date().toLocaleString()}: ${options.message}`;

        transports.push(new winston.transports.File(
        config.transports[i].file
    ));
}


// const papertrailConnection = new PapertrailConnection({
//     host: 'logs.papertrailapp.com',
//     port: 16478
//   })
  
  

var winstonPapertrail = new winston.transports.Papertrail({
    host: 'logs.papertrailapp.com',
    port: 16478
});
transports.push(winstonPapertrail);

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: {
        service: 'api-gateway'
    },
    transports: transports
});


module.exports = logger;