
init() 

function init() {
			var target = "#legends"
			w = canvasSize(target)[0];

			var colorScale = d3.scale.category20();
			//w = 300;
			h = 500;
		
			//Define map projection
			var projection = d3.geo.mercator()
	   		.center([ 0, 40 ])
	   		.translate([ w/2, h/2.7 ])
	   		.scale([ w/6]);

			// //Define path generator
			var path = d3.geo.path()
				.projection(projection);

			// //Create SVG
			var svg = d3.select("#legends").append("svg")
			svg
				.attr("width", w)
				.attr("height", h)
				.attr("viewBox", "0 0 " + w + " " + h)

			// //Load in GeoJSON data
			d3.json("../D3/data/countries/mapshaper_output.json", function(json) {

				var legendKeys = d3.nest().key(function(d) { return d["properties"]["continent"] } ).entries(json.features)
				var legendVals = legendKeys.map(function(d) { return d.key })

				var legendKeys2 = d3.set(json.features.map(function(d) { return d["properties"]["continent"] }) ).values()//.sort(d3.descending)			
				//console.log(legendKeys2)
				colorScale.domain(legendKeys2)

				var rlegend = d3.models.legend()
					.translate([0,300])
					.fontSize(15).width(0)
					.inputScale(colorScale)
				svg.call(rlegend)
  

			svg.append("g")
			  .attr("class", "legendOrdinal")
			  .attr("transform", "translate(200,300)");

			var legendOrdinal = d3.legend.color()
			  .shape("path", d3.svg.symbol().type("cross").size(150)())
			  .shapePadding(10)
			  .orient("horizonal")
			  .scale(colorScale);

			svg.select(".legendOrdinal")
			  .call(legendOrdinal);

<!--LEGEND 3-->
     var legend = d3.select(".rightleg").append("div").attr("class","wrapper")
        //.style({position: "absolute", top:"0", width: "100%"})
        .append("div").attr("class","row1")
        .style({ overflow: "hidden", "font-size": ".8em", "line-height": "1.5", "padding-left": "5px"})
      	.selectAll(".legend").data(colorScale.domain())
        
      legend.enter().append("div").attr("class","legend")
      //.style({float:"left" } ) //, width:"15%" })

      legend.html(function(d,i) { return d})
      .style("background-color", function(d){ return colorScale(d)})
      .style({ "text-align": "center", display:"inline-block", width: "50%",color: "white"})
      .style("border",function(d) { return "1px solid " + colorScale(d)})


				//Bind data and create one path per GeoJSON feature
				svg.append('g').selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("class","country")
				   .attr("fill", function(d,i) { return colorScale(d["properties"]["continent"])})	
				   .on("mouseover", function(d,i) { return console.log("yes") } )
				   .attr("d", path)
 
			});
}
				function canvasSize(target) { 
					//var height = parseFloat(d3.select(target).node().clientHeight)
					var width = parseFloat(d3.select(target).node().clientWidth)
					return [width]
				}//canvasSize



