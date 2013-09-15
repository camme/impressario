define(['templates'], function(templates) {

    var template = templates.getHtml("#field-slide");

    function parse(input, callback) {

        var slides = input.split("---");

        var output = "";
        var posY = 0;
        var posX = 0;
        var rotateZ = 0;
        var rotateX = 0;
        var rotateY = 0;

        for(var i = 0, ii = slides.length; i < ii; i++){

            var slide = slides[i];

            var posRe = /^([,\dR\-LDUZXY]+)/g;
            var posInfoMatch = slide.match(posRe);
            var posInfo = posInfoMatch ? posInfoMatch[0] : "D";

            slide = slide.replace(posRe, '');

            var slideHtml = template;
            slideHtml = slideHtml.replace("{{content}}", slide);

            var posInfoList = posInfo.split(',');

            for(var j = 0, jj = posInfoList.length; j < jj; j++){

                var fullCommand = posInfoList[j];

                var valueMatch = (/([\d-]+)/g).exec(fullCommand);
                var value = valueMatch ? parseInt(valueMatch[1]) : null;
                var command = fullCommand.replace(/([-\d]+)/g, '');

                switch(command) {
                    case "RZ": rotateZ += (value ? value : 0); break;
                    case "RX": rotateX += (value ? value : 0); break;
                    case "RY": rotateX += (value ? value : 0); break;
                    case "R": posX += (value ? value : 1000); break;
                    case "L": posX -= (value ? value : 1000); break;
                    case "U": posY -= (value ? value : 1000); break;
                    default: posY += (value ? value : 800);
                }

            }



            slideHtml = slideHtml.replace("{{y}}", posY);
            slideHtml = slideHtml.replace("{{x}}", posX);
            slideHtml = slideHtml.replace("{{rotate-z}}", rotateZ);
            slideHtml = slideHtml.replace("{{rotate-x}}", rotateX);
            slideHtml = slideHtml.replace("{{rotate-y}}", rotateY);


            output += slideHtml;
        }

        callback(output);

    }

    return {
        parse: parse
    };

});
