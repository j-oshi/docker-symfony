$(document).ready(function () {
    $('#RestaurantNameValidate').hide();
    $('#firstStepButton').prop("disabled", true);
    $('#secondStepButton').prop("disabled", true);
    $('#thirdStepButton').prop("disabled", true);
    $('#fourthStepButton').prop("disabled", true);
    $('#fifthStepButton').prop("disabled", true);
    $('#creatRestaurant').prop("disabled", true);
    $('#CountryOfCuisineValidate').hide();
    RestaurantDescriptionValid();
    validate();

    profileImageUploaded();

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
        //console.log(validate());
        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');

});

function validate() {

    var isValid = true;

    console.log(isValid);
    firstStep();
    console.log(isValid);
    secondStep();
    console.log(isValid);
    createStep();





    initializeNewMap();
    ////$("#RestaurantName").mouseleave(function () {
    ////    if ($('#RestaurantName').val().trim() == "") {
    ////        $('#RestaurantName').css('border-color', 'Red');
    ////        $('#RestaurantNameValidate').show().css('color', 'Red');            
    ////        isValid = false;
    ////    }
    ////    else {
    ////        $('#RestaurantName').css('border-color', 'lightgrey');
    ////        $('#RestaurantNameValidate').hide();
    ////    }

    ////    if ($('#RestaurantName').val().trim() != "" && $('#CountryOfCuisine').val().trim() != "" && twitterValid() != false && facebookValid() != false) {
    ////        $('#firstStepButton').prop("disabled", false);
    ////    }
    ////    else {
    ////        $('#firstStepButton').prop("disabled", true);
    ////    }
    ////});

    ////$("#geocomplete").mouseleave(function () {
    ////    if ($('#lat').val().trim() != "" && $('#lng').val().trim() != "") {
    ////        $('#secondStepButton').prop("disabled", false);
    ////    }
    ////    else {
    ////        $('#secondStepButton').prop("disabled", true);
    ////    }
    ////});


    ////$('#CountryOfCuisine').on("change", function () {
    ////    if ($('#CountryOfCuisine').val().trim() == "") {
    ////        $('#CountryOfCuisine').css('border-color', 'Red');
    ////        $('#CountryOfCuisineValidate').show();
    ////        isValid = false;
    ////    }
    ////    else {
    ////        $('#CountryOfCuisine').css('border-color', 'lightgrey');
    ////        $('#CountryOfCuisineValidate').hide();
    ////    }
    ////}).trigger("change");


    ////$("#RestaurantFacebook").mouseleave(function () {
    ////    if ($('#RestaurantFacebook').val().trim() != "") {
    ////        facebookValid();
    ////    } else {
    ////        $('#RestaurantFacebook').css('border-color', 'lightgrey');
    ////    }

    ////    //else {

    ////    //    $('#firstStepButton').prop("disabled", true);

    ////    //}
    ////});

    ////$("#RestaurantTwitter").mouseleave(function () {
    ////    if ($('#RestaurantTwitter').val().trim() != "") {
    ////        twitterValid();
    ////    } else {
    ////        $('#RestaurantTwitter').css('border-color', 'lightgrey');
    ////    }

    ////    //else {

    ////    //    $('#firstStepButton').prop("disabled", true);

    ////    //}
    ////});
    
    ////$("#RestaurantPinterest").mouseleave(function () {
    ////    if ($('#RestaurantPinterest').val().trim() != "") {
    ////        pinterestValid();
    ////    } else {
    ////        $('#RestaurantPinterest').css('border-color', 'lightgrey');
    ////    }

    ////    //else {

    ////    //    $('#firstStepButton').prop("disabled", true);

    ////    //}
    ////});

    ////$("#CountryOfCuisine").click(function () {
    ////    if ($('#RestaurantName').val().trim() != "" && $('#CountryOfCuisine').val().trim() != "") {
    ////        $('#firstStepButton').prop("disabled", false);
    ////    }
    ////    else {
    ////        $('#firstStepButton').prop("disabled", true);
    ////    }
    ////});


    ////$("#geocomplete").mouseleave(function () {
    ////    if ($('#lat').val().trim() == "") {
    ////        $('#lat').css('border-color', 'Red');
    ////        isValid = false;
    ////    }
    ////    else {
    ////        $('#lat').css('border-color', 'lightgrey');
    ////    }

    ////    if ($('#lng').val().trim() == "") {
    ////        $('#lng').css('border-color', 'Red');
    ////        isValid = false;
    ////    }

    ////    else {
    ////        $('#lng').css('border-color', 'lightgrey');
    ////    }

    ////    if ($('#lat').val().trim() != "" && $('#lng').val().trim() != "") {
    ////        $('#secondStepButton').prop("disabled", false);
    ////    }
    ////    else {
    ////        $('#secondStepButton').prop("disabled", true);
    ////    }
    ////    initializeNewMap();
    ////});

    ////$("#thirdStepButton").click(function () {
    ////    if ($('#RestaurantName').val().trim() != "" && $('#CountryOfCuisine').val().trim() != "" && $('#lat').val().trim() != "" && $('#lng').val().trim() != "") {
    ////        $('#creatRestaurant').prop("disabled", false);
    ////    }
    ////    else {
    ////        $('#creatRestaurant').prop("disabled", true);
    ////    }
    ////});

    //if ($('#Country').val().trim() == "") {

    //    $('#Country').css('border-color', 'Red');

    //    isValid = false;

    //}

    //else {

    //    $('#Country').css('border-color', 'lightgrey');

    //}
    console.log(isValid);

    return;

}

function firstStep() {
    $("#step-1").mousemove(function () {
        if ($('#RestaurantName').val().trim() === "") {
            $('#RestaurantName').css("border", "2px solid red");
            $('#RestaurantNameValidate').show().css('color', 'Red');            
            isValid = false;
        }
        else {
            $('#RestaurantName').css('border', '2px solid lightgrey');
            $('#RestaurantNameValidate').hide();
        }

        if ($('#CountryOfCuisine').val().trim() === "") {
            $('#CountryOfCuisine').css("border", "2px solid red");
            $('#CountryOfCuisineValidate').show().css('color', 'Red');
            isValid = false;
        }
        else {
            $('#CountryOfCuisine').css('border', '2px solid lightgrey');
            $('#CountryOfCuisineValidate').hide();
        }

        if ($('#RestaurantName').val().trim() !== "" && $('#CountryOfCuisine').val().trim() !== "") {
            $('#firstStepButton').prop("disabled", false);
            isValid = false;
        }
        else {
            $('#firstStepButton').prop("disabled", true);
        }
    });
}

function secondStep() {
    $("#step-2").mousemove(function () {
        if ($('#lat').val().trim() !== "" && $('#lng').val().trim() !== "") {
            $('#secondStepButton').prop("disabled", false);
            $('#thirdStepButton').prop("disabled", false);
            $('#fourthStepButton').prop("disabled", false);
            $('#fifthStepButton').prop("disabled", false);
        }
        else {
            $('#secondStepButton').prop("disabled", true);
            $('#thirdStepButton').prop("disabled", true);
            $('#fourthStepButton').prop("disabled", true);
            $('#fifthStepButton').prop("disabled", true);
        }
    });
}

function createStep() {
    var nme = document.getElementById("ProfilePic");
    $('#fifthStepButton').click(function () {
        if ($('#RestaurantName').val().trim() !== "" && $('#CountryOfCuisine').val().trim() !== "" && $('#lat').val().trim() !== "" && $('#lng').val().trim() !== "" && nme.value.length > 4) {
            $('#creatRestaurant').prop("disabled", false);
        }
        else {
            $('#creatRestaurant').prop("disabled", true);
        }
    });
}


function facebookValid() {
    var isValid = true;
    var reFacebook = /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
    if (document.createRestaurant.RestaurantFacebook.value.search(reFacebook) === -1) //if match failed
    {
        $('#RestaurantFacebook').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#RestaurantFacebook').css('border-color', 'lightgrey');
        isValid = true;
    }
    return isValid;
}

function twitterValid() {
    var isValid = true;
    var reTwitter = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
    if (document.createRestaurant.RestaurantTwitter.value.search(reTwitter) === -1) //if match failed
    {
        $('#RestaurantTwitter').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#RestaurantTwitter').css('border-color', 'lightgrey');
        isValid = true;
    }
    return isValid;
}

function instagramValid() {
    var isValid = true;
    var reInstagram = /^\s*(http\:\/\/)?instagram\.com\/[a-z\d-_]{1,255}\s*$/i;
    if (document.createRestaurant.RestaurantInstagram.value.search(reInstagram) === -1) //if match failed
    {
        $('#RestaurantInstagram').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#RestaurantInstagram').css('border-color', 'lightgrey');
        isValid = true;
    }
    return isValid;
}

function pinterestValid() {
    var isValid = true;
    var rePinterest = /^\s*(http\:\/\/)?pinterest\.com\/[a-z\d-_]{1,255}\s*$/i;
    if (document.createRestaurant.RestaurantInstagram.value.search(reInstagram) === -1) //if match failed
    {
        $('#RestaurantPinterest').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#RestaurantPinterest').css('border-color', 'lightgrey');
        isValid = true;
    }
    return isValid;
}

function googlePlusValid() {
    var isValid = true;
    var reGooglePlus = /^https?:\/\/plus\.google\.com\/[a-z\d-_]{1,255}\s*$/i;
    if (document.createRestaurant.RestaurantGooglePlus.value.search(reGooglePlus) === -1) //if match failed
    {
        $('#RestaurantGooglePlus').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#RestaurantGooglePlus').css('border-color', 'lightgrey');
        isValid = true;
    }
    return isValid;
}

function RestaurantDescriptionValid() {
    $('#RestaurantDescription').keypress(function (e) {
        var tval = $('#RestaurantDescription').val(),
            tlength = tval.length,
            set = 1000,
            remain = parseInt(set - tlength);
        $('#RestaurantDescriptionLimit').text(remain);
        if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
            $('#RestaurantDescription').val((tval).substring(0, tlength - 1));
        }
    });
}

function initializeNewMap() {
    var map = $("#geocomplete").geocomplete({
        map: ".map_canvas",
        details: "form",
        mapOptions: {
            zoom: 16
        },
        markerOptions: {
            draggable: true
        },
        types: ["geocode", "establishment"]
    });

    $("#geocomplete").bind("geocode:dragged", function (event, latLng) {
        $("input[name=lat]").val(latLng.lat());
        $("input[name=lng]").val(latLng.lng());
    });
    google.maps.event.trigger(map, "resize");
    //$('.map_canvas').resizeTo(250, 250);

    //setTimeout(resize(),100);
    //google.maps.event.addListener(map, "idle", function () {
    //    google.maps.event.trigger(map, 'resize');
    //});

    //map_array[Next].setZoom(map.getZoom() - 1);
    //map_array[Next].setZoom(map.getZoom() + 1);
}

function profileImageUploaded() {
    $('#ProfilePicValidate').hide();
    $("#step-3").mousemove(function () {
        var nme = document.getElementById("ProfilePic");
        if (nme.value.length < 4) {
            $('#thirdStepButton').prop("disabled", true);
            $('#ProfilePicValidate').show().css('color', 'Red');
        }
        else {
            $('#thirdStepButton').prop("disabled", false);
            $('#ProfilePicValidate').hide();
        }
    });
}

function resize() {
    google.maps.event.addListener(map, "idle", function () {
        google.maps.event.trigger(map, 'resize');
    });
}
