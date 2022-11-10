'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var errorMessage = require('../helpers/error-message');

var secret = 'el_dante';

exports.ensureAuth = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({message: `${errorMessage[403].REQUEST.AUTH_HEADER_NOT_SENT}`});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()) {
            console.log(ex);
            return res.status(401).send({message: `${errorMessage[401].REQUEST.TOKEN_EXPIRED}`});
        }
    } catch(ex) {
        console.log(ex);
        return res.status(404).send({message: `${errorMessage[404].REQUEST.INVALID_TOKEN}`});
    }

    req.user = payload;
    next();
}