var myApp = angular.module("myApp",['ngAnimate']);

myApp.controller('flickrCtrl', ['$scope','$http',function($scope,$http){ 
	'use strict';
	$scope.searchMsg = false;
	$scope.resultMsg = false;
	$scope.errorMsg = false;

	$scope.submit = function() {
		if($scope.searchForm.$invalid) {
			console.log($scope.searchForm.$invalid)
		}
		else {
			$scope.searchQueryCopy = $scope.searchQuery;
			// $scope.searchQuery = ' ';
			$scope.resultMsg = false;
			$scope.searchMsg = true;

			var url = "https://api.flickr.com/services/rest";
			var request = {
		    method: 'flickr.photos.search',
		    api_key: '1f248d8314f6e79c501fdb818513f0ff',
		    tags: $scope.searchQueryCopy,
		    format: 'json',
		    jsoncallback: 'JSON_CALLBACK'
			}

			 $http({
		      method: 'JSONP',
		      url: url,
		      params: request
		    })
			 	.success(function(result) {
			 		console.log("success")
			 		updateView(result)
				 })
			 	.error(function(result) { 
			 		console.log(('error'))
			 		errorView()
			 	})
			}//submit()

			function updateView(result) {
					console.log(result)
					$scope.searchMsg = false;
       		$scope.resultsMsg = true;
		      $scope.result = result.photos.photo
		      $scope.results = $scope.result.length
			}

			function errorView(){
				$scope.searchMsg = false;

			}
		}//flickrCtrl
}]);	

//JSON RETURNED BY FLICKR API CALL
// id: "25022884939",
// owner: "43046057@N05",
// secret: "c284ab498f",
// server: "1456",
// farm: 2,
// title: "Doggy Heaven",
// ispublic: 1,
// isfriend: 0,
// isfamily: 0

//FORMAT FOR DISPLAYING IMG
// https://farm{farmId}.staticflickr.com/{serverId}/{id}_{secret}.jpg
// https://farm2.staticflickr.com/1456/25022884939_c284ab498f.jpg
		
 
// ISSUE: Cannot read property of jsonp
// RESOLUTION: Removed the jsonp from $http.jsonp and then updated code to use thinkfuls $http request format. 

//ISSUE: resultsMsg not changing until after promise which means both msgs are being displayed.  Only happens on 
//       running a subsequent query
//RESOLUTION: 

//ISSUE: unable to animate the searchMsg div or images.  would like to stagger the pics as they enter
//RESOLUTION: 
//REVIEW ARTICLE WITH MOHAMMAD
//TO THEN() OR TO SUCCESS()
//http://www.peterbe.com/plog/promises-with-$http
