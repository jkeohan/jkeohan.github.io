(function() { 

	var margin = {top:10,right:0,bottom:10,left:40},
				width = 650 - margin.left - margin.right,
				height = 800 - margin.top - margin.bottom
	var colorScale = d3.scale.category10()
	var tempColor;
	var playInterval;
	var years = [2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012]
	var year = 2002;
	var data;

	//var source = d3.select("body")
	var barGraphTitle = d3.select(".barGraph-title")
	var playAll = d3.select(".playAll")
	var buttonYears = d3.select(".buttonContainer")
	var svg = d3.select('.countrystats').append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)		
		.append("g")//.attr({ width: width, height: height, transfom: "translate(20,50)"})
	var worldTotal;

			// setup x 
			var xValue = function(d) { return d[year];}, // data -> value
	    	xScale = d3.scale.linear().range([0,width - 160]).domain([0,100]), // value -> display
	    	xMap = function(d) { return xScale(xValue(d));}, // data -> display
	    	xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(height);
	    

	    	// setup y
			var yValue = function(d) { return d.Location;}, // data -> value
		    yScale = d3.scale.ordinal().rangeBands([0, height], .1), // value -> display
		    yMap = function(d) { return yScale(yValue(d));}, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

			barGraphTitle.insert("h2").text("Renewable Energy (%) of Total Energy Generation")
			barGraphTitle.insert("h2").attr("class", "worldTotal").text("World Total: " )
			playAll.text("▶ PLAY ALL YEARS");

			svg.append('g').attr("class", "x Axis").attr("transform","translate(120,0)").call(xAxis)


//CSV.......
      d3.csv("data/data_regions.csv", function(data) {

      	var region = d3.set(data.map(function(d) { return d.Region } ) )
					.values().filter(function(d) { return !(d == "World")}).sort(d3.acscending) 

				colorScale.domain(region)

      	var regions = d3.nest().key(function(d) { return d["Region"]})
      		.sortKeys(d3.ascending)
      		.entries(data)
      		.filter(function(d) { return !(d.key == "World")})
    
      	function colorize (regions) {
					regions.forEach( function(d,i) {
						d.color = colorScale(d.key);
					})
				}

				colorize(regions)
				
				var rlegend = d3.models.legend().fontSize(15).width(width-125).height(height).inputScale(colorScale)
				svg.datum(regions).call(rlegend)
      	data = data 
      	worldVal = data

      	var buttons = buttonYears.selectAll("div").data(years).enter().append("div")
				.text(function(d) { return d})
				.attr("class", function(d) { if( d === year ) return "button selected"; else return "button" } ) 
				.on("click", function(d) { clearInterval(playInterval); update(d) })

         playAll.on("click", function() {
         	 svg.append("text")
	    			.attr("class", "loading")
				    .text("Loading ...").attr("font-size",20)
				    .attr("x", function () { return width/2; })
				    .attr("y", function () { return 30; });

           var i = 0;
           playInterval = setInterval(function() {

            update(years[i]);
            i++;
            if(i > years.length - 1) { clearInterval(playInterval);}
           }, 2000);
          });

        update(year,regions)
//UPDATE FUNCITON......
        function update(year,regions) {
        

        	xScale.domain([0,100])

      		//svg.append('g').attr("class", "x axis").attr("transform","translate(250,0)").call(xAxis)

        	svg.selectAll(".loading").remove()

        	total = worldVal.filter(function(d) { var total = d["Location"] === "World"; return total}) 
      
        	worldTotal = total[0][year]

        	barGraphTitle.select(".worldTotal").html("World Total: "  + worldTotal + "%")
       
      		d3.select(".selected").classed("selected", false)
      		buttons.attr("class", function(d) { if (d === year ) return "button selected"; else return "button"})
      		//REMOVE WORLD VALUE
      		data = data.filter(function(d) { return !(d["Location"] === "World") })
      		data.sort(function(a, b) {return d3.ascending(+a[year], +b[year]);});
         // console.log(data.map(function(d) {return d.Location}))

	      	yScale.domain(data.map(function(d) { return d.Location}))

	      	//Data Join
		      var rect = svg.selectAll("rect").data(data, function(d) { return d.Location})
	      	var text = svg.selectAll("text").data(data, function(d) { return d.Location})
	      	var label = svg.selectAll(".label").data(data, function(d) { return d.Location})

		      //Update
	      	rect.transition().duration(1000)
	      		.attr("y", function(d,i) { return yScale(d.Location) })
	      		.attr("width", function(d) { return xScale(+d[year])})
	      		//.attr("fill", function(d,i) { return color(i) })

	      	text.transition().duration(1000).style("opacity", 9)
	      		.attr("y", function(d,i) { return yScale(d.Location) + 12 } )
	      			.text(function(d) { return d["Location"] })

	      	label.transition().duration(1000).style("opacity", 9)
	      		.attr("y", function(d,i) { return yScale(d.Location) + 12 } )
	      		.attr("x", function(d,i) { return xScale(+d[year]) + 130})
	      		.text(function(d) { return +d[year]})
	      
		      //Enter
	      	rect.enter().append('rect')
	      		.attr("x",120)
	      		.attr("width", function(d) { return xScale(+d[year])})
	      		.attr("y", function(d,i) { return yScale(d.Location) })
	      		.attr("height", yScale.rangeBand())
	      		.attr("fill", function(d,i) { 
      				var val;
							regions.forEach(function(obj) {
								if(d.Region === obj.key) { 
									val = obj.color } 
							})
							return val
	      		})
	      		.on("mouseover", mouseover)
	      		.on("mouseout", mouseout)
	      	
	      	text.enter().append("text")
	      		.attr("x", 110)
	      		.attr("y", function(d,i) { return yScale(d.Location) + 12 } )
	      		.attr("font-size", 15)
	      		.attr("text-anchor", "end")
	      		.attr("font-weight", "bold")
	      		.attr("class","enter")
	      		.text(function(d) { return d["Location"] })
	      		// .text(function(d) { return d["Location"] + " " + +d[year] + "%"})

	      	label.enter().append("text")
	      		.attr("class", "label")
	      		.attr("x", function(d,i) { return xScale(+d[year]) + 130})
	      		.attr("y", function(d,i) { return yScale(d.Location) + 12})
	      		.attr("fill", "black")
	      		.attr("font-size" ,15)
	      		.text(function(d) { return +d[year]})

	      function mouseover (d) { tempColor = this.style.fill;
          d3.select(this).style('opacity', .5).style('fill', 'steelblue')}

        function mouseout (d) { 
        	d3.select(this).style('opacity', 1).style('fill', tempColor)}
		       }
			});
	})()
