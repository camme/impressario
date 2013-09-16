// module for loading and saving user data into a json file
var fs = require("fs");
var path = require("path");
var dataFile = "";
var usersData = {users: []};

// a hash list with users by full name
var usersHashById = {};

var save = function() {
    checkIfDataIsLoaded();
    fs.writeFileSync(dataFile, JSON.stringify(usersData, null, "\t"), "utf-8");
};

var add = function(user) {
	var exists = get(user);
	if (!exists) {
		usersHashById[user.id] = user;
        usersData.users.push(user);
		save();
	}
	return exists;
};

var get = function (id) {
	var user = usersHashById[id];
	return user;
}

function checkIfDataIsLoaded() {
    if (usersData === null) {
        throw "Please load the datafile first with .load(fileName). This is just done once";
    }
}

function load() {
	createFolders(dataFile);
	try {
    	usersData = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
	}
	catch(err) {
		usersData = {users:[]};
		save();
	}
    for (var i = 0, ii = usersData.users.length; i < ii; i++) {
        var user = usersData.users[i];
        usersHashById[user.id] = user;
    }
}

exports.load = function(fileName) {
    if (!fileName) {
        throw "Please provide a file name for the data file";
    }
	dataFile = fileName;
    load();
	return exports;
};


// randomString returns a pseude-random ASCII string which contains at least the specified number of bits of entropy
// the return value is a string of length ⌈bits/6⌉ of characters from the base64 alphabet
function randomString(bits) {
	var chars,rand,i,ret;

	chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
	ret='';

	// in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
	while(bits > 0) {
    	rand = Math.floor(Math.random()*0x100000000); // 32-bit integer

		// base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.
    	for(i=26; i>0 && bits>0; i-=6, bits-=6) ret+=chars[0x3F & rand >>> i];
	}
  	return ret;
}

function createFolders(pathToCheck) {
    pathToCheck = path.dirname(pathToCheck);
    var pathParts = pathToCheck.split('/');
    var pathToProcess = "";
    for(var i = 0, ii = pathParts.length; i < ii; i++) {
        pathToProcess += pathParts[i] + "/"; 
        var exists =  path.existsSync(pathToProcess);
        if (!exists) {
            console.log("\tcreate folder " + pathToProcess);
            fs.mkdirSync(pathToProcess, 0775);
        }
    }
}



exports.get = get;
exports.save = save;
exports.add = add;



