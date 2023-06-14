'use strict'

//Library dependencies
var ObjectId = require('mongoose').Types.ObjectId; 
//Local dependencies
var errorMessage = require('../helpers/error-message');
var role = require('../models/role');

async function addRole(req, res) {
    var newRole = new role();
    var params = req.body;

    if(!params.name) {
        res.status(500).send({message: `${errorMessage[500].INCOMPLETE_FIELDS}`});
    } else {
        newRole.name = params.name;
        newRole.active = true;
        newRole.save((err, newRoleStored) => {
            if(err) {
                res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
            } else {
                res.status(200).send({ newRole: newRoleStored });
            }
        });
    }
}

async function getRole(req, res) {
    var roleId = req.params.id;

    role.findById(new ObjectId(roleId), (err, role) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!role) {
                res.status(404).send({message: `${errorMessage[404].ROLE.ROLE_NOT_FOUND}`});
            } else {
                res.status(200).send({role});
            }
        }
    });
}

async function getAllRoles(req, res) {
    if(req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    
    var itemsPerPage = 3;

    role.find().sort('name').paginate(page, itemsPerPage, function(err, roles, total) {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!roles) {
                res.status(404).send({message: `${errorMessage[404].ROLE.ROLES_NOT_FOUND}`});
            } else {
                return res.status(200).send({pages: total, roles: roles});
            }
        }
    });
}

async function updateRole(req, res) {
    var roleId = req.params.id;
    var update = req.body;
    
    role.findByIdAndUpdate(roleId, update, (err, roleUpdated) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!roleUpdated) {
                res.status(404).send({message: `${errorMessage[404].ROLE.NOT_UPDATED}`});
            } else {
                res.status(200).send({role: roleUpdated});
            }
        }
    });
}

module.exports = {
    addRole,
    getRole,
    getAllRoles,
    updateRole
};