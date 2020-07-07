$(function () {
    $('.center-parent').hide();
    $('#SubscribeToNewselleter').click(function (e) {
        console.log('hello');
        $('.center-parent').show();
        var subscribeNewsletterObject = {
            Name: $("<div/>").text($('#subscriber-name').val()).html(),
            Email: $("<div/>").text($('#subscriber-email').val()).html()
        };

        //JSON data
        var dataType = 'application/json; charset=utf-8';
        console.log('hello');
        console.log(subscribeNewsletterObject);

        //console.log('Submitting form...');
        $.ajax({
            type: 'POST',
            url: "http://localhost/AfroFood/web/app_dev.php/subscribe",
            dataType: 'json',
            contentType: dataType,
            data: JSON.stringify(subscribeNewsletterObject),
            success: function (output) {
                $('.center-parent').hide();
                $('#subscriber-name').val("");
                $('#subscriber-email').val("");
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