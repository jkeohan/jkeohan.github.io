
 window.onresize = function(event) { redraw() }
 //d3.select(window).on('resize',resize)

 	function canvasSize(targetElement) {
    var newHeight = parseFloat(d3.select(targetElement).node().clientHeight);
    var newWidth = parseFloat(d3.select(targetElement).node().clientWidth);

    return [newWidth,newHeight];
  }

	function dashboard(data) { 
			console.log(data)
			createLineChart(data,".lineChart")
			filterLegend(data,".legend")
			redraw()
	};

	//FilterLegend is executed as .legend class as: .on("onClick", filterLegend);
	function filterLegend(legend) {
		// var active = d3.selectAll(targetDiv).active ? "false" : "true"
		// var newopacity = active ? "0" : "1"
		// d3.selectAll(targetDiv).style("opacity",1)
		//console.log(legend.text)
		var chosen = d3.selectAll("path.location")
  	var filtered = chosen.filter(ƒ('d.region === legend.text'))//example use of jetpack
  	var filtered = chosen.filter(function(d) { return d.region === legend.text })
  	chosen.transition().duration(500).style("stroke-width",1).style("opacity",.1)
  	filtered.transition().duration(500).style("stroke-width",4).style("opacity",1)
	}

	function createLineChart(data,targetDiv) {

  	svg = d3.select(".lineChart")//.append("svg").attr("class","svg")
  	var tooltip = d3.select("body").data(data).append("div").attr("class","tooltip")
  	.style("postion","absolute")
  	.style("padding","0 10px")
  	.style("opacity", 0)

		groups = svg.selectAll("g.line").data(data)
		groups.enter().append("g").classed("line",true)
		groups.exit().transition().duration(1000).style("opacity",0).remove()
		//DATA JOIN
		paths = groups.selectAll("path").data(function(d) { return [d] })

		//ENTER
		paths.enter().append("path")	
			.on('mouseover', function() { d3.select(this).style("stroke-width", 5) } ) 
			.on('mouseout',  function() { d3.select(this).style("stroke-width", 2 ) } )
			.on('click', function() { 
				chosen = d3.selectAll('li.country')//.filter(function(d) { return d.id == "country Australia" })
				console.log(chosen)
			})
			.style("stroke-width", 0).style("opacity",.4)
			.style("stroke", d3.f('d.color')) //function(d,i) {  return d.color})
			.attr("id",function(d) { return d.location})
			.classed("location",true)
			.append("title").text( d3.f('d.location')) //function(d) {return d.location})

		
	  //UPDATE
	  //Array[1]...0: path#Oceana..__data__: Object..color,location,region,years[]
		paths.transition().duration(1000)
		.select("title").text(function(d) {return d.location})	
		if(d3.select(".x.axis")[0][0] === null ) {  xgScale = svg.append("g").attr("class", "x axis")   }
		if(d3.select(".y.axis")[0][0] === null ) {  ygScale = svg.append("g").attr("class", "y axis")
			.append("text")//.style("text-anchor","start")
  		.attr({ class: "ylabel", y: -60, x: -310, dy: ".71em" })
  		.attr("transform", "rotate(-90)")	
  		.text("Renewable Energy Output").style("font-size",15)   }
		
		//CONFIGURE SCALES
		xScale = d3.time.scale().domain(d3.extent(years, function(d) { return dateFormat.parse(d)}))
		yScale = d3.scale.linear().domain([ d3.max(data, function(d) { return d3.max(d.years, function(d) {return +d.amount; });}),0 ]);
		//CONFIGURE AXISES
		xAxis = d3.svg.axis().orient("bottom").ticks(15).tickFormat(function(d) { return dateFormat(d); });
		yAxis = d3.svg.axis().orient("left").tickFormat(function(d) { return d + "%" } ); 
		//PATH GENERATOR 
		line = d3.svg.line()
			.x(function(d) { return xScale(dateFormat.parse(d.year));})
			.y(function(d) {return yScale(+d.amount);
		});
		//LEGEND
		//IF STATEMENT USED IN CASE LEGEND ALREADY EXISTS OTHERWISE IT WILL BE REWRITTEN WITH EACH ITERATION
		//d3.selectAll('.legend') will contain one object even it's it's empty so we need to go examine that
		//element to see if it contains any legends
		if(d3.selectAll(".legend")[0].length === 0)	{
			var rlegend = d3.models.legend()
		    .fontSize(".8em")
		   	.position("horizontal")
		    .inputScale(colorScale)
		    .on("onClick", filterLegend);
			var svg_legend = d3.select("#graph-legend");
			svg_legend.call(rlegend);
			// rlegend.on("mouseOver", function(d) { console.log(d)} )
		};
		// INCLUDED TO TEST RESUABLE LEGENDS VERTICAL ATTR
			// if(d3.selectAll(".legend")[0].length === 0)	{
			// var rlegend = d3.models.legend()
		 //    .fontSize(".8em")
		 //   	.position("vertical")
		 //   	// .width(700)
		 //   	// .height(200)
		 //    .inputScale(colorScale)
		 //    .on("onClick", filterLegend);
			// svg.call(rlegend);
			// rlegend.on("onClick", filterLegend);
		 // };
	};//CREATELINECHART

	function redraw() {
			//console.log("inside redraw")
			var linechart = canvasSize(".lineChart")
			var margin = {top:20,right:5,bottom:30,left:70}
			var w = linechart[0] - margin.left - margin.right;
			var h = linechart[1] - margin.top - margin.bottom;	
			//Create main SVG
			svg.attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom)
			//Update Scales
			xScale.range([margin.left, w + 20])
			yScale.range([ margin.top, h ])	
			//Update Axis's
			xAxis.scale(xScale)//.orient("bottom").ticks(15).tickFormat(function(d) { return dateFormat(d); });
			yAxis.scale(yScale)//.orient("left").tickFormat(function(d) { return d + "%" } );   
			//below demo's both ways to use translate, one that includes anonymous function
			d3.select('.x.axis').attr("transform", function() {  return "translate(0," + (h) + ")"  } ).call(xAxis);
			d3.select('.y.axis').attr("transform", "translate(" + margin.left + ",0)")//.call(yAxis)
			svg.select(".y.axis").transition().duration(1500).call(yAxis).ease("sin-in-out");
			//Transitions filtered lines after filter used and when cleared
			paths.style("stroke", function(d,i) {  return d.color})
			.transition().duration(1500).attr("d", function(d) { return line(d.years)} )
			.style("stroke-width", 2)
				//.select("title").text(function(d) {return d.location})
	}//REDRAW()

