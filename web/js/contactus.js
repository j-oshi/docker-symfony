/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

﻿$(function () {
    $('.center-parent').hide();
    $('#contactus').click(function (e) {
        $('.center-parent').show();
        var contactObject = {
            Name: $("<div/>").text($('#name').val()).html(),
            Email: $("<div/>").text($('#email').val()).html(),
            Message: $("<div/>").text($('#message').val()).html()
        };

        //JSON data
        var dataType = 'application/json; charset=utf-8';
        console.log('hello');
        console.log(contactObject);

        //console.log('Submitting form...');
        $.ajax({
            type: 'POST',
            url: "http://localhost/AfroFood/web/app_dev.php/contactform",
            dataType: 'json',
            contentType: dataType,
            data: JSON.stringify(contactObject),
            success: function (output) {
                $('.center-parent').hide();
                $('#name').val("");
                $('#email').val("");
                $('#message').val("");
                console.log(output);
                $.notify("Thank you for subscribing to our newsletter. Your information has been added to our database.", {
                    animate: {
                        enter: 'animated fadeInRight',
                        exit: 'animated fadeOutRight'
                    }
                });
            },
            error: function () {
                console.log("Error.");
                $.notify({
                    title: "Error:",
                    message: "Your information cnnot be added to our subscribtion list."
                }, {
                    type: 'danger'
                });
            }
        });
    });

});


