var myApp = angular.module("myApp", ['ui.router','ngAnimate'])

myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider//this is a service
		.state('/', {
			url:"/",
			templateUrl:"partials/home.html"
		})
		.state('home', {
			url:"/home",
			templateUrl:"partials/home.html"
		})
		.state('meal', {
			url:'/meal',
			templateUrl: 'partials/meal.html',
			controller: 'mealCtrl'
		})
		.state('earnings', {
			url:'/earnings',
			templateUrl: 'partials/earnings.html',
			controller: 'earningsCtrl'
		})
		.state('error', {
			url:'/error',
			templateUrl: 'partials/error.html'
		})
})

myApp.run(function($rootScope, $state, $timeout) {
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

myApp.controller('earningsCtrl', ['$scope','$rootScope', function($scope,$rootScope){
		$scope.resetAll = function() {
			$rootScope.totalTip = 0;
    	$rootScope.mealCount = 0;
    	$rootScope.avgTip = 0;
		};
}])

myApp.controller('mealCtrl', ['$scope','$rootScope', function($scope,$rootScope){ //['$scope'] it needs to be  a string here
	'use strict'
	var mPrice,mTax,mTip,sub,total
	console.log("yes")

	$scope.notComplete = true;

	$scope.init = function() {
	$scope.subtotal = 0;
	$rootScope.tip = 0;
	$scope.total = 0;
	// $rootScope.totalTip = 0;
	// $rootScope.mealCount = 0;
	$rootScope.avgTip = 0;
	}

	$scope.init()

	$scope.submit = function() {

		console.log("yes")
		//console.log($scope.mealForm.$invalid) //
		mPrice = $scope.mealPrice;
		mTax = $scope.mealTax;
		mTip = $scope.mealTip
		calCharges()
	}
	$scope.cancel = function(form){	
		$scope.mealPrice = 0;
		$scope.mealTax = 0;
		$scope.mealTip = 0;
		//form.$setPristine();
	}



	function calCharges() {
		$rootScope.tip = (mPrice * (mTip/100));
		$scope.tax = (mPrice * (mTax/100));
		$scope.subtotal = mPrice + $scope.tax;
		$scope.total = ($scope.subtotal + $scope.tax);
		calEarnings();
	};

	function calEarnings() {
		// $rootScope.totalTip += $rootScope.tip;
		// $rootScope.mealCount = $rootScope.mealCount + 1;
		// $rootScope.avgTip += $rootScope.totalTip/$rootScope.mealCount;

		$rootScope.totalTip += $rootScope.tip;
		$rootScope.mealCount = $rootScope.mealCount + 1;
		$rootScope.avgTip += $rootScope.totalTip/$rootScope.mealCount;
	};
}]);
	
// var myApp = angular.module('waiterApp', []);

// myApp.controller('WaiterCtrl', ['$scope', function($scope){

// 	$scope.resetDetails = function(){
// 		$scope.mealPrice = '';
// 		$scope.taxRate = '';
// 		$scope.tipPercentage = '';
// 	};

// 	$scope.initCharges = function(){
// 		$scope.subtotal = 0;
// 		$scope.tip = 0;
// 		$scope.total = 0;
// 	};

// 	$scope.initEarnings = function(){
// 		$scope.tipTotal = 0;
// 		$scope.mealCount = 0;
// 	};

// 	$scope.init = function(){
// 		$scope.formError = "";
// 		$scope.resetDetails();
// 		$scope.initCharges();
// 		$scope.initEarnings();
// 	};

// 	$scope.init();

// 	$scope.submitDetails = function(){
// 		if($scope.enterPriceForm.$invalid){
// 			$scope.formError = "Please enter valid values ";
// 		}
// 		else{
// 			$scope.formError = "";
// 			$scope.tipTotal += $scope.tip;
// 			$scope.mealCount++;
// 		}
// 	};

// 	$scope.$watchGroup(['mealPrice', 'taxRate', 'tipPercentage'], function(newValues, oldValues, scope) {
// 		if($scope.enterPriceForm.$invalid){
// 			$scope.initCharges();
// 		}
// 		else{
// 			$scope.formError = "";
// 			$scope.subtotal = $scope.mealPrice * (1 + $scope.taxRate/100);
// 			$scope.tip = $scope.mealPrice * ($scope.tipPercentage/100);
// 			$scope.total = $scope.subtotal + $scope.tip;
// 		}
// 	});

// 	$scope.$watchGroup(['tipTotal', 'mealCount'], function(newValues, oldValues, scope) {
// 		if($scope.mealCount != 0){
// 			$scope.avgTipPerMeal = $scope.tipTotal/$scope.mealCount;
// 		}
// 		else{
// 			$scope.avgTipPerMeal = 0;
// 		}
		
// 	});
// }]);

