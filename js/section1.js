( function () {

function init() {

}
var m = {top:50,bottom:60,left:70,right:150};
var width = 650 - m.left - m.right;
var height = 500 - m.top - m.bottom;
var currentYear = "2002";
var tooltip;
var grouped = true;
var alldata; 
var yearMean;

var svg = d3.select(".regionalstats").append('svg')
	.attr("width",width + m.left + m.right)
	.attr("height", height + m.top + m.bottom)
	.append('g').translate([m.left,m.top])//testing jetpack
	//.append('g').attr("transform","translate(" + m.left + "," + m.top + ")")//.attr("transform","translate(50,50)")

//Create scales
var yScale = d3.scale.linear().range([height,0]);
var xScale = d3.scale.linear().range([0,width]);
var radiusScale = d3.scale.sqrt().range([6,20])//scale.sqrt() used in place of .scale.linear()
var colorScale = d3.scale.category10()

//Create axises
var yAxis = d3.svg.axis().scale(yScale).orient("left")
	.innerTickSize(-width)
	.tickFormat(function(d) { return d + "%" } );
var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
	.innerTickSize(-height)
	.tickFormat(function(d) { return d + "%" } );

	svg.append("g").attr("class","y Axis")//.attr("transform","translate(40,0)")
	.append("text")//.style("text-anchor","start")
  		.attr({ class: "ylabel", y: -60, x: -290, dy: ".71em" })
  		.attr("transform", "rotate(-90)")	
  		.text("2012 Renewable Energy Output").style("font-size",20)

	svg.append('g').attr("class","x Axis").attr("transform","translate(0," + height + ")")
	.append("text").style("text-anchor", "middle")
  		.attr({  class: "xlabel", x: width/2 , y: 50})
  		.text("2002 Renewable Energy Output").style("font-size",20)
//API call for csv data and all formatting of data
d3.csv("data/data_regions.csv", function(data) {
	 alldata = data;
	//d3.nest to rollup Region and mean of years
	var regions = d3.set(data.map(ƒ('Region')))//testing jetpack
		.values().filter(function(d) { return !(d == "World")}).sort(d3.acscending) 
	colorScale.domain(regions)

	// 	var regions = d3.set(data.map(function(d) { return d.Region } ) )
	// 	.values().filter(function(d) { return !(d == "World")}).sort(d3.acscending) 
	// colorScale.domain(regions)

	var rlegend = d3.models.legend().fontSize(15).width(width).height(height).inputScale(colorScale)
	svg.call(rlegend)

	yearMean = d3.nest().key(function(d) { return d["Region"] } ).sortKeys(d3.ascending)
	  	.rollup(function(v) { 
	  		//console.log(v)// [Object, Object]  each obj is a row of data
	  		return { mean: mean(v), countries: v.map(function(c) { return c.Location} ) } 
	 			} )
			.entries(data)

	function mean(val) { 
		var obj = {};
		var keys = d3.keys(data[0]).filter(function(key) { return !(key == "Location" || key == "Region") })
		keys.forEach(function(year) {
			var y = d3.mean(val, function(m) { return +m[year] 
			} )
			obj[year] = d3.format(".2f")(y) 
		})
		return obj
	}

	colorize(yearMean)

	function colorize (yearMean) {
		yearMean.forEach( function(d,i) {
			d.color = colorScale(d.key);
		})
	}

	var yearMeanNoWorld = yearMean.filter(function(d) { return !(d.key == "World") })

	//Converted yearMean object to format consistent with csv import.  
formatYear = (function () {
		var array = []
		yearMean.forEach(function(d) {
			var obj = {};
			obj["Region"] = d.key
			obj["countries"] = d.values.countries
			//d3.entries will create new array with key\value property names
			d3.entries(d.values.mean).forEach(function(item) {
				obj[item.key] = item.value
			})
			obj["color"] = d.color
			array.push(obj)
		})
		return array
	}
	)()

	//Add radio buttons
	var radio_buttons = d3.selectAll('.radio_buttons')
		.on("click", function() {
			var value = this.value
			if(value == "Regions") { regionChart(data,yearMean,currentYear,formatYear) } 
			else { countryChart(data,currentYear,yearMean,formatYear) }
		}	)
	//Call the chart
	regionChart(data,yearMean,currentYear,formatYear)
})//end csv

function countryChart(data,year,yearMean,formatYear) { 
	console.log(data,year,yearMean,formatYear)
	grouped = false;
	var yearMean = formatYear
	var filterOutWorld = data.filter(function(d,i) { return !(d["Location"] == "World")} )
	var locations = (data.filter(function(d) { return !(d.Location == "World") } ) ).map(function(d)  { return d.Location } )
	var regions = d3.set(data.map(function(d) {  return d.Region } ) ).values().sort(d3.acscending) 

		// yScale.domain([0,d3.max(yearMean, function(d) { return +d["2012"] + 7 } ) ] )//.range([height,0])
		// xScale.domain([0,d3.max(yearMean, function(d) { return +d[year] + 4  } ) ] )//.range([0,width])
	//radiusScale.domain(d3.extent(yearMean, function(d) {  return +d.values.countries.length } ) )

	var circles = svg.selectAll("circle").data(filterOutWorld)

	circles.enter().append("circle")
		.attr("cy", function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) { 
				val = +obj["2012"]
				}})
				return yScale(val)
		})
		.attr("cx", function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) {
				val = +obj[year]
				}})
				return xScale(val)
		})
			.attr("r", function(d) { d.radius = 5; return 5 })
		.attr("class",function(d) { return d.Location + " " + "Country" })
		.style("fill",function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) { 
				val = obj.color
				d.color = val
				}})
				return val
		})
		.style("opacity",.8)
		.on("mouseover", mouseOver)
		.on("mouseout", mouseOut)
		.append('title')

	circles.attr("cy", function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) { 
				val = +obj["2012"]
				}})
				return yScale(val)
		})
		.attr("cx", function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) {
				val = +obj[year]
				}})
				return xScale(val)
		})
		.attr("r", function(d) { d.radius = 5; return 5 })
		.attr("class",function(d) { return d.Location + " " + "Country" })
		.style("fill",function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) { 
						val = obj.color
				d.color = val
				}})
				return val
		})
		.style("opacity",.8)
		.on("mouseover", mouseOver)
		.on("mouseout", mouseOut)
		.append('title')

	yScale.domain([0,d3.max(data, function(d) { return +d["2012"] + 7 } ) ] )//.range([height,0])
	xScale.domain([0,d3.max(data, function(d) { return +d[year] + 4  } ) ] )//.range([0,width])
	
	circles.transition().duration(2000)
		.attr("cy", function(d,i) { return yScale(+d["2012"]) })
		.attr("cx", function(d,i) { return xScale(+d[year]) })
		.attr("r",5)
			.attr("stroke-width",0)
			.attr("stroke", "rgba(230,230,230, .8)")

	d3.selectAll(".Region").transition().duration(2000).attr("r",0).remove()

	//Update Axises
	svg.select(".x.Axis").transition().duration(2000).call(xAxis);
	svg.select(".y.Axis").transition().duration(2000).call(yAxis);
}

function regionChart(data,yearMean,year,formatYear) {
	grouped = true
	var yearMean = formatYear.filter(function(d) { return !(d.Region == "World") })
	//yearMean =  yearMean.filter(function(d) { return (d.Region == "Latin America" ) })
	var filterOutWorld = data.filter(function(d,i) { return !(d["Location"] == "World")} )
	var locations = (data.filter(function(d) { return !(d.Location == "World") } ) ).map(function(d)  { return d.Location } )
	var regions = d3.set(data.map(function(d) {  return d.Region } ) ).values().sort(d3.acscending) 
		
		yScale.domain([0,d3.max(yearMean, function(d) { return +d["2012"] + 7 } ) ] )//.range([height,0])
		xScale.domain([0,d3.max(yearMean, function(d) { return +d[year] + 4  } ) ] )//.range([0,width])
		radiusScale.domain(d3.extent(yearMean, function(d) {  return +d.countries.length } ) )

		var circles = svg.selectAll("circle").data(yearMean)

		circles.enter().append("circle")
			.attr("class",function(d) { return d.Region})
			.attr("r",0)

		circles
			.attr("radius",5)
			.attr("class",function(d) { return d.Region + " " + "Region"})
			.style("fill",function(d,i) { return d.color })
			.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.append('title')

		circles.transition().duration(3000).style("opacity",.8)
			.attr("r", function(d) { d.radius = radiusScale(+d.countries.length)
				return radiusScale(+d.countries.length)})
				.attr("cy", function(d,i) { return yScale(+d["2012"]) })
			.attr("cx", function(d,i) { return xScale(+d[year]) })
				.attr("stroke-width",0)
			.attr("stroke", "rgba(230,230,230, .8)")

		d3.selectAll(".Country").transition().duration(3000)
				.attr("cy", function(d) { 
					var val;
					yearMean.forEach(function(obj) { if(d.Region == obj.Region) { 
					val = +obj["2012"]
				}})
				return yScale(val)
		})
		.attr("cx", function(d) { 
				var val;
				yearMean.forEach(function(obj) { if(d.Region == obj.Region) {
				val = +obj[year]
			}})
				return xScale(val)
		}).style("opacity",0).remove()
		
		svg.select(".x.Axis").transition().duration(2000).call(xAxis);
		svg.select(".y.Axis").transition().duration(2000).call(yAxis);
}

  var lastCircle;
  var lastRadi;
	function mouseOver(d) {
		//d3.select(this).call(resetCircle)
		if(!lastCircle) {
	    	lastCircle = d3.select(this);
	    	lastRadi = d3.select(this).attr("r") 
	    	console.log("If",lastRadi)
	    }
	    else {
	    	if(d3.select(this).datum() != lastCircle.datum()) {	
		    	console.log("Else",lastRadi)
		    	lastCircle.transition().duration(50)
		    	.attr("r",lastRadi )
		    	.attr("stroke-width",0)
					.attr("stroke", "rgba(230,230,230, .8)") 
					lastCircle = d3.select(this);
		    	lastRadi = d3.select(this).attr("r")
		    }
			}
    //call tooltip transition
		var c = d3.select(this)
		var cx = +c.attr("cx")
	 	var cy = +c.attr("cy")
		c.call(displayToolTip,d,cx,cy)

		//var radiusOver = c.node().r.animVal.value;
		
			c.transition().duration(250)
			.attr("stroke-width",20)
			.attr("stroke", "rgba(230,230,230, .8)")
			.attr("r", d.radius + 10)

		var line1 = svg.append("line").datum(d)
		line1.call(createLine1)

		var line2 = svg.append("line").datum(d)
		line2.call(createLine2)
	}

	function resetCircle(d){
		console.log("resetCircle-this",this)
		console.log("resetCircle-d",d)
		if(d3.select(d) != lastCircle) { 
    	lastCircle = d3.select(this)[0][0];
    	lastRadi = lastCircle.attr("r") 
    	console.log("If",lastRadi)
    }
    else { 
    	console.log("Else",lastRadi)
    	lastCircle.transition().duration(50)
    	.attr("r",lastRadi )
    	.attr("stroke-width",0)
			.attr("stroke", "rgba(230,230,230, .8)") 
			lastCircle = d3.select(this)[0][0];
    	lastRadi = lastCircle.attr("r")
		}
	}

	function mouseOut(d) {

		var transitionTime = 1000
	
		var c = d3.select(this)
		c.transition().duration(transitionTime)
			.attr("stroke-width",0)
			.attr("stroke", "rgba(230,230,230, .8)")
			.attr("r",d.radius )

		d3.selectAll(".line1").transition().duration(transitionTime).style("opacity",0).remove()
		d3.selectAll(".line2").transition().duration(transitionTime).style("opacity",0).remove()

		tooltip.transition().duration(transitionTime).style('opacity',0).remove()
	}//mouseOut

	function createLine1() {
				d3.selectAll(".line1").remove()
				this
				.attr("x1", xScale(+this.datum()[currentYear]) )
				.attr("y1", yScale(+this.datum()["2012"]) )
				.attr("x2", xScale(+this.datum()[currentYear]) )
				.attr("y2", yScale(+this.datum()["2012"]) )
				.attr("stroke-width", 1)
				.attr("stroke", this.datum()["color"] ) //d3.select(this).style("fill")  )
				.style("opacity",.4)
				.attr("class","line1")
				.transition().duration(500)
				.attr("x2",xScale(0) )
				.attr("y2", yScale(+this.datum()["2012"] )  )
			
	}

	function createLine2(){
		d3.selectAll(".line2").remove()
			this
				.attr("x1", xScale(+this.datum()[currentYear])  )
				.attr("y1", yScale(+this.datum()["2012"]))
				.attr("x2", xScale(+this.datum()[currentYear]) )
				.attr("y2", yScale(+this.datum()["2012"]))
				.attr("stroke-width", 1)
				.attr("stroke", this.datum()["color"]  )
				.style("opacity",.4)
				.attr("class","line2")
				.transition().duration(500)
				.attr("x2", xScale(+this.datum()[currentYear])  )
				.attr("y2", yScale(0))
				//.attr("r",radiusOver + 10)
	}
	function displayToolTip(selection,d,cx,cy) {

			var item = this.datum()
			//console.log(item)

			d3.selectAll(".d3tooltip").remove()
			tooltip = d3.select(".regionalstats").append("div").attr("class","d3tooltip")
			tooltip.style("font-size", 10)
			tooltip.style("border" , "3px solid " + d.color )
				.transition().duration(250).style("opacity",1)

			if(grouped) {

				tooltip.html(
				'<span class="regionName">' + d.Region + '</span><br/>' + 
				'<hr  class="d3tooltiphr" style="border: 1px solid ' +  d.color + ' " ' +  '>' +
				'<span class="key">2012:</span> <span class="value">' + +d["2012"] + '%</span><br/>' + 
				'<span class="key">2002:</span> <span class="value">' + +d["2002"] + '%</span><br/>'  + 
				'<hr class="d3tooltiphr" style="border: 1px solid ' +  d.color + ' " ' +  '>' +
				'<span class="key">Countries:</span>  <span class="value"><a href="javascript:void(0)">' + d.countries.length + '</a></span>')
					.style("left", function() {
				 if ((cx + 100) > width ) { return (cx -30) + "px" } 
					else { return (cx + 100) + "px" } 
				} )
				.style("top", (cy) + "px")

				d3.selectAll("a").on("click", function() { 
          lastCircle = null;
					var countries = alldata.filter(function(c,i) { 
					console.log()
						return d.Region == c.Region })
					console.log(countries)
					countryChart(countries,currentYear,yearMean,formatYear)

					d3.selectAll(".radio_buttons").property("checked", function(d, i) {return "Countries"});

			 })
			}

			else {
					tooltip.html(
				'<span class="regionName">' + d.Location + '</span><br/>' + 
				'<hr  class="d3tooltiphr" style="border: 1px solid ' +  d.color + ' " ' +  '>' +
				'<span class="key">2002:</span> <span class="value">' + +d["2002"] + '%</span><br/>'  + 
				'<span class="key">2012:</span> <span class="value">' + +d["2012"] + '%</span><br/>')
				//'<hr class="d3tooltiphr" style="border: 1px solid ' +  color + ' " ' +  '>')
					.style("left", function() {
				 if ((cx + 100) > width ) { return (cx -30) + "px" } 
					else { return (cx + 100) + "px" } 
				} )
				.style("top", (cy) + "px")
			}

			return tooltip
	}
})()
//1. xAxis width for Region is 441px but for Country is 399px
//RESOLUTION: 
//2. After adding panel and id=expandwidth, id=reducewidth to section2 the hr divider 
//wasn't applying the 40px margin-top and was placed directly under section1 col-md-8
//RESOLUTION; This has something to do with Margin refers to another's element position not including its margins. You cannot sum margins.
//as per http://stackoverflow.com/questions/14891152/css-margin-overlap-instead-of-giving-distance
//Decided to add a 40px margin to section 1 col-md-8 
