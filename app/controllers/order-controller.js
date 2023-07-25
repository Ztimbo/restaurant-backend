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

async function getActiveOrders(req, res) {
    if(req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    
    var itemsPerPage = 3;

    order.find({active: 'true'}).populate('table', 'number').populate('products', 'name price').paginate(page, itemsPerPage, function(err, orders, total) {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!orders) {
                res.status(404).send({message: `${errorMessage[404].ORDER.ORDERS_NOT_FOUND}`});
            } else {
                return res.status(200).send({pages: total, orders: orders});
            }
        }
    });
}

async function updateOrder(req, res) {
    var orderId = req.params.id;
    var update = req.body;
    
    order.findByIdAndUpdate(orderId, update, (err, orderUpdated) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!orderUpdated) {
                res.status(404).send({message: `${errorMessage[404].ORDER.NOT_UPDATED}`});
            } else {
                res.status(200).send({order: orderUpdated});
            }
        }
    });
}

module.exports = {
    addOrder,
    getOrder,
    getActiveOrders,
    updateOrder
};