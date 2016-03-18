angular.module('ccLibrary', [])
	.constant('GEONAME_API_BASEURL', 'http://api.geonames.org/')
	.constant('GEONAME_USERNAME', 'asifparksleepfly')

	.factory('ccURL', ['$http', '$q', 'GEONAME_API_BASEURL', 'GEONAME_USERNAME',
						 function($http,   $q,   GEONAME_API_BASEURL,   GEONAME_USERNAME){
		
		return function(path, params){
			var params = params || {};
			params.username = GEONAME_USERNAME;
			params.type = 'JSON'; 
			var defer = $q.defer();
			//console.log(GEONAME_API_BASEURL + path)
			$http.get(GEONAME_API_BASEURL + path,
				{
					params: params,
					cache: true
				})
				.success(function(data){
					defer.resolve(data);
				});
				return defer.promise;
			}

	}])
	.factory('ccCountries', ['ccURL',
		function(ccURL){
			return function(){
				console.log(ccURL('countryInfo'))
				return ccURL('countryInfo');
		}		

	}])

	.factory('ccCountry', ['ccURL',
		function(ccURL){
			console.log()
			return function(name){
				debugger;
				console.log(name)
				return ccURL('countryInfo', {country: name});
		}		

	}])

	.factory('ccNeighbors', ['ccURL',
		function(ccURL){
			return function(name){
				return ccURL('neighbours', {country: name});
		}	

	}])

	.factory('ccCapital', ['ccURL',
		function(ccURL){
			return function(name){
				return ccURL('search', {country: name, featureCode: 'PPLC'});
		}	

	}])
