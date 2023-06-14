'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const roleSchema = schema({
    name: String,
    active: Boolean
});

module.exports = mongoose.model('Role', roleSchema);