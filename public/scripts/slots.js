define(['templates'], function(templates) {

    var dataContainer = null;


    var slotTemplate = templates.getHtml("#slot-item");
   
    function loadAll() {
        var slots = localStorage.slots ? JSON.parse(localStorage.slots) : [];
        return slots;
    }

    function add(content) {

        var slots = loadAll();

        slots.push(content);

	// make the new slot active
	localStorage.activeSlot = slots.length - 1;

        localStorage.slots = JSON.stringify(slots);

	renderSlots();

	// unmark the active one
	var activeSlot = document.querySelector(".slot-item.active");
	if (activeSlot) {
		var current = activeSlot.getAttribute("class");
		activeSlot.setAttribute("class", current.replace(/active/g, ''));
	}


	var current = document.querySelectorAll(".slot-item")[localStorage.activeSlot];
	var currentClasses = current.getAttribute("class");
	current.setAttribute("class", currentClasses + " active");


    }

    function renderSlots() {

        var slots = loadAll();

        var container = document.querySelector("#slots-list");

        container.innerHTML = "";

        for(var i = 0, ii = slots.length; i < ii; i++){

            var slot = slots[i];
            var slotDom = templates.getDomObject("#slot-item");

            slotDom.setAttribute("data-slotid", i);

            slotDom.innerHTML = i + 1;

            container.appendChild(slotDom);

            slotDom.addEventListener("click", function() {

                // unmark the active one
                var activeSlot = document.querySelector(".slot-item.active");
                if (activeSlot) {
                    var current = activeSlot.getAttribute("class");
                    activeSlot.setAttribute("class", current.replace(/active/g, ''));
                }

                var id = parseInt(this.getAttribute("data-slotid"));
                dataContainer.value = load(id);
                triggerEvent(dataContainer, "editor:update", {isLoad: true});

                var current = this.getAttribute("class");
                this.setAttribute("class", current + " active");

                localStorage.activeSlot = id;

            }, false);


        }

    }

    function load(slotId) {
        var slots = loadAll();
        var slot = slots[slotId];
        return slot;
    }


    function display(dataContainerRef) {

        dataContainer = dataContainerRef;

	var slots = loadAll();
	if (slots.length == 0) {
	    add(dataContainer.value);
	}

        renderSlots();

        document.querySelector("#new-slot").addEventListener("click", function() {
            add(dataContainer.value);
        }, false);

        var slotDoms = document.querySelectorAll(".slot-item");

        for(var i = 0, ii = slotDoms.length; i < ii; i++){

        }

        if (localStorage.activeSlot) {
            dataContainer.value = load(localStorage.activeSlot);
            var activeSlot = slotDoms[localStorage.activeSlot]
            var current = activeSlot.getAttribute("class");
            activeSlot.setAttribute("class", current + " active");
         }

    }

    var triggerEvent = function (el, eventName, detail) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, detail);
        el.dispatchEvent(event);
    };

    function save(content) {
        var slots = loadAll();
        var current = parseInt(localStorage.activeSlot);
        slots[current] = content;
        localStorage.slots = JSON.stringify(slots);
    }

    return {
        display: display,
        add: add,
        save: save
    };

});
