define(['templates'], function(templates) {

    var template = templates.getHtml("#field-row");

    function parse(input, callback) {
        input = input.replace(/(\[.*\]\[.*\])/gi, "<div class='field-row'>$1</div>")
        callback(input);
    }

    return {
        parse: parse
    };

});
