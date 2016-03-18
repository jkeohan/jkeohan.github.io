countriesApp.controller('HomeCtrl', ['$rootScope', '$timeout',
	function($rootScope, $timeout){	
	  $timeout(function() {
	    $rootScope.isLoading = false;
	  }, 1000);
}])
