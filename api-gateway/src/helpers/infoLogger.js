'use strict';
const infoLogger = (logger) => {
    const logInfo = (req, res, next) => {
        let message = `Recieved request ${req.method} ${req.originalUrl}`;
        if (req.method !== 'GET') {
            message += `\n\t\t\tbody: ${JSON.stringify(req.body)}`;
        }

        logger.info(message);
        console.log("I will goto the STDOUT");
        console.log(message);
        console.error("I will goto the STDERR");


        const end = res.end;
        res.end = (body, encoding) => {
            logger.info(`Processed request ${req.method} ${req.originalUrl} ` +
                `statusCode=${res.statusCode}`);

            console.log(`Processed request ${req.method} ${req.originalUrl} ` +
            `statusCode=${res.statusCode}`);


            res.end = end;
            res.end(body, encoding);
        };
        next();
    };

    const publicInterface = {
        logInfo
    };
    return publicInterface;
};

module.exports = infoLogger;