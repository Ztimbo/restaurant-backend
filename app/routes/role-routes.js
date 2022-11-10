'use strict'

//Library dependencies
var express = require('express');
//Local dependencies
var roleController = require('../controllers/role-controller');
var prefix = require('../helpers/routes');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

api.post(`${prefix.ROLE}/save`, md_auth.ensureAuth, roleController.addRole);

module.exports = api;