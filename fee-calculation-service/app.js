var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

const configureRoutes = require('./src/fee-calculation');

configureRoutes(app);

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});