define(['templates'], function(templates) {

    function parse(input, callback) {

        var output = input;

        output = output.replace(/^#(.*?)$/gm, "<h1>$1</h1>");
        output = output.replace(/\*\*(.*?)\*\*/gm, "<strong>$1</strong>");
        output = output.replace(/\*(.*?)\*/gm, "<em>$1</em>");

        output = output.replace(/!\[(\w+)\]\((.*?)\)/gm, "<img src='$2' alt='$1' />");
        output = output.replace(/!\((.*?\.svg.*?)\)/gm, "<object data='$1' type='image/svg+xml' alt=''></object>");
        output = output.replace(/!\((.*?)\)/gm, "<img src='$1' alt='' />");

        output = output.replace(/\.svg'/g, ".svg' width='300px'");

        callback(output);

    }

    return {
        parse: parse
    };

});
