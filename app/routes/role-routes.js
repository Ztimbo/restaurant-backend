'use strict'

//Library dependencies
var express = require('express');
//Local dependencies
var roleController = require('../controllers/role-controller');
var prefix = require('../helpers/routes');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

api.post(`${prefix.ROLE}/save`, md_auth.ensureAuth, roleController.addRole);
api.get(`${prefix.ROLE}/get-all-roles/:page?`, md_auth.ensureAuth, roleController.getAllRoles);
api.get(`${prefix.ROLE}/get-role/:id`, md_auth.ensureAuth, roleController.getRole);
api.put(`${prefix.ROLE}/update/:id`, md_auth.ensureAuth, roleController.updateRole);

module.exports = api;