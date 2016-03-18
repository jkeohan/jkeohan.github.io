countriesApp.controller('CountriesCtrl', ['$scope', '$rootScope', '$location', 'countries', 
	function($scope, $rootScope, $location, countries){	
	$scope.order = 'countryName';
	$scope.reverseSort = false;

	$rootScope.isLoading = false;

	$scope.changeOrder = function(order){
		$scope.reverseSort = (order == $scope.order) ? !$scope.reverseSort : false;
		$scope.order = order || 'countryName';
	}
	//TAKES IN (c.countryCode) and is run changeLocation(c.countryCode)
	$scope.changeLocation = function(location){
		console.log($location.path('/countries/'+location))
		$location.path('/countries/'+location);
	}

	$scope.countries = countries.geonames;
}])
