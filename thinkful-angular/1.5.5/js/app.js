
var myApp = angular.module("myApp", ['ngAnimate']);

myApp.controller('flickrCtrl', ['$scope','$http',function($scope,$http){ 

	'use strict';
	$scope.searchMsg = false;
	$scope.resultMsg = false;
	$scope.errorMsg = false;

		$scope.submit = function() {
		if($scope.searchForm.$invalid) {
			console.log($scope.searchForm.$invalid);
		}
		else {
			$scope.searchQueryCopy = $scope.searchQuery;
			// $scope.searchQuery = ' ';
			$scope.resultMsg = false;
			$scope.searchMsg = true;
			//CALL FETCHIMAGE 
			fetchImage($scope.searchQueryCopy);
		}
			
	};

	function fetchImage(searchQuery){
		$scope.resultsMsg = false;
		flickr(searchQuery)//$HTTP IS RETURNED SO A PROMISE CAN BE LEVEREAGED
			.then(updateView, errorView);
		
		function updateView(result) {
			console.log(result);
			$scope.searchMsg = false;
			$scope.resultsMsg = true;
	      	$scope.result = result.data.photos.photo;
	      	$scope.results = $scope.result.length;
		}

		function errorView(){
			$scope.searchMsg = false;
		}
	}

	//FLICKR WILL EXECUTE THE XHR REQUEST ONLY
	function flickr(searchQuery){
		//this function is responsible for all the flickr stuff
		var url = "https://api.flickr.com/services/rest";
		var request = {
	    	method: 'flickr.photos.search',
	    	api_key: '1f248d8314f6e79c501fdb818513f0ff',
	    	tags: $scope.searchQueryCopy,
	    	format: 'json',
	    	jsoncallback: 'JSON_CALLBACK',
	    	per_page: 6
		};
		//$HTTP NEEDS TO BE RETURNED
	 	return $http({
	      method: 'JSONP',
	      url: url,
	      params: request
	    });
	}

}]);
