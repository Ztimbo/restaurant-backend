'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const userSchema = schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    active: Boolean,
    role: { type: schema.Types.ObjectId, ref: 'Role' }
});

module.exports = mongoose.model('User', userSchema);