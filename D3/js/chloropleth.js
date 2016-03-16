			var brew;

			init() 

			function init() {
			var target = "#chloropleth"
			//w = canvasSize(target)[0];

			var color = d3.scale.category20();
			brew = d3.scale.ordinal()

			w = 300;
			h = 300;
		
			//Define map projection
			var projection = d3.geo.mercator()
			   .center([ 0, 40 ])
			   .translate([ w/2, h/2 ])
			   .scale([ w/6]);

			// //Define path generator
			var path = d3.geo.path()
							 .projection(projection);

			// //Create SVG
			var svg = d3.select("#chloropleth")
						.append("svg")
						.attr("width", w)
						.attr("height", 300)
						.attr("viewBox", "0 0 " + w + " " + h)

			// //Load in GeoJSON data
			d3.json("../D3/data/countries/mapshaper_output.json", function(json) {
				brew.domain([json.features.length])
				//Bind data and create one path per GeoJSON feature
				svg.append('g').selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("class","country legends")
				   .attr("fill", function(d,i) { return color(i)})	
				   .on("mouseover", function(d,i) { return console.log("yes") } )
				   .attr("d", path)
				   
				  
			});
			}

			function  changeColors(color) {
				switch(color) {
					case "ylGn":  {
						brew.range(colorbrewer.YlGn[3])
					 	redraw(brew)
					  break;
					 }
			   	case "RdBu":  {
						brew.range(colorbrewer.RdBu[3])
					  redraw(brew)
				  	break;
			   	}
			    case "PuBuGn":  {
						brew.range(colorbrewer.PuBuGn[3])
					  redraw(brew)
				  	break;
			   	}
				}
			}//render()

				function redraw(colors) {	
					d3.selectAll("path.legends").transition().duration(500). attr("fill", function(d,i) { return colors(i)})
				}
		// var o = d3.scale.ordinal()
		//     .domain(["foo", "bar", "baz"])
		//     .range(colorbrewer.RdBu[9]);
				function canvasSize(target) { 
					//var height = parseFloat(d3.select(target).node().clientHeight)
					var width = parseFloat(d3.select(target).node().clientWidth)
					return [width]
				}//canvasSize

