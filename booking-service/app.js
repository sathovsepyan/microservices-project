var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  
const bodyParser = require('body-parser');
const compression = require('compression');
const configureRoutes = require('./src/booking');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compression());
configureRoutes(app);

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});