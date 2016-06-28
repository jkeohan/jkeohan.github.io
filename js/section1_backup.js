var m = {top:50,bottom:60,left:70,right:150};
var width = 650 - m.left - m.right;
var height = 400 - m.top - m.bottom;
var currentYear = "2002";
var tooltip;

var svg = d3.select(".regionalstats").append('svg')
	.attr("width",width + m.left + m.right)
	.attr("height", height + m.top + m.bottom)
	.append('g').attr("transform","translate(" + m.left + "," + m.top + ")")//.attr("transform","translate(50,50)")

//Create scales
var yScale = d3.scale.linear().range([height,0]);
var xScale = d3.scale.linear().range([0,width+2]);
var radiusScale = d3.scale.sqrt().range([6,20])
//var radiusScale = d3.scale.linear().range([6,20])
var colorScale = d3.scale.category10()

//Create axises
var yAxis = d3.svg.axis();
var xAxis = d3.svg.axis();

// var choices = d3.select(".switch").append("form").selectAll("input").data(["Regions","Countries"]).enter()
//   .append("label").text( function(d) { return d})
//   .append("input").attr("type","radio").attr("name","choice").attr("value",function(d) { return d})
//   .attr("class", "radio_buttons")
//   .attr("checked", function(d) { if (d==="Region") { return true }} )

d3.csv("data/data_regions.csv", render)

function type(d) {
	//d.2002 = +d.2002
	//return d
}

function render(data) {

	var filterOutWorld = data.filter(function(d,i) { return d["Location"] } ) //!(d["Location"] === "World")})
	//var regionData = d3.nest().key(function (d) { return d["Region"]}).rollup( function(d) { return mean(d)}).entires(filterOutWorld)
	var keys = d3.keys(data[0]).filter(function(key) { return !(key == "Location" || key == "Region") })
	var locations = (data.filter(function(d) { return !(d.Location == "World") } ) ).map(function(d)  { return d.Location } )
	var regions = d3.set(data.map(function(d) {  return d.Region } ) ).values().sort(d3.acscending) 
	//data.sort(function(a, b){ return d3.descending(a[2], b[2]); })

	var yearMean = d3.nest().key(function(d) { return d["Region"] } ).sortKeys(d3.ascending)
	  	.rollup(function(v) { 
	  		//console.log(v)// [Object, Object]  each obj is a row of data
	  		return { mean: mean(v), countries: v.map(function(c) { return c.Location} ) } 
	 			} )
			.entries(filterOutWorld)

	var yearM = d3.nest().key(function(d) { return d["Region"] } )
	  	.rollup(function(d) { 
	  		return  { mean: mean(d), countries: d.map(function(c)  { return c.Location } ) } 
	  		} )
			.map(filterOutWorld)

	function mean(val) { 
		var obj = {};
		keys.forEach(function(year) {
			var y = d3.mean(val, function(m) { return +m[year] 
			} )
			//console.log(y)
			obj[year] = d3.format(".2f")(y) 
		})
		return obj
	}

	update(currentYear)

	function update(year) {
		//
		yScale.domain([0,d3.max(yearMean, function(d) { return +d.values.mean["2012"] + 7 } ) ] )//.range([height,0])
		xScale.domain([0,d3.max(yearMean, function(d) { return +d.values.mean[year] + 4  } ) ] )//.range([0,width])
		radiusScale.domain(d3.extent(yearMean, function(d) {  return +d.values.countries.length } ) )
		//radiusScale.domain([0,d3.max(yearMean, function(d) {  return +d.values.countries.length } ) ] )

		var circles = svg.selectAll("circle").data(yearMean)
		//circles.forEach(function(d) { console.log(d )})
		circles.enter().append("circle")
			.attr("cy", function(d,i) { return yScale(+d.values.mean["2012"]) })
			.attr("cx", function(d,i) { return xScale(+d.values.mean[year]) })
			.attr("r", function(d) { 
				d.radius = radiusScale(+d.values.countries.length)
				return radiusScale(+d.values.countries.length)})
			.attr("class",function(d) { return d.key})
			//.style("fill",function(d,i) { d.color = color(d.values.mean["2012"]); return d.color})
			.style("fill",function(d,i) { d.color = colorScale(i); return d.color})
			.style("opacity",.8)
			.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.append('title')
			//.text(function(d) { return d.key + " " + d.values.countries})
		//.ticks(5)...next change in displayed values is at ticks(9) then 13 ticks displayed
		yAxis.scale(yScale).orient("left")
		.innerTickSize(-width)
    //.outerTickSize(0)//An outer tick size of 0 suppresses the square ends of the domain path, instead producing a straight line.
    //.tickPadding(10)
		//.tickSize(-(height + 160))
		.tickFormat(function(d) { return d + "%" } )//.ticks(5)


		xAxis.scale(xScale).orient("bottom")
		.innerTickSize(-height)
    //.outerTickSize(0)
    //.tickPadding(10)
		//.tickSize(-(width -130))
		.tickFormat(function(d) { return d + "%" } )//.ticks(5)


		//xAxis.tickValues(d3.range(1,26))

		svg.append("g").attr("class","y Axis").call(yAxis)//.attr("transform","translate(40,0)")
			.append("text")//.style("text-anchor","middle")
      		.attr({ class: "ylabel", y: -60, x: -290, dy: ".71em" })
      		.attr("transform", "rotate(-90)")	
      		.text("2012 Renewable Energy Output").style("font-size",20)

		//svg.append("g").attr("class","xAxis").call(xAxis).attr("transform,translate(0," + height + ")")
		svg.append('g').attr("class","x Axis").call(xAxis).attr("transform","translate(0," + height + ")")
			.append("text").style("text-anchor", "middle")
      		.attr({  class: "xlabel", x: width/2 , y: 50})
      		.text("2002 Renewable Energy Output").style("font-size",20)
      		//.attr("text-anchor","middle") 
	}

	////////D3 Vertical Legend//////////////////////////
        // var legend = svg.selectAll('legend')
        //     .data(yearMean)
        //     .enter().append('g')
        //     .attr("class", "legend")
        //     .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"})
        
        // legend.append('rect')
        //     .attr("x", width + 5)
        //     .attr("y", 5)
        //     .attr("width", 10)
        //     .attr("height", 10)
        //     .style("fill", function (d, i) { return d.color ;
        //    // return color(i)
        // })
        
        // legend.append('text')
        //     .attr("x", width + 25)
        //     .attr("y", 15)
        // //.attr("dy", ".35em")
        // 		.text(function (d, i) { return d.key })
        //     .attr("class", "textselected")
        //     .style("text-anchor", "start")
        //     .style("font-size", 15)
        //     .on("mouseover", function(d) {
        //     	d3.select(this).transition().duration(1000).style("font-weight","bold")
        //     		//var c = d3.selectAll("." + d.key.split(" ")[0]).transition().attr("r",30)
        //     			 //.transition().duration(500).attr("stroke-width",20)
        //     		mouseOver(d)
        //     })
        //       .on("mouseout", function(d) {
        //     	d3.select(this).transition().duration(1000).style("font-weight","normal")
        //     		//var c = d3.selectAll("." + d.key.split(" ")[0]).transition().attr("r",30)
        //     			 //.transition().duration(500).attr("stroke-width",20)
        //     		mouseOut(d)
        //     })
	////////D3 Vertical Legend//////////////////////////


////////D3 Vertical Legend Reusable//////////////////////////
var rlegend = d3.models.legend().fontSize(15)
	.on("mouseOver", function(d) { d3.select(this).transition().duration(1000).style("font-weight","bold") ;
		 mouseOver(d); 
		 //console.log(d)
		}) 
	.on("mouseOut", function(d) { d3.select(this).transition().duration(1000).style("font-weight","normal") ;
     mouseOut(d); } )
//d3.select("svg").datum(yearMean).call(rlegend)
svg.datum(yearMean).call(rlegend)
////////D3 Vertical Legend Reusable//////////////////////////
function mouseOver(d) {
	//console.log(d)
 //console.log(d)
 //console.log(d3.select(this)) //d3.select(this) returns [window] when executed vie rlengend.on
 	var cColor = d.color
 	// var cColor = d3.select(this).style("fill")
 	// var circleObj = d3.selectAll("circle").filter(function(obj)  { return obj.key == d.key} )
 	// //console.log(circleObj)
 	// var cx = +circleObj.attr("cx")
 	// var cy = +circleObj.attr("cy")

	//circleObj.call(displayToolTip,d,cColor,cx,cy)
		//d3.select(this).call(displayToolTip,d,cColor)
	//d returned using circle.on is Object: {key: "", values: Object}
	var c = d3.select("." + d.key.split(" ")[0])//.transition().attr("r",30)
	var cx = +c.attr("cx")
 	var cy = +c.attr("cy")
	c.call(displayToolTip,d,cColor,cx,cy)
	//var cColor = d3.select(this).style("fill")
	//console.log(c)
	
	var radiusOver = c.node().r.animVal.value;
		c.transition().duration(250)
		.attr("stroke-width",20)
		.attr("stroke", "rgba(230,230,230, .8)")
		.attr("r", d.radius + 10)

	var line1 = svg.append("line").datum(d)

		line1
			.attr("x1",xScale(0) )
			.attr("y1", function(d) { return yScale(+d.values.mean["2012"] ) } )
			.attr("x2", function(d) { return xScale(+d.values.mean[currentYear]) })
			.attr("y2", function(d) { return yScale(+d.values.mean["2012"])})
			.attr("stroke-width", 1)
			.attr("stroke", d.color ) //d3.select(this).style("fill")  )
			.style("opacity",1)
			.attr("class","line1")

	var line2 = svg.append("line").datum(d)

		line2
			.attr("x1", function(d) { return xScale(+d.values.mean[currentYear]) } )
			.attr("y1", height )
			.attr("x2", function(d) { return xScale(+d.values.mean[currentYear]) })
			.attr("y2", function(d) { return yScale(+d.values.mean["2012"])})
			.attr("stroke-width", 1)
			.attr("stroke", d.color  )
			.style("opacity",1)
			.attr("class","line2")
	
		.attr("r",radiusOver + 10)

	//var radiusOver = c.attr("r")
	//c.transition().duration(500).attr("r", radiusOver + 10)
	// console.log(d3.selectAll("." + "d.key"))

	// var radiusOver = d3.select(this).node().r.animVal.value
	// //console.log(d)
	// //var radiusOver = d3.select(this).attr("r")/
	// d3.select(this).transition().duration(500)
	// .attr("stroke-width",20).attr("stroke", "rgba(230,230,230, .8)").attr("r",radiusOver + 10)
	
}

function mouseOut(d) {
	//console.log(d)
	var c = d3.select("." + d.key.split(" ")[0])//.transition().attr("r",30)

	c.transition().duration(250)
		.attr("stroke-width",0)
		.attr("stroke", "rgba(230,230,230, .8)")
		.attr("r",d.radius )

	d3.selectAll(".line1").transition().duration(250).style("opacity",0).remove()
	d3.selectAll(".line2").transition().duration(250).style("opacity",0).remove()

	tooltip.transition().duration(250).style('opacity',0).remove()



	// var radiusOut = d3.select(this).node().r.animVal.value
	// d3.select(this).transition().duration(800).attr("r",radiusOut - 10).attr("stroke-width",0)
}

function displayToolTip(selection,d,color,cx,cy) { 

		tooltip = d3.select(".regionalstats").append("div") 
						.attr("class","d3tooltip")
		//tooltip.style({opacity:0; "font-size", 10; border: "3px solid " + color})
		tooltip.style("font-size", 10)
		tooltip.style("border" , "3px solid " + color )
		.transition().duration(250).style("opacity",1)

		tooltip.html(
		'<span class="regionName">' + d.key + '</span><br/>' + 
		'<hr  class="d3tooltiphr" style="border: 1px solid ' +  color + ' " ' +  '>' +
		'<span class="key">2002:</span> <span class="value">' + +d.values.mean["2002"] + '%</span><br/>'  + 
		'<span class="key">2012:</span> <span class="value">' + +d.values.mean["2012"] + '%</span><br/>' + 
		'<hr class="d3tooltiphr" style="border: 1px solid ' +  color + ' " ' +  '>' +
		'<span class="key">Countries:</span>  <span class="value">' + d.values.countries.length + '</span>')
		// currentYear + ": " + '<span class="value">' + d[currentYear] + '%</span>')
		//using cx and cy causes the circles not to transition or lines to appear
		// .style("left", (cx + 100) + "px" )
			.style("left", function() {
		 if ((cx + 100) > width ) { return (cx -30) + "px" } 
			else { return (cx + 100) + "px" } 
		} )
		.style("top", (cy) + "px")
		// .style("left", (d3.event.pageX + 20) + "px")
		// .style("top", (d3.event.pageY -35 ) + "px")

		return tooltip

}

}//buildChart

//.on("mouseover",mouseOver) callback function sends "this" or d? 
// function mouseOver() {
// 	var radiusOver = d3.select(this).node().r.animVal.value
// 	//var radiusOver = d3.select(this).attr("r")/
// 	d3.select(this).transition().duration(500)
// 	.attr("stroke-width",20).attr("stroke", "rgba(230,230,230, .8)").attr("r",radiusOver + 10)
	
// }

// function mouseOut() {
// 	var radiusOut = d3.select(this).node().r.animVal.value
// 	d3.select(this).transition().duration(800).attr("r",radiusOut - 10).attr("stroke-width",0)

// }

  // //D3 Vertical Legend//////////////////////////
  //       var legend = svg.selectAll('legend')
  //           .data(keys)
  //           .enter().append('g')
  //           .attr("class", "legend")
  //           .attr("transform", function (d, i) {
  //           	//console.log(d)
  //               return "translate(0," + i * 20 + ")"
            
  //       })
        
  //       legend.append('rect')
  //           .attr("x", width - 20)
  //           .attr("y", 0)
  //           .attr("width", 10)
  //           .attr("height", 10)
  //           .style("fill", function (d, i) {
  //           return color(i)
  //       })
        
  //       legend.append('text')
  //           .attr("x", width - 26)
  //           .attr("y", 10)
  //       //.attr("dy", ".35em")
  //       .text(function (d, i) {
  //           return d
  //       })
  //           .attr("class", "textselected")
  //           .style("text-anchor", "start")
  //           .style("font-size", 15)

//1. top right circle is off the grid & xScale cut off..How to get it bacsk?
//m.right updated to 50
//m.right is now 150...why was it changed?..Think to include legend.

//2. yaxis grid lines end between 15-20%
//http://bl.ocks.org/hunzy/11110940
//first i added .tickSize(-(height + 160))
//then .ticksize replaced by .innerTicksSize(-height) and .outerTickSize(0)

//3. axis grid lines don't intersect to create full square
//requires manipulation of yScale domain...return +d.values["2012"] + 7 } ) ] )
//not a very practical approach for dynamic data as this is hard coded based on current data
//How to make this dynamic?

//4. circle transition not working
//var obj not working in mouseOut...used d3.select(this) in both functions

//5. Is it better to use yearMean or yearM?

//6. .on(mouseover) keeps increasing the size of the circle if moved after duration(1000) completed
//this id due to the mouseover event reexecuting after the transition completes.
//decided to assign the existing radius value to the object using d.radius = radiuaScale(d.values.countries.length)

//7.Transfering legend code to reusable.d3.charts didn't display anything
//...1. manually added a new div...d3.select(".legend").datam(yearMean).call(rlegend)...This placed all regions
//horizonally below the svg.
//...2. changed to be d3.select("svg").datum(yearMean).call(rlegend) and items created but offset up and to the left
//as though the transform\translate wasn't working
//...3. change to be svg.datum(yearMean).call(rlegend) and it worked...

//7. .on(mouseover) if mouse if moved off circle immediately then it might disappear
// var borderPath = svg.append("rect")
//   .attr("x", 0)
//   .attr("y", 0)
// 	.attr("width",width + m.left + m.right)
// 	.attr("height", height + m.top + m.bottom)
//   .style("stroke", "blue")
//   .style("fill", "none")
//   .style("stroke-width", 1);
// d3.edge = {};

//8. tooltip regionName not adhering to text-align:center.
//http://stackoverflow.com/questions/7756926/difference-between-span-and-div-with-text-aligncenter

//9.  tooltip changed it's postion after i added the circleObj.call(displayToolTip,d,cColor,cx,cy)
//passing in the cy\cx coords put the tooltip on top of the circles which is why they weren't tranistioning
//Tested this out by hardcoding cx and cy and the circles where these coors were didn't transition however
//the others circles did along with display the tooltip
//moving the tooltip off the circles resolved the issue

//Configuration on portfolio page
//10a.  tooltip wasn't looking correct after render on portfolio site.  
//RESOLUTION: Bootstrap also has a tooltip class.  renamed it .d3tooltip
//10b.  space above and below hr's was something like 10+px
//RESOLUTION: added new class to tooltip hr called d3tooltiphr and set css to 	margin:2px 0;. Also adjusted .regionname -margin 

//11. the conatiner main was extending past the main content div
//RESOLUTION: added width: 100% to main-content main 
//This was the opposite solution posted here...http://stackoverflow.com/questions/20342432/make-divs-stay-inside-parent-div-with-margins
//This overrides the media query 
// @media (min-width: 1200px)
// .container {
//   width: 1170px;


// d3.edge.legend = function module () {
// 	//console.log("inside module")
// 	function exports(_selection) {
// 		console.log(_selection)
// 		_selection.each(function(_data) { 
// 			var legend = _selection.selectAll("legend").data(_data).enter().append("g")
// 				.attr("class", "legend")
// 				.attr("transform","translate(0" + i * 20 + ")")

// 			 legend.append('rect')
//           .attr("x", width + 5)
//           .attr("y", 5)
//           .attr("width", 10)
//           .attr("height", 10)
//           .style("fill", function (d, i) { return d.color ;
//         })

//         legend.append('text')
// 		      .attr("x", width + 25)
// 		      .attr("y", 15)
//   		//.attr("dy", ".35em")
// 		  		.text(function (d, i) { return d.key })
// 		      .attr("class", "textselected")
// 		      .style("text-anchor", "start")
// 		      .style("font-size", 15)
// 		      .on("mouseover", function(d) { d3.select(this).transition().duration(1000).style("font-weight","bold");
//       			mouseOver(d)
//       		})
//         	.on("mouseout", function(d) { d3.select(this).transition().duration(1000).style("font-weight","normal");
//       			mouseOut(d)
//       		})
// 		})
// 	}
// 	return exports
// }
