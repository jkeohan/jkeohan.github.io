

			//Width and height
(function() { 
			var target = "#section1map"
			w = canvasSize(target)[0];
			h = 300;

			//Define map projection
			var projection = d3.geo.mercator()	
			   .center([ 0, 0 ])
			   .translate([ w/2, h/1.5232 ])
			   .scale([ w/8 ]);

			//Define path generator
			var path = d3.geo.path()
							 .projection(projection);

			//Create SVG
			var svg = d3.select(target)
						.append("svg")
						.attr("width", w)
						.attr("height", 300);

			//Load in GeoJSON data
			d3.json("../data/countries/mapshaper_output.json", function(json) {
	
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path);	
			});


				function canvasSize(target) { 
					//var height = parseFloat(d3.select(target).node().clientHeight)
					var width = parseFloat(d3.select(target).node().clientWidth)
					return [width]
					//return [width,height]
				}//canvasSize
		
})()
