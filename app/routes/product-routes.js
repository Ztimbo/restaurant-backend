'use strict'

//Library dependencies
var express = require('express');
//Local dependencies
var productController = require('../controllers/product-controller');
var prefix = require('../helpers/routes');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

api.post(`${prefix.PRODUCT}/save`, md_auth.ensureAuth, productController.addProduct);
api.get(`${prefix.PRODUCT}/get-all-products/:page?`, md_auth.ensureAuth, productController.getAllProducts);
api.get(`${prefix.PRODUCT}/get-product/:id`, md_auth.ensureAuth, productController.getProduct);
api.put(`${prefix.PRODUCT}/update/:id`, md_auth.ensureAuth, productController.updateProduct);

module.exports = api;