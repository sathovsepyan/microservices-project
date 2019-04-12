var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000;

const configureRoutes = require('./src/payment');

configureRoutes(app);

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});