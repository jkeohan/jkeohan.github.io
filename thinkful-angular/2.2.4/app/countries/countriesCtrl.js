countriesApp.controller('CountriesCtrl', ['$scope', '$rootScope', '$state', 'countries', 
	function($scope, $rootScope, $state, countries){	
	$scope.order = 'countryName';
	$scope.reverseSort = false;

	$rootScope.isLoading = false;

	$scope.changeOrder = function(order){
		$scope.reverseSort = (order == $scope.order) ? !$scope.reverseSort : false;
		$scope.order = order || 'countryName';
	};
	//TAKES IN (c.countryCode) and is run changeLocation(c.countryCode)
	$scope.changeLocation = function(countryCode){
		// console.log($location.path('/countries/'+location));
		$state.go('country', {country: countryCode});
		// $location.path('/countries/'+location);
	};

	$scope.countries = countries.geonames;
}]);
