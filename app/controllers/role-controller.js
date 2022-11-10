'use strict'

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
        newRole.save((err, newRoleStored) => {
            if(err) {
                res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
            } else {
                res.status(200).send({ newRole: newRoleStored });
            }
        });
    }
}

module.exports = {
    addRole
};