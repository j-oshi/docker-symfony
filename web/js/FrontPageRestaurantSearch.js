$(function () {

    $(".geocomplete").geocomplete({
        details: "#addressDetails",
        types: ["geocode", "establishment"]
    });
    $('#presearch').hide();
    FrontSearchBar();
    deviceLocationSearchBar();
    previoussearch();
    PreviousSearchToggle();

    $('#btnLoadMore').hide();
    $('.center-parent').hide();

    $("#search-result").niceScroll({ cursorborder: "", cursorcolor: "#EB5E28", boxzoom: false });

    $(window).bind('resize', function (event) {
        searchSize();
    });
});

function FrontSearchBar() {

    $('#FrontPageSearch').click(function (e) {
        
        if ($('#search-address').val() !== "") {
            $("#geocomplete").trigger("geocode");
            $('.center-parent').show();
            var latitude = $("input[name=lat]").val();
            var longitude = $("input[name=lng]").val();

            if ((latitude > -90 || latitude < 90) && (longitude > -180 || longitude < 180)) {

                var restaurantSearchObject = {
                    african_cuisine: $('#african_cuisine').val(),
                    proximity_distance: $('#proximity_distance').val(),
                    lat: latitude,
                    lng: longitude
                };

                console.log(restaurantSearchObject);
                //JSON data
                var dataType = 'application/json; charset=utf-8';

                $.ajax({
                    type: 'POST',
                    url: "/Home/Locate",
                    dataType: 'json',
                    contentType: dataType,
                    data: JSON.stringify(restaurantSearchObject),
                    success: function (output) {
                        $('.center-parent').hide();
                        $('#menu-card').html('');

                        if (output.length !== 0) {
                            var rHTML = '<h4><span class="address-color">' + output.length + '</span> restaurant found within <span class="address-color">' + $('#proximity_distance').val() + ' Km</span> of  <span class="address-color">' + $('#search-address').val() + '</span>.</h4>';
                            $('#search-result-title').html(rHTML);
                            var lat = $('#lat').val();
                            var lng = $('#lng').val();
                            var trHTML = '';
                         
                            $.each(output, function (i, item) {

                                trHTML += '<section class="restaurant-search-result hid">';
                                trHTML += '<div class="restaurant-search-result-image-container"><div class="restaurant-search-result-image-container-inner"><a href="/Home/Restaurant/' + item.Id + '"><img src="" data-src="' + stripImageUrl(item.ProfileImage) + '" width="120" height="82.5"></a></div></div>';
                                trHTML += '<div class="restaurant-search-result-container">';
                                trHTML += '<div class="restaurant-search-result-container-title"><h4><a href="/Home/Restaurant/' + item.Id + '">' + item.Name + '</a></h4></div>';
                                trHTML += '<div class="restaurant-search-result-container-cuisine"><i class="fa fa-cutlery"></i> ' + item.Cuisine + '</div>';
                                trHTML += '<div class="restaurant-search-result-container-address">' + item.Address + '</div>';
                                trHTML += '<div class="restaurant-search-result-container-opening-hour">' + openingTime(item.Sunday, item.Monday, item.Tuesday, item.Wednesday, item.Thursday, item.Friday, item.Saturday) + '</div>';
                                trHTML += '</div>';
                                trHTML += '<div class="restaurant-search-result-distance">';
                                trHTML += '<div class="geographical-distance"><div class="proximity-distance"data-toggle="tooltip" title="Click here to get direction!"><i class="fa fa-location-arrow" aria-hidden="true"></i> ' + round(item.Distance, 2) + '</div><div hidden>' + drivingDistances(lat, lng, item.Latitude, item.Longitude, item.Id) + '</div><div class="drivingPopUp" id="' + item.Id + '"  onclick="open_search_map(' + item.Latitude + ',' + item.Longitude + ')"></div></div></div>';
                                trHTML += '<div id="dlat" class="hidden">' + item.Latitude + '</div><div id="dlng" class="hidden">' + item.Longitude + '</div>';
                                trHTML += '</div>';
                                trHTML += '</section>';

                                $('#search-result').html(trHTML);
                            });
                            
                            loadPictures();

                            $("#btnLoadMore").on("click", loadMore);

                        } else {
                            $("#btnLoadMore").hide();
                            var yHTML = '<div class="col-md-12">There are no restaurant found within <span class="address-color">' + $('#proximity_distance').val() + ' Km</span> of  <span class="address-color">' + $('#search-address').val() + '</span>.</div>';
                            $('#search-result-title').html(yHTML);
                            var tHTML = '';
                            tHTML += '<div class="col-md-12">Please try using another address or postcode.</div>';
                            tHTML += '<div class="col-md-12">You can also increase the search distance.</div>';
                            $('#search-result').html(tHTML);
                        }

                        var SearchObject = {
                            Searchlat: latitude,
                            Searchlng: longitude,
                            SearchResults: output
                        };

                        sessionStorage.output = JSON.stringify(SearchObject);

                    },
                    error: function () {
                        $("#btnLoadMore").hide();
                        var trHTML = '';
                        trHTML += '<div class="col-md-12">Trouble fetching data.</div>';
                        trHTML += '<div class="col-md-12">Please enter a valid address.</div>';
                        $('#search-result').html(trHTML);
                    }
                });
            } else {
                var trHTML = '';
                trHTML += '<div class="col-md-12">Please enter valid a address or postcode.</div>';
                $('#search-result').html(trHTML);
            }

        } else {
            var tHTML = '';
            tHTML += '<div class="col-md-12">Please enter valid a address or postcode.</div>';
            $('#search-result').html(tHTML);
        }
    });
}

function deviceLocationSearchBar() {
    $('#GetCurrentLocation').click(function (e) {
        $('.center-parent').show();
        if (navigator.geolocation) {
            $('.center-search').hide();
            $('#menu-card').html('');
            var timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
              displayPosition,
              displayError,
              { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
        }
        else {
            alert("Geolocation is not supported by this browser");
        }

    });
}


function displayPosition(position) {
    $("#current-lat").val(position.coords.latitude);
    $("#current-lng").val(position.coords.longitude);

    var currentSearchObject = {
        african_cuisine: $('#african_cuisine').val(),
        proximity_distance: $('#proximity_distance').val(),
        lat: $("#current-lat").val(),
        lng: $("#current-lng").val()
    };

    //JSON data
    var dataType = 'application/json; charset=utf-8';

    $.ajax({
        type: 'POST',
        url: "/Home/Locate",
        dataType: 'json',
        contentType: dataType,
        data: JSON.stringify(currentSearchObject),
        success: function (output) {
            $('.center-parent').hide();
            if (output.length !== 0) {
                
                var rHTML = '<div class=""><span class="address-color">' + output.length + '</span> restaurant found within <span class="address-color">' + $('#proximity_distance').val() + ' Km</span> from your current location.</div>';
                $('#search-result-title').html(rHTML);

                var lat = $('#current-lat').val();
                var lng = $('#current-lng').val();

                var trHTML = '';
                $.each(output, function (i, item) {

                    trHTML += '<section class="restaurant-search-result">';
                    trHTML += '<div class="restaurant-search-result-image-container"><div class="restaurant-search-result-image-container-inner"><a href="/Home/Restaurant/' + item.Id + '"><img src="" data-src="' + stripImageUrl(item.ProfileImage) + '" width="120" height="82.5"></a></div></div>';
                    trHTML += '<div class="restaurant-search-result-container">';
                    trHTML += '<div class="restaurant-search-result-container-title"><h4><a href="/Home/Restaurant/' + item.Id + '">' + item.Name + '</a></h4></div>';
                    trHTML += '<div class="restaurant-search-result-container-cuisine"><i class="fa fa-cutlery"></i> ' + item.Cuisine + '</div>';
                    trHTML += '<div class="restaurant-search-result-container-address">' + item.Address + '</div>';
                    trHTML += '<div class="restaurant-search-result-container-opening-hour">' + openingTime(item.Sunday, item.Monday, item.Tuesday, item.Wednesday, item.Thursday, item.Friday, item.Saturday) + '</div>';
                    trHTML += '</div>';
                    trHTML += '<div class="restaurant-search-result-distance">';
                    trHTML += '<div class="geographical-distance"><div class="proximity-distance"data-toggle="tooltip" title="Click here to get direction!"><i class="fa fa-location-arrow" aria-hidden="true"></i> ' + round(item.Distance, 2) + '</div><div hidden>' + drivingDistances(lat, lng, item.Latitude, item.Longitude, item.Id) + '</div><div class="drivingPopUp" id="' + item.Id + '"  onclick="open_search_mapG(' + item.Latitude + ',' + item.Longitude + ')"></div></div></div>';
                    trHTML += '<div id="dlat" class="hidden">' + item.Latitude + '</div><div id="dlng" class="hidden">' + item.Longitude + '</div>';
                    trHTML += '</div>';
                    trHTML += '</section>';

                });
                $('#search-result').html(trHTML);
                $('#btnLoadMore').show();
           
                loadPictures();

                $("#btnLoadMore").on("click", loadMore);
            } else {
                $("#btnLoadMore").hide();
                var HTML = '<div class="">There are no restaurant found within <span class="address-color">' + $('#proximity_distance').val() + ' km</span> from your current location..</div>';
                $('#search-result-title').html(HTML);
                var tHTML = '';
                tHTML += '<div class="">You can also increase the search distance.</div>';
                $('#search-result').html(trHTML);
            }

            var SearchObject = {
                Searchlat: lat,
                Searchlng: lng,
                SearchResults: output
            };

            sessionStorage.output = JSON.stringify(SearchObject);
            //sessionStorage.setItem('SearchResult', output);
        },
        error: function () {
            $("#btnLoadMore").hide();
            var trHTML = '';
            trHTML += '<div class="col-md-12">Trouble fetching data.</div>';
            trHTML += '<div class="col-md-12">please enter a valid address.</div>';
            $('#search-result').html(trHTML);
        }
    });
}


function displayError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}


function openingTime(sun, mon, tues, wed, thurs, fri, sat) {

    var current = new Date();
    var currentTime = parseFloat(current.getHours() + '.' + current.getMinutes());
    var day, storeTime, storeTimeOpen, storeTimeClose, open;
    switch (current.getDay()) {
        case 0:
            open = "";
            if (sun === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = sun;
            }
            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + sun + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
            break;
        case 1:
            open = "";
            if (mon === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = mon;
            }
            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + mon + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
            break;
        case 2:
            open = "";
            if (tues === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = tues;
            }
            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + tues + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
            break;
        case 3:
            open = "";
            if (wed === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = wed;
            }
            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + wed + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
            break;
        case 4:
            open = "";
            if (thurs === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = thurs;
            }
            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + thurs + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
            break;
        case 5:
            open = "";
            if (fri === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = fri;
            }
            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + fri + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
            break;
        case 6:
            open = "";
            if (sat === "Closed") {
                open = "0.0 - 0.0";
            } else {
                open = sat;
            }

            storeTime = open.split("-");
            storeTimeOpen = storeTime[0].replace(":", ".");
            storeTimeClose = storeTime[1].replace(":", ".");

            if (currentTime >= storeTimeOpen && currentTime < storeTimeClose) {
                day = '<div class="ogreen">Now opened between ' + sat + '</div>';
            } else {
                day = '<div class="ored">Closed</div>';
            }
    }

    return '<div>' + day + '</div>';
}

function round(num) {
    var nums = num;
    var n = "";
    if (nums < 1) {
        var numConvert = nums * 1000;
        n = numConvert.toFixed(1) + "m";
    } else {
        n = nums.toFixed(1) + "km";
    }
    return n;
}

function loadPictures() {
    searchSize();
    $("#search-result .hid").slice(0, 1).removeClass("hid");
    $('.restaurant-search-result').each(function () {
        if (!$(this).hasClass("hid")) {
            var source = $(this).find('img').data('src');
            $(this).find('img').attr('src', source);
            $(this).find('img').removeAttr('data-src');
        } 
    });
    if ($('.hid').length > 0) {
        $('#btnLoadMore').show();
    } else {
        $('#btnLoadMore').hide();
    }
}

function loadMore() {
    searchSize();
    $("#search-result .hid").slice(0, 1).removeClass("hid");
    //$.each($('img'), function () {
    //    if ($(this).attr('data-src') && $(this).offset().top < ($(window).scrollTop() + $(window).height() + 100)) {
    //        var source = $(this).data('src');
    //        $(this).attr('src', source);
    //        $(this).removeAttr('data-src');
    //    }
    //})

    isTargetVisble();


    if ($('.hid').length > 0) {
        $('#btnLoadMore').show();
    } else {
        $('#btnLoadMore').hide();
    }

}

function previoussearch() {
    $('#presearch').click(function (e) {
        var searchobj = JSON.parse(sessionStorage.output);
        var lat = searchobj['Searchlat'];
        var lng = searchobj['Searchlng'];
            //console.log(searchobj);Searchlat
            //console.log(searchobj[0].Address);
        //console.log(searchobj[1].Address);
            $('#menu-card').html('');
            $('#search-result').html('');
            var trHTML = '';
            $.each(searchobj['SearchResults'], function (i, item) {

                trHTML += '<section class="restaurant-search-result">';
                trHTML += '<div class="restaurant-search-result-image-container"><div class="restaurant-search-result-image-container-inner"><a href="/Home/Restaurant/' + item.Id + '"><img src="" data-src="' + stripImageUrl(item.ProfileImage) + '" width="120" height="82.5"></a></div></div>';
                trHTML += '<div class="restaurant-search-result-container">';
                trHTML += '<div class="restaurant-search-result-container-title"><h4><a href="/Home/Restaurant/' + item.Id + '">' + item.Name + '</a></h4></div>';
                trHTML += '<div class="restaurant-search-result-container-cuisine"><i class="fa fa-cutlery"></i> ' + item.Cuisine + '</div>';
                trHTML += '<div class="restaurant-search-result-container-address">' + item.Address + '</div>';
                trHTML += '<div class="restaurant-search-result-container-opening-hour">' + openingTime(item.Sunday, item.Monday, item.Tuesday, item.Wednesday, item.Thursday, item.Friday, item.Saturday) + '</div>';
                trHTML += '</div>';
                trHTML += '<div class="restaurant-search-result-distance">';
                trHTML += '<div class="geographical-distance"><div class="proximity-distance"data-toggle="tooltip" title="Click here to get direction!"><i class="fa fa-location-arrow" aria-hidden="true"></i> ' + round(item.Distance, 2) + '</div><div hidden>' + drivingDistances(lat, lng, item.Latitude, item.Longitude, item.Id) + '</div><div class="drivingPopUp" id="' + item.Id + '"  onclick="open_search_mapP(' + lat + ',' + lng + ',' + item.Latitude + ',' + item.Longitude + ')"></div></div></div>';
                trHTML += '<div id="dlat" class="hidden">' + item.Latitude + '</div><div id="dlng" class="hidden">' + item.Longitude + '</div>';
                trHTML += '</div>';
                trHTML += '</section>';

            });
            $('#search-result').html(trHTML);
            $('#btnLoadMore').show();

            loadMore(); 
        });
}


function drivingDistances(originLatitude, originlongitude, destinationLatitude, destinationlongitude, id) {
    var originCoordinates = originLatitude + ", " + originlongitude;
    var destinationCoordinates = destinationLatitude + ", " + destinationlongitude;
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [originCoordinates],
        destinations: [destinationCoordinates],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error was: ' + status);
        } else {
            //$('#lar').val(response.rows[0].elements[0].distance.text);
            //console.log(response.originAddresses[0] + ' --> ' + response.destinationAddresses[0] + ' ==> ' + response.rows[0].elements[0].distance.text);
            document.getElementById(id).innerHTML = '<i class="fa fa-car" aria-hidden="true"></i> ' + response.rows[0].elements[0].distance.text;
        }
    });
}

function drivingDistance(a, b) {
    var originLatitude = $("input[name=lat]").val();
    var originlongitude = $("input[name=lng]").val();
    var destinationLatitude = a;
    var destinationlongitude = b;
    var drivingDistance = "";
    var originCoordinates = originLatitude + ", " + originlongitude;
    var destinationCoordinates = destinationLatitude + ", " + destinationlongitude;
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [originCoordinates],
        destinations: [destinationCoordinates],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, callback);

    return callback();
}

function callback(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
        console.log('Error was: ' + status);
    } else {
        //console.log(response.originAddresses[0] + ' --> ' + response.destinationAddresses[0] + ' ==> ' + response.rows[0].elements[0].distance.text);
        document.getElementById('idf').innerHTML = response.originAddresses[0] + ' --> ' + response.destinationAddresses[0] + ' ==> ' + response.rows[0].elements[0].distance.text;
    }
}

function search_coordinate() {
    var lat = $("input[name=lat]").val();
    var lng = $("input[name=lng]").val();
    return lat + "," + lng;
}

function open_search_map(a, b) {
    var lat = a;
    var lng = b;
    window.open('https://www.google.co.uk/maps/dir/' + search_coordinate() + '/' + lat + "," + lng + '/', '_blank');
}

function search_coordinateG() {
    var lat = $("input[name=current-lat]").val();
    var lng = $("input[name=current-lng]").val();
    console.log(lat);
    return lat + "," + lng;
}

function open_search_mapG(a, b) {
    var lat = a;
    var lng = b;
    window.open('https://www.google.co.uk/maps/dir/' + search_coordinateG() + '/' + lat + "," + lng + '/', '_blank');
}

function open_search_mapP(a, b, c, d) {
    window.open('https://www.google.co.uk/maps/dir/' + a + "," + b  + '/' + c + "," + d + '/', '_blank');
}


function PreviousSearchToggle() {
    var searchobj = JSON.parse(sessionStorage.output);
   
    if (searchobj !== '') {
        $('#presearch').show();
        
    } else {
        $('#presearch').hide();
       
    }
}

function stripImageUrl(a) {
    var imgUrl = a;
    var TrimImgUrl = imgUrl.substr(2);
    return TrimImgUrl;
}


$.fn.is_on_screen = function () {

    var win = $('#search-result');

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

function isTargetVisble() {
    //var retunVal = false;
    $('.restaurant-search-result').each(function () {

        //if (!$(this).hasClass("hid")) {
        //    console.log('This has no hid class');
        //} 

        if ($(this).is_on_screen() && !$(this).hasClass("hid")) {
        //    var isThisMessageRead = $(this).find('.IsMessageRead').text();
        //    if (isThisMessageRead === 'false') {
        //        if (!$(this).hasClass("readMessage")) {
        //            var mailId = $(this).find('.mailId').text();
        //            console.log(mailId);
        //            messageIsRead(mailId);
        //            $(this).addClass('readMessage');
        //        }
        //    }
        //    retunVal = true;

            $.each($('img'), function () {
                //if ($(this).data('src')) {
                var source = $(this).data('src');
                $(this).attr('src', source);
                $(this).removeAttr('data-src');
                //}
            });


            console.log('On screen');
            console.log('This has no hid class');
        } else {
            console.log('This has hid class');
        }
    });
    //return retunVal;
}

$('#search-result').scroll(function () { // bind window scroll event
    if ($('.restaurant-search-result').length > 0) { // if target element exists in DOM
        isTargetVisble();
    }
});

function searchSize() {
    //var modalHeight = $('#demo-modal').height();
    var modalHeight = $(window).height();
    var searchHeight = modalHeight - 330;
    $('#search-result').height(searchHeight);
    //$('.form-card, #menu-card').height(searchHeight);
    //var embedPDFHeight = $('#demo-modal #menu-card').height();
    $('#menu-card').height(0); 
}





