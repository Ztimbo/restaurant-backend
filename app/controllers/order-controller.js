'use strict'

//Library dependencies
var ObjectId = require('mongoose').Types.ObjectId; 
//Local dependencies
var errorMessage = require('../helpers/error-message');
var order = require('../models/order');

async function addOrder(req, res) {
    var newOrder = new order();
    var params = req.body;

    if(!params.table) {
        res.status(500).send({message: `${errorMessage[500].INCOMPLETE_FIELDS}`});
    } else {
        newOrder.startingDate = new Date();
        newOrder.table = params.table;
        newOrder.products = params.products;
        newOrder.active = true;
        newOrder.save((err, newOrderStored) => {
            if(err) {
                res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
            } else {
                res.status(200).send({ newOrder: newOrderStored });
            }
        });
    }
}

async function getOrder(req, res) {
    var orderId = req.params.id;

    order.findById(new ObjectId(orderId), (err, table) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!table) {
                res.status(404).send({message: `${errorMessage[404].TABLE.TABLE_NOT_FOUND}`});
            } else {
                res.status(200).send({table});
            }
        }
    }).populate('table', 'number').populate('products', 'name price');
}

module.exports = {
    addOrder,
    getOrder
};