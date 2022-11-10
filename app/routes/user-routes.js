'use strict'

//Library dependencies
var express = require('express');
//Local dependencies
var userController = require('../controllers/user-controller');
var prefix = require('../helpers/routes');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();
api.post(`${prefix.USER}/save`, userController.addUser);
api.put(`${prefix.USER}/update/:id`, md_auth.ensureAuth, userController.updateUser);
api.get(`${prefix.USER}/get-all-users/:page?`, md_auth.ensureAuth, userController.getAllUsers);
api.get(`${prefix.USER}/get-user/:id`, md_auth.ensureAuth, userController.getUser);

api.post(`${prefix.USER}/login`, userController.login);

module.exports = api;