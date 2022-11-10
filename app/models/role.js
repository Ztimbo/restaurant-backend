'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const roleSchema = schema({
    name: String
});

module.exports = mongoose.model('Role', roleSchema);