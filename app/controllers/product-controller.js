'use strict'

//Library dependencies
var ObjectId = require('mongoose').Types.ObjectId; 
//Local dependencies
var errorMessage = require('../helpers/error-message');
var product = require('../models/product');

async function addProduct(req, res) {
    var newProduct = new product();
    var params = req.body;

    if(!params.name) {
        res.status(500).send({message: `${errorMessage[500].INCOMPLETE_FIELDS}`});
    } else {
        newProduct.name = params.name;
        newProduct.description = params.description;
        newProduct.price = params.price;
        newProduct.active = true;
        newProduct.save((err, newProductStored) => {
            if(err) {
                res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
            } else {
                res.status(200).send({ newProduct: newProductStored });
            }
        });
    }
}

async function getProduct(req, res) {
    var productId = req.params.id;

    product.findById(new ObjectId(productId), (err, product) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!product) {
                res.status(404).send({message: `${errorMessage[404].PRODUCT.PRODUCT_NOT_FOUND}`});
            } else {
                res.status(200).send({product});
            }
        }
    });
}

async function getAllProducts(req, res) {
    if(req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    
    var itemsPerPage = 3;

    product.find().sort('name').paginate(page, itemsPerPage, function(err, products, total) {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!products) {
                res.status(404).send({message: `${errorMessage[404].PRODUCT.PRODUCT_NOT_FOUND}`});
            } else {
                return res.status(200).send({pages: total, products: products});
            }
        }
    });
}

async function updateProduct(req, res) {
    var productId = req.params.id;
    var update = req.body;
    
    product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!productUpdated) {
                res.status(404).send({message: `${errorMessage[404].PRODUCT.NOT_UPDATED}`});
            } else {
                res.status(200).send({product: productUpdated});
            }
        }
    });
}

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct
};