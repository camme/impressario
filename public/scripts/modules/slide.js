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

            var posRe = /(^(,|\s|\d|r|d|\-|u|l|rx(|=|-|:)|ry(|=|-|:)|rz(|=|-|:)|right|left|up|down|rotate-y(|=|-|:)\d+|rotate-x(|=|-|:)\d+|rotate\-z(|=|-|:)\d+)+?\n)/g;
            var posInfoMatch = slide.match(posRe);
            var posInfo = posInfoMatch ? posInfoMatch[0] : "D";
	    posInfo = posInfo.replace(/\s/g, "");

            posInfo = posInfo.replace(/right/, "r");
            posInfo = posInfo.replace(/left/, "l");
            posInfo = posInfo.replace(/up/, "u");
            posInfo = posInfo.replace(/down/, "d");
            posInfo = posInfo.replace(/rotate-y/, "ry");
            posInfo = posInfo.replace(/rotate-x/, "rx");
            posInfo = posInfo.replace(/rotate-z/, "rz");

            slide = slide.replace(posRe, '');

            

            var slideHtml = template;
            slideHtml = slideHtml.replace("{{content}}", slide);

            var posInfoList = posInfo.split(',');

            for(var j = 0, jj = posInfoList.length; j < jj; j++){

                var fullCommand = posInfoList[j];

                var valueMatch = (/([\d-]+)/g).exec(fullCommand);
                var value = valueMatch ? parseInt(valueMatch[1]) : null;
                var command = fullCommand.replace(/([:-\d=]+)/g, '');

                switch(command) {
                    case "rz": rotateZ += (value ? value : 0); break;
                    case "rx": rotateX += (value ? value : 0); break;
                    case "ry": rotateX += (value ? value : 0); break;
                    case "r": posX += (value ? value : 1000); break;
                    case "l": posX -= (value ? value : 1000); break;
                    case "u": posY -= (value ? value : 1000); break;
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
