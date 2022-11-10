'use strict'

var mongoose = require('mongoose');
var app = require('./app/app');
var port = process.env.port || 3990;

mongoose.connect('mongodb://localhost:27017/restaurant', (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log('db connection established');
        app.listen(port, () => {
            console.log('server running in http://localhost:3990');
        });
    }
});