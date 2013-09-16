define(['lib/text!templates.html'], function(templates) {

    var virtualBody = document.createElement("div");

    virtualBody.innerHTML = templates;

    function getHtml(fieldId) {

        var dom = virtualBody.querySelector(fieldId);

        if (dom) {
            var div = document.createElement('div');
            div.innerHTML = dom.outerHTML;
            dom = div.firstChild;
            dom.removeAttribute("id");
        }

        return dom ? dom.outerHTML : "";

    }

    function getDomObject(fieldId) {

        var html = getHtml(fieldId);

        var div = document.createElement('div');
        div.innerHTML = html;

        return div.firstChild;

    }

    return {
        getHtml: getHtml,
        getDomObject: getDomObject
    };


});
