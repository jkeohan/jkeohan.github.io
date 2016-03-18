countriesApp.controller('CountryCtrl', ['$scope', '$rootScope', '$route', 'countryInfo', 'ccNeighbors', 'ccCapital', 
	function($scope, $rootScope, $route, countryInfo, ccNeighbors, ccCapital){
	$scope.country = countryInfo.geonames[0];
	$scope.isLoadingCount = 0; 

	ccNeighbors($route.current.params.country).then(function(data){
		$scope.neighbors = data.geonames;
		$scope.isLoadingCount++;
		if($scope.isLoadingCount == 2) $rootScope.isLoading = false;
	});

	ccCapital($route.current.params.country).then(function(data){
		$scope.capital = data.geonames[0];
		$scope.isLoadingCount++;
		if($scope.isLoadingCount == 2) $rootScope.isLoading = false;
	});	
}])
