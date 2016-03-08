
var myApp = angular.module("myApp", ['ngAnimate']);

myApp.controller('flickrCtrl', ['$scope','$http',function($scope,$http){ 

	'use strict';
	//variables used to define which msg to display
	$scope.searchMsg = false;
	$scope.resultMsg = false;
	$scope.errorMsg = false;

	$scope.notificationMsg = ""
	//executed when submit button is clicked
	$scope.submit = function() {
		if($scope.searchForm.$invalid) {
			$scope.notificationMsg = "Please enter a search term...."
			console.log($scope.searchForm.$invalid);
		}
		else {
			$scope.notificationMsg = "Searching Flickr for photos tagged with " + $scope.searchQuery
			$scope.searchQueryCopy = $scope.searchQuery;
			// $scope.resultMsg = false;
			// $scope.searchMsg = true;
			//call fetchImage func with query.  
			fetchImage($scope.searchQueryCopy);
		}			
	};
	//fetchImage will remove resultsMsg and exeute flickr func which makes the API call
	function fetchImage(searchQuery){
		// $scope.resultsMsg = false;
		flickr(searchQuery)//$HTTP IS RETURNED SO A PROMISE CAN BE LEVEREAGED
		//.then used instead of deprecated .success\.error func
		//if successful execute updateView otherwise errorView
			.then(updateView, errorView);

		function updateView(result) {
			console.log(result);
			// $scope.searchMsg = false;
			// $scope.resultsMsg = true;

	      	$scope.result = result.data.photos.photo;
	      	$scope.results = $scope.result.length;
	      	$scope.notificationMsg = "We found " + $scope.results +  " search result(s) for " + $scope.searchQuery
		}

		function errorView(){
			$scope.notificationMsg = "There was an issue running the query"
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
