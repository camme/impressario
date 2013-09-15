(function() {

    // Bind to the content load event
    document.addEventListener("DOMContentLoaded", function() {

        // ...and remove the listener when we are done
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);

        setTimeout(function() {

            var activeId = location.hash.replace("#/", '');
            var active = document.querySelector("#" + activeId);

            var slide = active.previousSibling;
            while (slide) {
                if (slide.nodeType == 1) {
                    var currentClasses = slide.className;
                    var newClasses = currentClasses.replace(/future/g, '') + " past";
                    slide.className = newClasses;
                }
                slide = slide.previousSibling;
            }

        }, 100);

    });

})();
