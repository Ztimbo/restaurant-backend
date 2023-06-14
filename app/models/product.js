'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const productSchema = schema({
    name: String,
    description: String,
    price: Number,
    active: Boolean
});

module.exports = mongoose.model('Product', productSchema);