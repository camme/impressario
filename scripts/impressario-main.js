require([
    'lib/impress', 
    'slots', 
    'modules/preprocessor', 
    'modules/classer',
    'modules/markdownlight',
    'modules/slide',
    'lib/domready'
    ], function(ignore, slots, pre, classer, markdownlight, slide, domready) {

    var full = localStorage.full == "true";
    var extenders = [pre, slide, classer, markdownlight];
    var impressCounter = -1;
    var impressAPI = null;

    function Editor(input, impressOrgDom) {

        var oldActive = false;

        var update = function (event) {

            if ( event.keyCode === 9 || ( event.keyCode >= 33 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
                move();
                return;
            }

            var impressDom = document.getElementById("impress-" + impressCounter);

            if (impressDom){
                document.body.removeChild(impressDom);
            }

            var html = input.value;

            for(var i = 0, ii = extenders.length; i < ii; i++){
                var extender = extenders[i];
                html = extender.parse(html);
            }

            impressCounter++;

            impressOrgDom.innerHTML = html;

            impressDom = document.createElement("div");
            impressDom.setAttribute("id", "impress-" + impressCounter);
            impressDom.innerHTML = html;

            document.body.appendChild(impressDom);

            impressAPI = impress("impress-" + impressCounter);
            impressAPI.init();

            setMode(full);

            move();

        };

        var move = function() {
            var active = getSlideNr(input.selectionStart);
            if (oldActive !== active) {
                impressAPI.goto(active);
                oldActive = active;
            }
        }

        var getSlideNr = function(position) {
            var rest = input.value.substring(0, position);
            var slides = rest.split("---");
            return slides.length - 1;
        }

        input.addEventListener("click", move, false);

        input.editor = this;

        update({});

        var keyupTimeout = -1;

        input.addEventListener("keyup", function(event) {

            // Dont update dirclty. We dont want to update for every charachter that is entered
            clearTimeout(keyupTimeout);
            keyupTimeout = setTimeout(function() {
                update(event);
                slots.save(input.value);
            }, 200);

        }, false);

        input.addEventListener("editor:update", function(event) {
            update(event);
            impressAPI.goto(0);
            oldActive = 0;
        }, false);

    }

    var $ = function (id) { return document.getElementById(id); };


    domready(function() {

        slots.display($("edit"));

        $("full").addEventListener("click", function() {
            full = !full;
            localStorage.full = full;
            setMode(full);
        }, false);


        new Editor($("edit"), $("impress-org"));

    });


    function setMode(full) {

        if (full) {
            $("author-area").style.display = "none";
            $("full").innerHTML = "SHOW EDIT";
            document.querySelector("#impress-" + impressCounter).style.left = "50%";
        }
        else {
            $("author-area").style.display = "block";
            $("full").innerHTML = "HIDE EDIT";
            document.querySelector("#impress-" + impressCounter).style.left = "75%";
        }

        if (impressAPI) {
            impressAPI.useKeys(full);
        }

    }

    setMode(full);




    });
