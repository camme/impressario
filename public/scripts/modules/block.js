define(['templates'], function(templates) {

var blocks = {}

    function parse(input, callback) {

	blocks = {};

        var re = /'''((.|\n)*?)'''/mg;
        var match = re.exec(input);

console.log(match);

        while(match) {
console.log(match);
	    var replaced = match[1].replace(/---/g, "‑‑‑");
		var randomId = "!!!!!!:" + Math.round().toString().replace(".", '');
		blocks[randomId] = replaced;
            input = input.replace(match[0], randomId);
            //input = input.replace(match[0], "<pre>" + replaced + "</pre>");
		
            match = re.exec(input);
        }

        callback(input);

    }

    function postParse(input, callback) {
for(var key in blocks) {
	var content = blocks[key];
	
            input = input.replace(key, "<pre>" + content + "</pre>");
}
callback(input);
}

    return {
	pre: {
        	parse: parse
	},
	post: {
		parse: postParse
	}
    };

});
