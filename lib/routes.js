//var moments = 
var fs = require('fs');
var path = require("path");
var security = require('./security');

exports.init = function(app) {
    app.get("/status", check);
    app.get("/impressario", impressario);
    //app.get("/posts/:post", showPost);
    //app.get("/:tag", showByTags);
}

function impressario(req, res) {

    fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), 'utf-8', function(err, content) {

        res.send(content);

    });

}

function check(req, res) {

    console.log(req.user);

    if (req.user) {
        res.send("yes");
    }
    else {
        res.send("no");
    }

}


