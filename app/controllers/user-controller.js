'use strict'

//Library dependencies
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var ObjectId = require('mongoose').Types.ObjectId; 
//Local dependencies
var errorMessage = require('../helpers/error-message');
var user = require('../models/user');
var jwt = require('../services/jwt');

async function addUser(req, res) {
    var newUser = new user();
    var params = req.body;

    newUser.name = params.name;
    newUser.surname = params.surname;
    newUser.username = params.username;
    newUser.role = params.role;
    newUser.active = true;

    if(params.password) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
            if(!err) {
                if(newUser.name && newUser.surname && newUser.username && newUser.role) {
                    newUser.password = hash;
                    newUser.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
                        } else if(!userStored) {
                            res.status(404).send({message: `${errorMessage[404].USER.USER.NOT_SAVED}`});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    });
                } else {
                    res.status(500).send({message: `${errorMessage[500].INCOMPLETE_FIELDS}: ${err.message}`});
                }
            } else {
                res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
            }
        });
    } else {
        res.status(500).send({message: `${errorMessage[500].USER.PASSWORD_NOT_PROVIDED}`});
    }
}

async function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    
    user.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!userUpdated) {
                res.status(404).send({message: `${errorMessage[404].USER.NOT_UPDATED}`});
            } else {
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

async function getUser(req, res) {
    var userId = req.params.id;

    user.findById(new ObjectId(userId), (err, user) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!user) {
                res.status(404).send({message: `${errorMessage[404].USER.USER_NOT_FOUND}`});
            } else {
                res.status(200).send({user});
            }
        }
    }).populate({path: 'role'});
}

async function getAllUsers(req, res) {
    if(req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    
    var itemsPerPage = 3;

    user.find().populate('role', 'name').sort('name').select('name surname').paginate(page, itemsPerPage, async function(err, users, total) {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!users) {
                res.status(404).send({message: `${errorMessage[404].USER.USERS_NOT_FOUND}`});
            } else {
                return res.status(200).send({pages: total, users: users});
            }
        }
    });
}

async function login(req, res) {
    var params = req.body;
    var username = params.username;
    var password = params.password;

    user.findOne({username: username.toLowerCase(), active: true}, (err, user) => {
        if(err) {
            res.status(500).send({message: `${errorMessage[500].SERVER_ERROR}: ${err.message}`});
        } else {
            if(!user) {
                res.status(404).send({message: `${errorMessage[404].USER.USER_NOT_FOUND}`});
            } else {
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check) {
                        if(params.getHash) {
                            res.status(200).send({ token: jwt.createToken(user) });
                        } else {
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({message: `${errorMessage[404].USER.USER_NOT_FOUND}`});
                    }
                });
            }
        }
    });
}

module.exports = {
    addUser,
    updateUser,
    getUser,
    getAllUsers,
    login
};