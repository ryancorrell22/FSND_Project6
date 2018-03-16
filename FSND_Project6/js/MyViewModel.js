var map;
		
		function MyViewModel() {
			//Create Locations
			this.locations = ko.observableArray([
			{title: 'AlfredsonBeale', location: {lat:35.139356 , lng:-90.051506 }, yelp_id: 'alfreds-on-beale-memphis', isVisible: ko.observable(true), marker: null},
			{title: 'HardRockCaffe', location: {lat:35.140301, lng:-90.053603}, yelp_id: 'hard-rock-cafe-memphis-6', isVisible: ko.observable(true), marker: null},
			{title: 'AldosPizza', location: {lat:35.142176, lng:-90.053817}, yelp_id: 'aldos-pizza-pies-memphis-2', isVisible: ko.observable(true), marker: null},
			{title: 'BlueMonkey', location: {lat:35.133433, lng:-90.061096}, yelp_id: 'the-blue-monkey-memphis-2', isVisible: ko.observable(true), marker: null},
			{title: 'BBKingsBlues', location: {lat:35.139751, lng:-90.053381}, yelp_id: 'bb-kings-blues-club-memphis', isVisible: ko.observable(true), marker: null}
			]);

			this.searchText = ko.observable("");
			//make a blank array for markers
			var markers = [];
			//Make an infowindow
			var largeinfowindow = new google.maps.InfoWindow();

			var defaultIcon = makeMarkerIcon('0091ff');

			var highlightedIcon = makeMarkerIcon('FFFF24');

			var clickedIcon = makeMarkerIcon('DC143C');

			function makeMarkerIcon(markerColor) {
				var markerImage = new google.maps.MarkerImage(
					'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
					new google.maps.Size(21,34),
					new google.maps.Point(0,0),
					new google.maps.Point(10,34),
					new google.maps.Size(21,34));
				return markerImage;
			}

			for (var i = 0; i < this.locations().length; i++) {
				(function(location) {
						var position = location.location;
						var title = location.title;
						var yelp_id = location.yelp_id;
						// create a marker for each location
						var marker = new google.maps.Marker({
							map: map,
							position: position,
							title: title,
							icon: defaultIcon,
							animation: google.maps.Animation.DROP,
							id: i
						});
						//add markers to marker array
						markers.push(marker);
						marker.viewModel = this;
						//Create an event listener for clicks
						marker.addListener('click', function() {
							this.setIcon(clickedIcon);
							populateInfoWindow(this, largeinfowindow, location);
						});

						marker.addListener('mouseover', function() {
							this.setIcon(highlightedIcon);
						});

						marker.addListener('mouseout', function() {
							this.setIcon(defaultIcon);
						});

						location.marker = marker;
					}
					)(this.locations()[i]);
			}

			this.handleListItemClick = function(location) {
				google.maps.event.trigger(location.marker, 'click');
			};

			this.showRestaurants = function() {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(map);
				}
			};

			this.hideRestaurants = function() {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(null);
				}
			};
			var ACCESS_TOKEN = 'Mb1xhhEnY7B1ByLwt1eGM_j0zLTtzINU9p8oV9ca2Y0MHZn_jsaSezEbnr8rCxBRC6a0PudtM-NIU7Gk8KUNOsAAAdGr-W2mWKRYRPpBN9bK-pr9A3usNbLkElBpWXYx';
			var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	  		function doCORSRequest(options, printResult) {
	    		var x = new XMLHttpRequest();
	    		x.open(options.method, cors_api_url + options.url);
	    		x.setRequestHeader('Content-Type', 'application/json');
	    		x.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
	    		x.onload = x.onerror = function() {
	      			printResult(
	       		 		(x.responseText || '')
	      			);
	    		};
	    		x.send(options.data);
			}
			// Function populates the info windows
			function populateInfoWindow(marker, infowindow, location) {
				var yelp_id = location.yelp_id;
			
				if (infowindow.marker != marker) {
					doCORSRequest({
				        method: 'GET',
				        url: 'https://api.yelp.com/v3/businesses/' + yelp_id			        
				    }, function printResult(result) {
				    	var test = eval('('+result+')');
				    	var str = JSON.stringify(test);				    	
				    	var stuff = $.parseJSON(str);
				    					        
				        infowindow.setContent('<div>' + 'Name:  ' + stuff.name + '<br>' + 'Website:  ' + "<a href=https://www.yelp.com/biz/aldos-pizza-pies-memphis-2?adjust_creative=HJVYwHfY0LV2rzzyRF5YSA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=HJVYwHfY0LV2rzzyRF5YSA>" + stuff.url + "</a>" + '<br>' + 'User Rating:  ' + stuff.rating + '<div>');
				        infowindow.open(map, marker);
				    });
					infowindow.marker = marker;					
					infowindow.addListener('closeclick', function(){
					});
				}
			}
			this.processSearch = function(model, form) {
				var	input = form.target[0].value;
				for (var i = 0; i < this.locations().length; i++) {
					if (this.locations()[i].title.indexOf(input) === -1) {
						this.locations()[i].isVisible(false);
						markers[i].setVisible(false);
					}
					else {
						this.locations()[i].isVisible(true);
						markers[i].setVisible(true);
					}
				}
			};
		}


		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 35.1382802, lng: -90.0535814},
				zoom: 15
			});

			var viewModel = new MyViewModel();
			$(document).ready(function() {
				ko.applyBindings(viewModel);	
			});
		}