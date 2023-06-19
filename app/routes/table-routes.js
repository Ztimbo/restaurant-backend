'use strict'

//Library dependencies
var express = require('express');
//Local dependencies
var tableController = require('../controllers/table-controller');
var prefix = require('../helpers/routes');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

api.post(`${prefix.TABLE}/save`, md_auth.ensureAuth, tableController.addTable);
api.get(`${prefix.TABLE}/get-all-tables/:page?`, md_auth.ensureAuth, tableController.getAllTables);
api.get(`${prefix.TABLE}/get-table/:id`, md_auth.ensureAuth, tableController.getTable);
api.put(`${prefix.TABLE}/update/:id`, md_auth.ensureAuth, tableController.updateTable);

module.exports = api;