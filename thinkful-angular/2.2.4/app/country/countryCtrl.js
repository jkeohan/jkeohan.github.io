countriesApp.controller('CountryCtrl', ['$scope', '$rootScope', '$stateParams', 'countryInfo', 'ccNeighbors', 'ccCapital', 
	function($scope, $rootScope, $stateParams, countryInfo, ccNeighbors, ccCapital){
	$scope.country = countryInfo.geonames[0];
	$scope.isLoadingCount = 0; 

	ccNeighbors($stateParams.country).then(function(data){
		$scope.neighbors = data.geonames;
		$scope.isLoadingCount++;
		if($scope.isLoadingCount == 2) $rootScope.isLoading = false;
	});

	ccCapital($stateParams.country).then(function(data){
		$scope.capital = data.geonames[0];
		$scope.isLoadingCount++;
		if($scope.isLoadingCount == 2) $rootScope.isLoading = false;
	});	
}])


/**
* $stateProvider -> define states
* $state -> for visiting other routes via $state.go
* $stateParams -> for accessing the state or route parameters
* $stateChangeStart, $stateChangeError -> listen to these events rather than $route events
* ui-view, ui-sref, ui-sref-active
*/ 

