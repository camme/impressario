define(['templates'], function(templates) {

    function parse(input) {

        var output = input;

        var leftTemplate = templates.getHtml("#field-left");
        leftTemplate = leftTemplate.replace("{{content}}", "$1");
        output = output.replace(/^!L(.*?)$/gm, leftTemplate);

        return output;

    }

    return {
        parse: parse
    };

});
