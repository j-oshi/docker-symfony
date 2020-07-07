$(function () {
	createRestaurantObject();
});

function createRestaurantObject() {
	
	$('#createRestaurant').click(function (e) {
                
                var restaurantData = new FormData();
            
                var profileImage = document.getElementById('profilepic').files[0];
                
                var galleryImage = document.getElementById('profileGallery');
                
                var galleryImageCount = document.getElementById('profileGallery').files.length;
		
		var restaurantObject = {
			name: $('#restaurantName').val(),
			description: $('#restaurantDescription').val(),
			countryOfCuisine: $('#african_cuisine').val(),
			telephone: $('#restaurantTelephone').val(),
			altTelephone: $('#altRestaurantTelephone').val(),
			website: $('#restaurantWebsite').val(),
			facebook: $('#Facebook').val(),
			googleplus: $('#googlePlus').val(),
			twitter: $('#twitter').val(),
			formatted_address: $('#locationAddress').val(),
			locality: $('#locationRegion').val(),
			country: $('#locationCountry').val(),
			postalCode: $('#locationPostalcode').val(),
			lat: $('#locationLat').val(),
			lng: $('#locationLng').val(),
			openmonday: $('#OpeningDayMonday').val(),
			opentuesday: $('#OpeningDayTuesday').val(),
			openwednesday: $('#OpeningDayWednesday').val(),
			openthursday: $('#OpeningDayThursday').val(),
			openfriday: $('#OpeningDayFriday').val(),
			opensaturday: $('#OpeningDaySaturday').val(),
			opensunday: $('#OpeningDaySunday').val()
            };
            
            var imageName = profileImage.name;
            var dhh = profileImage.size;
            console.log(dhh);
            
            restaurantData.append('profileImage', profileImage, imageName);
            
            for(var x = 0; x < galleryImageCount; x++) {
                restaurantData.append('Profilegallery'+x, galleryImage.files[x]);    
                console.log('appended a file');
            }
            restaurantData.append('restaurantData', JSON.stringify(restaurantObject));
		
            console.log(restaurantObject);
            console.log(restaurantData);
            
            // Display the key/value pairs
            for (var pair of restaurantData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
		
            //JSON data
           // var dataType = 'application/json; charset=utf-8';

            //console.log('Submitting form...');
//            $.ajax({
//                type: 'POST',
//                url: "http://localhost/AfroFoodMat/web/app_dev.php/business/create",
//                dataType: 'json',
//                contentType: dataType,
//                data: JSON.stringify(restaurantObject),
//                success: function (output) {
//                    console.log(output);
//                }
//            });
            
            $.ajax({
                url: "http://localhost/AfroFoodMat/web/app_dev.php/business/create",
                data: restaurantData,
                type: 'POST',
                contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                processData: false, // NEEDED, DON'T OMIT THIS
                success: function (output) {
                    console.log(output);
                }
            });
	});
}





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