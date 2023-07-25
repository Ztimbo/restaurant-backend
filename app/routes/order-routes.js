'use strict'

//Library dependencies
var express = require('express');
//Local dependencies
var orderController = require('../controllers/order-controller');
var prefix = require('../helpers/routes');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

api.post(`${prefix.ORDER}/save`, md_auth.ensureAuth, orderController.addOrder);
api.get(`${prefix.ORDER}/get-order/:id`, md_auth.ensureAuth, orderController.getOrder);
api.get(`${prefix.ORDER}/get-active-orders/:page?`, md_auth.ensureAuth, orderController.getActiveOrders);
api.put(`${prefix.ORDER}/update/:id`, md_auth.ensureAuth, orderController.updateOrder);

module.exports = api;