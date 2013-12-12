define(['templates'], function(templates) {

    function parse(input, callback) {

        var output = input;

	//output = output.replace(/([\w\W])(\s)([\w\W])/g, "$1!SPACE!$3");
        //output = output.replace(/\s/g, '');
        //output = output.replace(/!SPACE!/g, ' ');

        output = output.replace(/\>(.*?)$/gm, "<blockquote>$1</blockquote>");
        output = output.replace(/^#(.*?)$/gm, "<h1>$1</h1>");
        output = output.replace(/\*\*(.*?)\*\*/gm, "<strong>$1</strong>");
        output = output.replace(/\*(.*?)\*/gm, "<em>$1</em>");

        output = output.replace(/!\[(\w+)\]\((.*?)\)/gm, "<img src='$2' alt='$1' />");
        output = output.replace(/!\((.*?\.svg.*?)\)/gm, "<object data='$1' type='image/svg+xml' alt=''></object>");
        output = output.replace(/!\((.*?)\)/gm, "<img src='$1' alt='' />");

        output = output.replace(/\.svg'/g, ".svg' width='300px'");


	var re = /(>|---)([\s\wåäö]+)($|<|---)/ig;
	//var textMatch = re.exec(output);

	output = output.replace(re, "$1<span>$2</span>$3");
	//output = output.replace(/(>)([\s\w\W]+)$/g, "$1<span>$2</span>");
	//output = output.replace(/(>)([\s\w\W]+)(---)/g, "$1<span>$2</span>$3");


        output = output.replace(/[\t]/g, '');

	output = output.replace(/<span>\n<\/span>/g, "");



        callback(output);

    }

    return {
        parse: parse
    };

});
