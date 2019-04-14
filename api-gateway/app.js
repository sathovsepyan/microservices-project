var express = require('express'),
  app = express(),
  port = process.env.PORT || 7000;

const configureRoutes = require('./src/router');
const configureMiddleware = require('./src/middleware');

configureMiddleware(app);
configureRoutes(app);

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});