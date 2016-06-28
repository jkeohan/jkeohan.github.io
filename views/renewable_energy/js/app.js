var myApp = angular.module('myApp', ['ngRoute','ngAnimate']);


// myApp.config(['$routeProvider', function($routeProvider) {//$routeProvider service
// 	$routeProvider.
// 	when('/programoverview', { //when url is referenced
// 		templateUrl: "partials/programoverview.html", //display this partial
// 		controller: 'OverviewController' //use this controller
// 		}).
// 	otherwise({
// 		redirectTo: '/programoverview'
// 	});
// }]);
/*
1.ISSUE: Uncaught Error: [$injector:modulerr] http://errors.angularjs.org/1.4.4/$injector/modulerr?p0=myQuiz&p1=Error%3A%…(http%3A%2F%2Flocalhost%3A8081%2Flib%2Fangular%2Fangular.min.js%3A19%3A381)
	Kept getting the above error due to ng-app trying to load myQuiz
	<html ng-app="myQuiz">
	RESOLUTION: updated to: <html lang="eng" ng-app="myApp">
2.ISSUE: Directive not enumerating scope.data variable sent from controller
	RESOLUTION: missing } at end of controller...no controller errors just no enumeration
3. ISSUE: table headers (and data rows) is displaying vertically
	ASSUMPTION: might be CSS...fitlered for just two keys and same results.  
		WRONG: table was placed below svg and this isn't an svg but div's and html table
	RESOLUTION: removed the creation of the svg and used var sheet = d3.select(el)
4. ISSUE: Need to filter data based on specific columns
	RESOLUTION: 
		var ssData = data.map(function(d) { 
			return {
				Location: d.Location,
				 2002: d[2002]
			}
		})
	**This also required that 2002: d[2002] be in brackets otherwise error for either unexpected number or undexpected string
5. ISSUE: table data is created just below spread-sheet div 
	 RESOLUTION: ?????
6. ISSUE: table rows need to be decrease
	 RESOLUTION: changed div.datarow and div.data .style("top", function(d,i) {return (40 + (i * 40)) + "px"})
7. ISSUE: Unable to reoder keys in hash table.  Posted in EM/help slack
	 RESOLUTION: Opted to manuall create the table headers for now
8. ISSUE: table offset to left
	 RESOLUTION: bootsrap was applying a margin-left: -15px.  Added the following:
	  div.row {  margin-left: 0px !important; }
9: ISSUE: table overflows well
	 RESOLUTION: updated css for div.table to include:
	 		height:500px;
			overflow:scroll; 
12:ISSUE: removing padding from ul causes boxes ul to position right 40px
	 RESOLUTION; set padding to 0px
13: ISSUE: col 9 moved below col 3 after making edits to sidebar
	  RESOLUTION: 
14. ISSUE: page refresh iitially displays some code which is then either populated with data or left blank as in the 
           the case of a search box
    RESOLUTION: using claa="ng-cloak" on <div class="search ng-cloak">...css is display: none !important
15. ISSUE: Clicking on country code cell in table after it's been filtered changes it to Australia
	  RESOLUTION: 1) easier to add some logic\css to change pointer to default OR figure out why it's happening
	  Tried implementing CSS and this work but the item is still clickable.  Posted on angular forum

Line Chart
1. ISSUE: Legend offset to right by what seems 40px and text cut off due to extedning past svg
	 RESOLUTION: width attr needed to be set to 550px
2. ISSUE: first g in svg is 811x479 which exceeds width of svg (700)

3. ISSUE: cl error: Invalid value for <g> attribute transform="translate(NaN,0)"
	 RESOLUTION: moved groups = svg.selectAll("g").data(dataset).enter().append("g") into linechart function
4. ISSUE: Responsive doesn't redraw the lines and data is being cut off. g component extends past svg
					@ 730px width data starts to be cut off.
					Responsive doesn't exapnd the line if the inital resolution is @730px. 
	 RESOLUTION: moved paths = groups.selectAll("path").data(function(d) { }) to linechart funciton
5. ISSUE: when filter applied additional <g class="x axis"> elements are added.  3 being the most seen when using P to filter

6. ISSUE: A second yaxis is being added after search filter used and line chart redrawn.  This must be 
					due to the redraw funtion.  
	 RESOLUTION: 
Additional: 


1. d3.filter not a valid function
*/
