myApp.directive('spreadSheet', function() {
	function link(scope,el,attr) {
        
        scope.$watch('data', function(data) {
        	if(data) { 
        	  console.log(data)
        		render(data) } 
        });
    
     function render (data) {

     	   //var el = el[0]
        var sheet = d3.select(el[0])

     	 console.log(d3.keys(data[0]))
    	 var keyValues = d3.keys(data[0]).filter(function(d) {
    	 	return d === "Location" || d === "2002" || d === "2012" || d === "Region"
    	 })
     	 console.log(keyValues)
        sheet
        .append("div")
        .attr("class", "table")

        d3.select("div.table")
        .append("div")
        .attr("class", "head row")
        .selectAll("div.data")
        .data(keyValues)
        .enter()
        .append("div")
        .attr("class", "data")
        .html(function (d) {return d})
        .style("left", function(d,i) {return (i * 70) + "px"});

        d3.select("div.table")
        .selectAll("div.datarow")
        .data(scope.data, function(d) {return d.Location}).enter()
        .append("div")
        .attr("class", "datarow row")
        .style("top", function(d,i) {return (40 + (i * 40)) + "px"})
        // .on("mouseover", hover)
        // .on("mouseout", mouseOut);
        
        d3.selectAll("div.datarow")
        .selectAll("div.data")
        .data(function(d) {return d3.entries(d)})
        .enter()
        .append("div")
        .attr("class", "data")
        .html(function (d) {return d.value})
        .style("left", function(d,i,j) {return (i * 70) + "px"});
    }//render

	}//link
	return {
   link: link,
    restrict: 'E',
    scope: { data: '=' }
	}
});

// myApp.directive('lineGraph', function() {
// 	function link(scope,el,attr) {
        
//         scope.$watch('data', function(data) {
//         	if(data) { 
//         	  console.log(data)
//         	  render(data)
//         	 } 
//         });
//       function render(data) {

// 	//Dimensions and padding
	
//    };//link
//    return {
//    	link: link,
//    	restrict: 'E',
//    	scope: { data: '='}
//    }
//   });


