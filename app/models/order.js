'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

const orderSchema = schema({
    startDate: Date,
    endDate: Date,
    active: Boolean,
    table: { type: schema.Types.ObjectId, ref: 'Table' },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Order', orderSchema);