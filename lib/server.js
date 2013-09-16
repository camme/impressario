// the event framework
var nunt = require('nunt');
var config = require('../config');
var users = require('./usermodel').load('./data/users.json');
var everyauth = require('everyauth');
var path = require("path");
var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var routes = require('./routes').init(app);
var security = require('./security').init(app);

// init nunt
nunt.init({
    server: server,
    load: [__dirname + "/logic"],
    silent: true
});

app.configure(function(){
    app.use(nunt.middleware());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret:'dkjnwhodunnit' }));
    app.use(
        require('stylus').middleware({
            force: false,
            compress: true,
            src: path.join(__dirname,'..', "public"),
            dest: path.join(__dirname, '..', "public")
        })
    );
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(app.router);
    app.use(everyauth.middleware());
});

// connect the socket server
server.listen(config.server.port);

module.exports = server;


