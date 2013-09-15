define(['templates'], function(templates) {

        var runMatchs = function(list, output, next) {

            var match = list.shift();
            if (match) {

                require(['lib/text!../' + match[1]], function(svg) {

                    var tempDomObj = document.createElement("div");
                    tempDomObj.innerHTML = svg;

                    var svgContent = tempDomObj.querySelector("svg");
                    svgContent.setAttribute("width", "300px");
                    svgContent.setAttribute("height", '100%');
                    if (match[2]) {
                        svgContent.setAttribute("style", 'fill: ' + match[2]);
                    }


                    var tempDomObj = document.createElement("div");
                    tempDomObj.appendChild(svgContent);

                    var filteredSvg = tempDomObj.innerHTML;

                    console.log(match[0]);

                    output = output.replace(match[0], filteredSvg);

                    runMatchs(list, output, next);

                });

            }
            else {
                next(output);
            }

        }


    function parse(input, callback) {

        var output = input;
        var list = [];

        var re = /!i\((.*?\.svg.*?)\)/gmi;
        var match = re.exec(output);

        while(match) {
            list.push(match);
            match = re.exec(output);
        }

        var re = /!i\[(.*?)\]\((.*?\.svg.*?)\)/gmi;
        var match = re.exec(output);

        while(match) {
            list.push([match[0], match[2], match[1]]);
            match = re.exec(output);
        }



        runMatchs(list, output, callback);

    }

    return {
        parse: parse
    };

});
