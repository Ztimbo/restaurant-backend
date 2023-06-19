'use strict'

//Library dependencies
var ObjectId = require('mongoose').Types.ObjectId; 
//Local dependencies
var errorMessage = require('../helpers/error-message');
var table = require('../models/table');

async function addTable(req, res) {
    var newTable = new table();
    var params = req.body;

    if(!params.number) {
        res.status(500).send({message: `${errorMessage[500].INCOMPLETE_FIELDS}`});
    } else {
        newTable.number = params.number;
        newTable.numberOfSeats = params.numberOfSeats;
        newTable.user = params.user;
        newTable.active = true;
        newTable.save((err, newTableStored) => {
            if(err) {
                res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
            } else {
                res.status(200).send({ newTable: newTableStored });
            }
        });
    }
}

async function getTable(req, res) {
    var tableId = req.params.id;

    table.findById(new ObjectId(tableId), (err, table) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!table) {
                res.status(404).send({message: `${errorMessage[404].TABLE.TABLE_NOT_FOUND}`});
            } else {
                res.status(200).send({table});
            }
        }
    }).populate('user', 'name surname');
}

async function getAllTables(req, res) {
    if(req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    
    var itemsPerPage = 3;

    table.find().populate('user', 'name surname').sort('number').paginate(page, itemsPerPage, function(err, tables, total) {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!tables) {
                res.status(404).send({message: `${errorMessage[404].TABLE.TABLES_NOT_FOUND}`});
            } else {
                return res.status(200).send({pages: total, tables: tables});
            }
        }
    });
}

async function updateTable(req, res) {
    var tableId = req.params.id;
    var update = req.body;
    
    table.findByIdAndUpdate(tableId, update, (err, tableUpdated) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!tableUpdated) {
                res.status(404).send({message: `${errorMessage[404].TABLE.NOT_UPDATED}`});
            } else {
                res.status(200).send({table: tableUpdated});
            }
        }
    });
}

module.exports = {
    addTable,
    getTable,
    getAllTables,
    updateTable
};