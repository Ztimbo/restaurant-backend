'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const tableSchema = schema({
    number: Number,
    numberOfSeats: Number,
    active: Boolean,
    user: { type: schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Table', tableSchema);