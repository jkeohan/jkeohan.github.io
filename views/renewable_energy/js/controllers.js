 myApp.filter('myfilter', function() {
   function strStartsWith(str, prefix) {
   	//console.log((str+"").indexOf(prefix))
    return (str+"").indexOf(prefix) === 0;
   }
   return function( items, query) {
   	//console.log(items)
   	//if empty return all items
   	if(!query) { return items }
    var filtered = [];
    angular.forEach(items, function(item) {
    	//console.log(item.Location)
      if(strStartsWith(item.location.toLowerCase(), query.toLowerCase())){
        filtered.push(item);
      }
    });
    //console.log(filtered)
    return filtered;
  };
});

myApp.controller('ChartController', function($scope, $http) {
  //compare change of country to world 
  $scope.greater = function(x){
    return function(a,b) {
      return (b > a) > x
    }
  };
  var worldAvg = 
	$scope.elmStyle;
	//UPDOWN USED TO ASSIGN CLASS CONFIGURED ON SPAN IN ORDER TO COLOR CODE GLYPHICON GREEN OR RED AND % VALUE
	$scope.updown = 0;
	$scope.percentage = function(value) {
		if(value != null) {
		var year2002 = d3.format('.2f')(value.years[0].amount )
		var year2012 = d3.format('.2f')( value.years[10].amount ) 
		var change = d3.format('.0f')((year2012 - year2002)/year2002 * 100)
    var change2 = $scope.greater(.3)

    console.log("change is ",change2(parseInt(year2002),parseInt(year2012) ) )
		if(change < 0) {  $scope.updown = "down"; return change}
		else { $scope.updown = "up"; return change }
		//return "up"
		};//end if
	};//end $scope.percentage

	d3.csv('data/data_regions.csv', function(data) {
    dateFormat = d3.time.format("%Y");   
			//console.log(data)
			//years are filtered out to be used later when creating new dataset
			years = d3.keys(data[0]).filter( function(key) { return key != "Location" && key != "Region" } ) 
			regions = d3.nest().key(function(d) { return d["Region"]}).sortKeys(d3.ascending).entries(data)
      regions = regions.filter(function(d) { return !(d.key == "World")})
      //[{key:"Africa",values:[{Location:"South Africa",2002:"12.1",2003:"13.1"}]}]
      //array containing only region names
  	 	var region = d3.set(data.map(function(d) {return d.Region } ) )
			.values().filter(function(d) { return !(d == "World")}).sort(d3.acscending) 
			colorScale = d3.scale.category10().domain(region);

			//Create a new, empty array to hold our restructured dataset
			dataset = [];
			//location: "Australia", region: "Oceana", years [[{amount:"6.2", year:"2002"},{amount:"6.1", year:"2003"}]]
			//Loop once for each row in data
			for (var i = 0; i < data.length; i++) {
				//Create new object with Location name and empty array
				dataset[i] = { location: data[i].Location, region: data[i].Region, years: [], color: colorScale(data[i].Region) };
				//Loop through all the years
				for (var j = 0; j < years.length; j++) {
					// If value is not empty then placeholder is created
					if (data[i][years[j]]) { dataset[i].years.push({ year: years[j], amount: data[i][years[j]] }); }
				}
			} 
		$scope.data_regions = dataset
		//$scope.$apply is needed because d3.csv is being used to retrieve the data 
		$scope.$apply();
			// var $scope.stringify = JSON.stringify($scope.ssdata)
	 })//d3.csv

	//$HTTP.GET CAN ALSO BE USED TO REPLACE D3.CSV AND $SCOPE.$APPLY
	// $http.get('data/data_regions.csv').then(function(response) {
	// 	$scope.data = response.data
	// }, function(err) { 
	// 	throw err; 
	// })
	
	//THE FILTERED VARIABLE IS BEING EVALUATED IN HTML
	$scope.$watch('filtered', function(newValue, oldValue) {
			if (newValue !== oldValue) {dashboard(newValue) }
	  },true)

	//THE FILTERED VARIABLE CAN ALSO BE EVALUATED IN CONTROLLER
	// $scope.$watch(function() { 
	// 	$scope.filtered = $scope.$eval("(filtered  = (data_regions | myfilter:query))")
	// 	console.log($scope.filtered)
	// 	});

	$scope.choice = function(country) { 
		$scope.query = country.location
		dashboard([country])
	}
	$scope.amount2002 = function(country) {
		//console.log(country)
		if( country.years[0]["year"] === "2002" ) { return country.years[0]["amount"] }
	}
	$scope.amount2012 = function(country) {
		if( country.years[10]["year"] === "2012" ) { return country.years[10]["amount"] }
	}
	$scope.color = function(country) {
		function convertHex(hex,opacity){
	    hex = hex.replace('#','');
	    r = parseInt(hex.substring(0,2), 16);
	    g = parseInt(hex.substring(2,4), 16);
	    b = parseInt(hex.substring(4,6), 16);
	    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
	    return result;
		}
	$scope.elmStyle = { 'background': convertHex(country.color,40) } 
	};
  $scope.mouseover = function(country) {
  	// console.log(d3.selectAll("path").filter(function(d) { return d.location === "Brazil"}))
  	// var allCountries = d3.selectAll(".country").style("opacity",.1)
		//debugger;
	  // var allListItems = d3.selectAll("ul li.country")
	  // allListItems.style("opacity",.5)
  	var chosen = d3.selectAll("path.location")
  	var filtered = chosen.filter(function(d) { return d.location === country.location })
  	chosen.transition().duration(500).style("stroke-width",1).style("opacity",.1)
  	filtered.transition().duration(500).style("stroke-width",4).style("opacity",1)
  }
  $scope.mouseout = function() {
  	var allPaths = d3.selectAll("path.location").transition().duration(500).style("stroke-width", 2).style("opacity",.4)
  }
});



myApp.controller('MainCtrl', function($scope, $http, $interval){
	// d3.json("donut-data-api.json", function(d) { console.log(d)})
  $interval(function(){
    $http.get('donut-data-api.json').then(function(response){
      // your API would presumably be sending new data, not the same
      // data each time!
      var data = response.data.map(function(d){ return d * ( 1 - Math.random() / 10) });
      $scope.donutData = data;
    }, function(err){
      throw err;
    });
  }, 1000);
});
