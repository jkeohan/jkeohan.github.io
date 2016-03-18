var countriesApp = angular.module('countriesApp', ['ui.router', 'ngAnimate', 'ccLibrary'])

countriesApp.run(function($rootScope, $state, $timeout) {
    $rootScope.$on('$stateChangeError', function() {
        $state.go("/error");
    });
    $rootScope.$on('$stateChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function() {
    	//timeout placed here so that it runs after the transistion has been kicked off
    	//placing it in $stateChageStart would cause it to first load when the page renders
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);

    });
    	$rootScope.totalTip = 0;
    	$rootScope.mealCount = 0;
    	$rootScope.avgTip = 0;
})

countriesApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider//this is a service
		.state('/', {
			url:"/",
			templateUrl:"app/home/home.html"
		})
		.state('home', {
		    templateUrl : 'app/home/home.html',
		    controller: 'app/home/HomeCtrl'
		})
		.state('/countries', {
			url:'/countries',
			   templateUrl : 'app/countries/countries.html',
			   controller : 'CountriesCtrl',
		    	// controller : 'app/countries/CountriesCtrl.js',
		    resolve: {
	    	countries: ['ccCountries', function(ccCountries){
	    		return ccCountries();
	    	}]

	    }
		})
		.state('/countries/:country', {
			url:'/countries/:country',
			  templateUrl : 'app/country/country.html',
		    controller : 'CountryCtrl',
		    resolve: {
	    	countryInfo: ['$route', 'ccCountry', function($route, ccCountry){
	    		console.log($route.current.params.country)
	    		return ccCountry($route.current.params.country);
	    	}]
	    }
		})
		.state('/error', {
			url:'/error',
			templateUrl: 'app/error/error.html'
		})
})

// countriesApp.controller('CountriesCtrl', ['$scope', '$rootScope', '$location', 'countries', 
// 	function($scope, $rootScope, $location, countries){	
// 	$scope.order = 'countryName';
// 	$scope.reverseSort = false;

// 	$rootScope.isLoading = false;

// 	$scope.changeOrder = function(order){
// 		$scope.reverseSort = (order == $scope.order) ? !$scope.reverseSort : false;
// 		$scope.order = order || 'countryName';
// 	}

// 	$scope.changeLocation = function(location){
// 		$location.path('/countries/'+location);
// 	}

// 	$scope.countries = countries.geonames;
// }])

// countriesApp.config(['$routeProvider', function($routeProvider){
// 	$routeProvider
// 		.when('/', {
// 		    templateUrl : './home/home.html',
// 		    controller: './home/HomeCtrl'
// 		})
// 		.when('/countries', {
// 		    templateUrl : './countries/countries.html',
// 		    controller : './countries/CountriesCtrl',
// 		    resolve: {
// 		    	countries: ['ccCountries', function(ccCountries){
// 		    		return ccCountries();
// 		    	}]
// 		    }
// 		})
// 		.when('/countries/:country', {
// 		    templateUrl : './country/country.html',
// 		    controller : './country/CountryCtrl',
// 		    resolve: {
// 		    	countryInfo: ['$route', 'ccCountry', function($route, ccCountry){
// 		    		return ccCountry($route.current.params.country);
// 		    	}]
// 		    }
// 		})
// 		.when('/error', {
// 		    template : '<p>Error Page: Not Found</p>'
// 		})
// 		.otherwise({
// 		  redirectTo : '/error'
// 	  });

// }])






