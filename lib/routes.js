//var moments = 
var fs = require('fs');
var security = require('./security');

exports.init = function(app) {
    app.get("/status", check);
    //app.get("/posts/:post", showPost);
    //app.get("/:tag", showByTags);
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


