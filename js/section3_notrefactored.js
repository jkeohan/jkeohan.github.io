	(function () { 
//RESPONSIVE DESIGN

//DEFINE VARIABLES

//IMPORT DATA (includes any necessary formatting)
d3.csv()

//INITIALIZE ELEMENTS
function init(){

}

//CREATE CHARTS\GRAPHS
function buildLineChart(){
	
}

//SUPPORTING FUNCTIONS

	//Dimensions and padding
			var margin = {top:20,right:30,bottom:50,left:50}
			var w = 700- margin.left - margin.right;
			var h = 600 - margin.top - margin.bottom;
			var tooltipcolor;
			var iceland_active = true;
		
			var padding = [ 20, 10, 50, 50 ];  //Top, right, bottom, left
			var colorScale = d3.scale.category10()

			//Set up date formatting and years
			var dateFormat = d3.time.format("%Y");

			//Set up scales
			var xScale = d3.time.scale()
				.range([ margin.left, w - margin.left - margin.right]);
			
			var yScale = d3.scale.linear()
				.range([ margin.top, h - margin.bottom ]);

			//Configure axis generators
			var xAxis = d3.svg.axis().scale(xScale)
				.orient("bottom")
				.ticks(15)
				.tickFormat(function(d) { return dateFormat(d); });

			var yAxis = d3.svg.axis().scale(yScale)
				.orient("left")
				.tickFormat(function(d) { return d + "%" } );     

			//Configure line generator
			var line = d3.svg.line()
				.x(function(d) { return xScale(dateFormat.parse(d.year));})
				.y(function(d) {return yScale(+d.amount);
				});

			//Create main SVG
			var svg = d3.select(".lineChart").append("svg")
				.attr("width", w + margin.left + margin.right)
				.attr("height", h)
				.append("g")

			var tooltip = d3.select(".lineChart").append("div") 
				.attr("class","s3tooltip")

			var tooltipTail = d3.select(".lineChart").append('div')
					.attr("class","tooltipTail hidden")
			
			// var sideBar = d3.select(".sideBar").append("div").attr("id", "modal")
			//   .style("color", "black")

			//Load data
			d3.csv("data/data_regions.csv", function(data) {
	
				//d3.text("tooltip.html", function(data) { d3.select(".sideBar").append("div").attr("id", "modal").html(data)})
		
				var regions = d3.nest().key(function(d) { return d["Region"]}).sortKeys(d3.ascending).entries(data)
      	regions = regions.filter(function(d) { return !(d.key == "World")})

    	 	var region = d3.set(data.map(function(d) { return d.Region } ) )
				.values().filter(function(d) { return !(d == "World")}).sort(d3.acscending) 

      	colorScale.domain(region)
      
      	function colorize (regions) {
					regions.forEach( function(d,i) {
						d.color = colorScale(d.key);
					})
				}

				colorize(regions)

				var years = d3.keys(data[0]).filter( function(key) { return key != "Location" && key != "Region" } ) 
			
				//Create a new, empty array to hold our restructured dataset
				var dataset = [];

				//Loop once for each row in data
				for (var i = 0; i < data.length; i++) {

					//Create new object with Location name and empty array
					dataset[i] = {
						location: data[i].Location,
						region: data[i].Region,
						headlines: []
					};

					//Loop through all the years
					for (var j = 0; j < years.length; j++) {

						// If value is not empty
						if (data[i][years[j]]) {
							//Add a new object to the emissions data array
							//for this country
							dataset[i].headlines.push({
								year: years[j],
								amount: data[i][years[j]]

							});
						}
					}
				}

					//Converted data into new array of hashes {location:China,region:Asis,year:2002,value:12}
				var circleData = (function() {
					var array = [];
					var keys = d3.keys(data[0]).filter(function(key) { return !(key == "Location" || key == "Region") });
					data.forEach(function(d) {
						keys.forEach(function(year) {

							obj = {
								location:d.Location,
								region:d.Region,
								year:dateFormat.parse(year),
								value:+d[year]
							}
							array.push(obj)
						})
					})
					return array
				}
				)()

				//console.log(circleData)

				//tooltip1(iceland[0])

				xScale.domain(d3.extent(years, function(d) { return dateFormat.parse(d)}))
				yScale.domain([ d3.max(dataset, function(d) { return d3.max(d.headlines, function(d) {
							return +d.amount; });
					}),
					0
				]);

				//Make a group for each Nationality
				var groups = svg.selectAll("g").data(dataset).enter()
					.append("g")

				var text = groups.append("text")
					.attr("class", "label")
					.attr("x", w - 40 )

				//Within each group, create a new line/path,
				//binding just the headlines data to each one
				//.data(dataset) //using this format will warp the line color and append World as the 
				//title for every line
				groups.selectAll("path").data(function(d) { return [d]}).enter().append("path")	
					.style("stroke", 
						function(d,i) { 
      				var val;
							regions.forEach(function(obj) {
								if(d.region === obj.key) { 
									val = obj.color } 
							})
							d.color = val
							return val
	      		})
					.style("stroke-width", 3)
					.style("opacity",.4)
					.attr("id",function(d) { return d.region})
					.attr("class", function(d) {
							switch (d.region) {
								case "Oceana": return "line Oceana"
								case "Europe": return "line Europe"
								case "North America": return "line NA"
								case "Asia": return "line Asia"
								case "Middle East": return "line ME"
								case "Latin America": return "line LA"
								default: return "line"
							}							
					})
					.on("mouseover", function(d) {
						tooltip1(d);
						mouseOver.call(this,d,d.color)
							//mouseOver(d,d.color)
					})
					.on("mouseout", function(d) {
						mouseout(d)
					})
					.attr("d", function(d) { return line(d.headlines)} )
					//.append("title").text(function(d) {return d.location})

		var points = svg.selectAll("circle").data(circleData)

		points.enter().append("circle")
					.attr("cx", function(d) { 
						return xScale(d.year)})
					.attr("cy", function(d) { return yScale(d.value)})
					.attr("r", 0)
					.attr("class", "points")
					.style("fill", function(d) { return colorScale(d.region)} )
					.style("stroke","white")
					.style("stroke-width",2)
					.attr("id", function(d) { return d.location})
					.on("mouseover",circlemouseOver)
					.on("mouseout",circlemouseOut)
						//.append("title").text(function(d) { return d.value})


				if(iceland_active) {
				var iceland = dataset.filter(function(d) { return d.location == "Iceland"})
				mouseOver(iceland[0],"#7f7f7f")
				//circlemouseOver(iceland[0])
				tooltip1(iceland[0])
				iceland_active = false;
				}

				function circlemouseOver(d) {
					//console.log(d)
					var location = d.location
					path = d3.selectAll("path").filter(function(d) { return d["location"] === location})
					path.style("stroke-width", 10)
					//console.log(path)
					var circles = d3.selectAll("circle").filter(function(c) {
						return c.location == d.location
					}).attr("r",5).attr("fill",function(d) { return d.color})
					// lp.transition().style("stroke-width",10)
			// 		lp.style("stroke")
			 
		
			// 		c = d3.select(this)
			// 			c.transition().duration(250)
			// .attr("stroke-width",20)
			// .attr("stroke", "rgba(230,230,2s30, .8)")
			// .attr("r", 10)
				}

				function circlemouseOut(d) {
				var location = d.location
					path = d3.selectAll("path").filter(function(d) { return d["location"] === location})
					path.style("stroke-width", 3)
						var circles = d3.selectAll("circle").filter(function(c) {
					return c.location == d.location
				}).attr("r",0)
				}
			
				function mouseOver(d,color) {
					if(iceland_active) { 
						console.log("inside")
						//mouseout(iceland[0])
					}else {	path = d3.selectAll("path").filter(function(d) { return d["location"] === "Iceland"})
									path.style("stroke-width", 3)
									var circles = d3.selectAll("circle").filter(function(c) {return c.location == "Iceland" } ).attr("r",0)
					}


					// var year = d3.time.format("%Y")
					// var xDate = xScale.invert(d3.mouse(this)[0])


					// var xDate = x.invert(d3.mouse(this)[0]), //<-- give me the date at the x mouse position
	   		 	// bisect = d3.bisector(function(d) { return d.date; }).left, //<-- set up a bisector to search the array for the closest point to the left
	   			// idx = bisect(s.values, xDate); //<-- find that point given our mouse position
             
					var location = d.location
					path = d3.selectAll("path").filter(function(d) { 
						return d["location"] === location})
					path.style("stroke-width", 10)
					// sideBar.html(
					// 			"<table> <tr>" +
					// 			        "<th></th>" +
					// 			   " </tr>" +
					// 			    "<tr><td>Country</td>" + "<td>" + d.location  + "</td></tr>" +
					// 			     "<tr><td>Region</td>" + "<td>" + d.region  + "</td></tr>" +
					// 			     "<tr><td>2002</td>" + "<td>" + d.headlines[0].amount  + "</td></tr>" +
					// 			     "<tr><td>2003</td>" + "<td>" + d.headlines[1].amount   + "</td></tr>" +
					// 			     "<tr><td>2004</td>" + "<td>" + d.headlines[2].amount   + "</td></tr>" +
					// 			     "<tr><td>2005</td>" + "<td>" + d.headlines[3].amount   + "</td></tr>" +
					// 			     "<tr><td>2006</td>" + "<td>" + d.headlines[4].amount  + "</td></tr>" +
					// 			     "<tr><td>2007</td>" + "<td>" + d.headlines[5].amount   + "</td></tr>" +
					// 			     "<tr><td>2008</td>" + "<td>" + d.headlines[6].amount   + "</td></tr>" +
					// 			     "<tr><td>2009</td>" + "<td>" + d.headlines[7].amount   + "</td></tr>" +
					// 			     "<tr><td>2010</td>" + "<td>" + d.headlines[8].amount  + "</td></tr>" +
					// 			     "<tr><td>2011</td>" + "<td>" + d.headlines[9].amount   + "</td></tr>" +
					// 			     "<tr><td>2012</td>" + "<td>" + d.headlines[10].amount   + "</td></tr>" +
					// 			"</table>"
					// 			)
	// 				).style("background-color","rgba(214, 233, 198,0.5)" )
	// //.style("border","solid 10px " + c)
	// //.style("background-color", "#d6e9c6" )
	// 				var circles = d3.selectAll("circle").filter(function(c) {
	// 					return c.location == d.location
	// 				}).attr("r",5).attr("fill",function(d) { return d.color})


					// .style("background-color","rgba(214, 233, 198,0.5)" )
					// 	.style("border","solid 10px " + color)
	//.style("background-color", "#d6e9c6" )
					var circles = d3.selectAll("circle").filter(function(c) {
						return c.location == d.location
					}).attr("r",5).attr("fill",function(d) { return d.color})

				}

				// function getSortedKeys(obj) {
			 //    var keys = []; for(var val in obj) keys.push(val);
			 //    //console.log(keys)
			 //    return keys.sort(function(a,b){return obj[a]-obj[b]});
				// }

				function mouseout(d){
					var location = d.location
					path = d3.selectAll("path").filter(function(d) { return d["location"] === location})
					path.style("stroke-width", 3)
					//d3.selectAll("path").transition().style("stroke-width", 3)	
					var circles = d3.selectAll("circle").filter(function(c) {
						return c.location == d.location
					}).attr("r",0)	
							ttooltip.transition().duration(500).style("opacity",0)
					d3.select(".tooltipTail").classed("hidden",true)	
				}

				function tooltip1 (d){
					var yl = yScale(+d.headlines[d.headlines.length -1 ].amount) 
					tooltipTail(d)
					text.attr("y", yScale(+d.headlines[d.headlines.length -1 ].amount) + 4 )

					tooltip.style("opacity",0)
	  				tooltip.style("border" , "3px solid " + d.color).transition().duration(1000).style("opacity",1)
    				tooltip.html(
						'<span class="countryName">' + d.location + '</span><br/>') //+ 
						// '2012: <span class="value">' + d. + '%</span><br/>'  + 
						// "2012"+ ": " + '<span class="value">' + "2010" + '%</span>')
						//positions tooltip on bottom of page
						// .style("left", (d3.event.pageX - 30) + "px")
						// .style("top", (d3.event.pageY -50 ) + "px")
					 	.style("left", w - 35 + "px")
						.style("top", yl -18 + "px")
					}

				function tooltipTail (d) {
					var currentYear = d.headlines
					var tailX = w -70;
					var tailY = yScale(+d.headlines[d.headlines.length -1 ].amount) 
				  var tail = d3.select(".tooltipTail").classed("hidden",false)
				  .style("border-right" , "25px solid " + d.color)
				  	.transition().duration(1000)
						.style("left", tailX + 5 + "px")
						.style("top", tailY -8 + "px")			
				}


				//Axes
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (h - padding[2]) + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + (padding[3]) + ",0)")
					.call(yAxis)
                // Add rotated "Number of Headlines" unit of measure text to x-axis
              .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("x", -20)
              .attr("y", 5)
              .attr("dy", ".91em")
              .style("text-anchor", "end")
              .text("Percent of Engery Generation ");
                

			});
})()
			//End USA data load function
//1. Tooltip is positioned at top of page
//RESOLUTION: changed code to select(".tooltip") instead of body
//2. After adding Panel sideBar div positioned top left of page
//RESOLUTION: 
