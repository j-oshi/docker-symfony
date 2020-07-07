$(function () {
    $('.center-joinform').hide();
    $('#contactemailValidate').hide();
    $('#submitJoin').click(function (e) {
        $('.center-join').show();
        var joinObject = {
            RestaurantName: $("<div/>").text($('#restaurantname').val()).html(),
            RestaurantAddress: $("<div/>").text($('#restaurantaddress').val()).html(),
            RestaurantPostcode: $("<div/>").text($('#restaurantpostcode').val()).html(),
            AfricanCuisine: $("<div/>").text($('#african_cuisine').val()).html(),
            ContactName: $("<div/>").text($('#contactname').val()).html(),
            ContactEmail: $("<div/>").text($('#contactemail').val()).html(),
            ContactTelephone: $("<div/>").text($('#contacttelephone').val()).html(),
            ContactMessage: $("<div/>").text($('#contactmessage').val()).html()
        };

        //JSON data
        var dataType = 'application/json; charset=utf-8';
        console.log(joinObject);
        console.log('Submitting form...');

        $.ajax({
            type: 'POST',
            url: "http://localhost/AfroFood/web/app_dev.php/joinform",
            dataType: 'json',
            contentType: dataType,
            data: JSON.stringify(joinObject),
            success: function (output) {
                $('.center-join').hide();
               /* $.notify({
                    title: "Success:",
                    message: "The form has been submitted. Please check the your contact email for further instruction."
                }, {
                    type: 'success'
                });*/
                $('#restaurantname').val(""),
                $('#restaurantaddress').val(""),
                $('#restaurantpostcode').val(""),
                $('#african_cuisine').val(""),
                $('#contactname').val(""),
                $('#contactemail').val(""),
                $('#contacttelephone').val(""),
                $('#contactmessage').val("")
                $("#submitJoin").prop("disabled", true);
            },
            error: function () {
                $('.center-join').hide();
                /*$.notify({
                    title: "Error:",
                    message: "There is a problem submitting the form. Please try again later."
                }, {
                    type: 'danger'
                });*/
            }
        });

    });

   /* $('#contactemail').mouseleave(function (e) {
        var emailObject = {
            ContactEmail: $('#contactemail').val()
        };

        //JSON data
        var dataType = 'application/json; charset=utf-8';
        console.log(emailObject);
        console.log('Submitting form...');

        $.ajax({
            type: 'POST',
            url: "/Home/CheckForDuplication",
            dataType: 'json',
            contentType: dataType,
            data: JSON.stringify(emailObject),
            success: function (output) {
                console.log(output);
                if (output == true) {
                    $('#contactemailValidate').show();
                } else if (output == false) {
                    $('#contactemailValidate').hide();
                }

            },
            error: function () {
                $('#contactemailValidate').hide();
            }
        });

    });*/
});