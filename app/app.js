'use strict'

//Library dependencies
var express = require('express');
var bodyParser = require('body-parser');
var prefixes = require('./helpers/routes');
//Local dependencies
var role_routes = require('./routes/role-routes');
var user_routes = require('./routes/user-routes');
var product_routes = require('./routes/product-routes');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(`${prefixes.API}`, role_routes);
app.use(`${prefixes.API}`, user_routes);
app.use(`${prefixes.API}`, product_routes);

module.exports = app;