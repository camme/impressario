define(['templates'], function(templates) {

    function parse(input, callback) {

        var re = /""(.*?)""/gm;

        var match = re.exec(input);

        while(match) {
            var replaced = match[1].replace(/ /g, "&nbsp;");
            input = input.replace(match[0], replaced);
            match = re.exec(input);
        }


        callback(input);
    }

    return {
        parse: parse
    };

});

