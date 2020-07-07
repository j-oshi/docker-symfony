//$(function () {

//    $("#find").click(function () {
//        $("#geocomplete").trigger("geocode");
//    });
//});

if (window.addEventListener) {
    window.addEventListener('load', initializeNewMap())

    //window.addEventListener('load', calcRoute)
} else {
    window.attachEvent('onload', initializeNewMap())
    //window.attachEvent('onload', calcRoute)
}

//var map;
function initializeNewMap() {
    var map = $("#geocomplete").geocomplete({
        map: ".map_canvas",
        details: "form",
        types: ["geocode", "establishment"],
    });
    google.maps.event.addListener(map, "idle", function () {
        google.maps.event.trigger(map, 'resize');
    });
    //google.maps.event.trigger(map, "resize");
}

