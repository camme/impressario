define(['templates'], function(templates) {

    function parse(input, callback) {

        var output = input;

        var leftTemplate = templates.getHtml("#field-left");
        leftTemplate = leftTemplate.replace("{{content}}", "$1");
        output = output.replace(/^!L(.*?)$/gm, leftTemplate);

        callback(output);

    }

    return {
        parse: parse
    };

});
