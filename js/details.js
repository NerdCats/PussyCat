var app = angular.module('details', ['ngMaterial']);

app.controller('detailsController', function ($scope, $http, $interval) {

	//menu options
	$scope.menus = ["Dashboard","Orders","Services","Customers","Agents","Preferences","Administration"];

	//marker colors
	$scope.markerIconUri = {
		blueMarker : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
		redMarker : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
		purpleMarker : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
		yellowMarker : "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
		greenMarker : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"		
	}

	//get jobs json
	$http.get("http://localhost:23873/api/Job?id=56a5c7571510df254024dc59").then(function(response) {
		$scope.job = response.data;
		console.log($scope.job);

		$scope.usersLocation = {
			user : $scope.job.Order.From.Address,
			lat : $scope.job.Order.From.Point.coordinates[1],
			lng : $scope.job.Order.From.Point.coordinates[0],
			title : "User's location",
			desc : $scope.job.Order.From.Address
		};

		$scope.destination = {
			user : $scope.job.User,
			lat : $scope.job.Order.To.Point.coordinates[1],
			lng : $scope.job.Order.To.Point.coordinates[0],
			title : "User's destination",
			desc : $scope.job.Order.To.Address
		};

		$scope.assetLocation = {
			user : "Asset Nazrul",
			lat : 23.800490,
			lng: 90.408450,
			title : "Asset's Location",
			desc : "Somewhere Asset is"
		}
		
		$scope.requestedAgo = function () {
			var creationTime = new Date($scope.job.CreateTime);
			var nowTime = Date.now();
			var diffInMin = (nowTime - creationTime)/1000/60;
			console.log(diffInMin);
			return Math.round(diffInMin);
		}

		$scope.detailsTable = {
			orderId : $scope.job._id,
			user : $scope.job.User,
			phoneNumber : "01911725897",
			orderType : $scope.job.Order.Type,
			preferences : $scope.job.Order.VehiclePreference[0],
			eta : ""
		}

		$scope.asset = {
			name : "Rahim Mia",
			phoneNumber : "01911726389"
		}

		$scope.servingby = {
			name : "Redwan"
		}
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng($scope.usersLocation.lat, $scope.usersLocation.lng),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};

		

		//create map
		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		$scope.markers = [];

		var infoWindow = new google.maps.InfoWindow();
		var createMarker = function (info, markerUrl){
			var marker = new google.maps.Marker({
			  	map: $scope.map,
			  	position: new google.maps.LatLng(info.lat, info.lng),
			  	title: info.title
			});
			marker.setIcon(markerUrl);
			marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

			google.maps.event.addListener(marker, 'click', function(){
			  	infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
			  	infoWindow.open($scope.map, marker);
			});
			$scope.markers.push(marker);
		}
		
		createMarker($scope.usersLocation, $scope.markerIconUri.greenMarker);
		createMarker($scope.destination, $scope.markerIconUri.redMarker);
		createMarker($scope.assetLocation, $scope.markerIconUri.purpleMarker);
	});
});