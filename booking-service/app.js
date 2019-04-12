var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const configureRoutes = require('./src/booking');

configureRoutes(app);

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});