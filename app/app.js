'use strict'

//Library dependencies
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var prefixes = require('./helpers/routes');
//Local dependencies
var role_routes = require('./routes/role-routes');
var user_routes = require('./routes/user-routes');
var product_routes = require('./routes/product-routes');
var table_routes = require('./routes/table-routes');
var order_routes = require('./routes/order-routes');
var app = express();

const corsOptions = {
    methods: 'GET, POST, PUT'
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(`${prefixes.API}`, role_routes);
app.use(`${prefixes.API}`, user_routes);
app.use(`${prefixes.API}`, product_routes);
app.use(`${prefixes.API}`, table_routes);
app.use(`${prefixes.API}`, order_routes);

module.exports = app;