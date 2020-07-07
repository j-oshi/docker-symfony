//Load Data in Table when documents is ready
$(document).ready(function () {
    BindMMTable();
    loadMMTable();
    console.log('Table');
    $("#approvalswitch").toggleSwitch();
    approvalSwitch();
});

var mmTable;

function BindMMTable() {
    mmTable = $("#MMTable").DataTable({
        columnDefs: [{
            'orderable': true,
            'targets': 0,
            'width': '30%',
            "autoWidth": true,
            "responsive": true,
        }],
        order: [[2, 'des']]
    });
}

//Load Data function
function loadMMTable() {
        $.ajax({
            url: "http://localhost/AfroFood/web/app_dev.php/admin/membershipwaiting",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var jsonObject = JSON.parse(JSON.stringify(result || null));
                var results = jsonObject.map(function (item) {
                    var results = [];
                    results.push(item.restaurantName);
                    results.push(item.contactEmail);
                    results.push(item.contactTelephone);
                    results.push('<a type="button" data-target="#info" class="btn btn-info" data-toggle="modal" onclick="passValueToModal(\'' + item.id + '\',\'' + item.contactName +'\',\'' + item.contactEmail +'\',\'' + item.contactTelephone +'\',\'' + item.contactMessage +'\')" > View </a> <a type="button" class="btn btn-danger" onclick="Delete(' + item.id+ ')" > Delete </a>');
                    return results;
                });
                mmTable.rows.add(results);
                mmTable.draw();
                var membershipObject = jsonObject;
                var item = findJsonRowById(membershipObject, 1);
                console.log(membershipObject);
                console.log(item);
            },
            failure: function () {
//                $.notify({
//                    title: "Error:",
//                    message: "When fetching data please contact administrator."
//                }, {
//                    type: 'danger'
//                });
            }
        });
}

function findJsonRowById(data, idToLookFor) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === idToLookFor) {
            return(data[i]);
        }
    }
}

function passValueToModal(a,b,c,d,e) {
    $('.modal-body .membership-rname').html('');
    $('.modal-body .membership-ccountry').html('');
    $('.modal-body .membership-address').html('');
    
    
    $('.modal-header #FormID').html(a);
    $('.modal-footer .approval-id').html(a);
    $('.modal-body .membership-name').html(b);
    $('.modal-body .membership-email').html(c);
    $('.modal-body .membership-telephone').html(d);
    $('.modal-body .membership-message').html(e);
    


}

function approvalSwitch() {
    $("#approvalswitch").on('click', function(){
        if ( $(this).is(':checked') ){            
            $('.membership').css('border-color', '#1BB015');
            $('.form-rejected').hide();
            $('.form-approved').show();
            var approvalId = $('.approval-id').html(); 
            var email = $('.membership-email').html(); 
            approvalSent(approvalId);
            registerationSent(email);
        }
        else
        {
            //alert("Unchecked");
            $('.membership').css('border-color', '#fb6e14');
            $('.form-approved').hide();
            $('.form-rejected').show();
        }
    });
};

//approval
function approvalSent(a) {
    
            var idObject = {
                Approvalid: a
            };
            //JSON data
            var dataType = 'application/json; charset=utf-8';

            console.log(idObject);
            
            $.ajax({
                type: 'POST',
                url: "http://localhost/AfroFood/web/app_dev.php/admin/membershipapproved",
                dataType: 'json',
                contentType: dataType,
                data: JSON.stringify(idObject),
                success: function (output) {
                    console.log(output);
                }
            });
}

//registeruser
function registerationSent(b) {
    
            var registrationObject = {
                email: b
            };
            //JSON data
            var dataType = 'application/json; charset=utf-8';

            console.log(registrationObject);
            
            $.ajax({
                type: 'POST',
                url: "http://localhost/AfroFood/web/app_dev.php/admin/register",
                dataType: 'json',
                contentType: dataType,
                data: JSON.stringify(registrationObject),
                success: function (output) {
                    console.log(output);
                }
            });
}




