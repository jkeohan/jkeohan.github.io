
			init()



		function init() {

				var target = "#section1map"
				w1 = canvasSize(target)[0];

			//w = 400;
				h1 = 300;

				//Create SVG
				svg = d3.select(target)
							.append("svg")
							.attr("width", w1)
							.attr("height", 300);
				
					var projection = d3.geo.mercator()	
					   .center([ 0, 0 ])
					   .translate([ w1/2, h1/1.5232 ])
					   .scale([ w1/5 ]);

			//Define path generator
				path = d3.geo.path()
							 .projection(projection);

							 		//Define graticule
				var graticule = d3.geo.graticule()
				svg.append("path")
						    .datum(graticule)
						    .attr("class", "graticule")
						    .attr("d", path);
	

			//Load in GeoJSON data
			d3.json("../D3/data/countries/mapshaper_output.json", function(json) {
	
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path").attr("class","country land section1map")
				   .attr("d", path);	
			});
			}//init()			

			function  changeGeo(proj) {
				switch(proj) {
					case "mercator":  {
						console.log("mercator")
						var projection = d3.geo.mercator()	
					   .center([ 0, 0 ])
					   .translate([ w1/2, h1/1.5232 ])
					   .scale([ w1/5 ]);
					 	redraw(projection)
					  break;
					 }
			   	case "orthographic":  {
						var projection = d3.geo.orthographic()	
					   .center([ 0, 0 ])
   					.translate([ w1/2, h1/2 ])
   					.scale([ w1/3 ])
					  redraw(projection)
				  	break;
			   	}
			    case "stereographic":  {
			    	console.log("st")
			    	var projection = d3.geo.stereographic()	
							 .scale(50)
					    .translate([w1 / 2, h1 / 2])
					    .rotate([-20, 0])
					    .clipAngle(180 - 1e-4)
					    .clipExtent([[0, 0], [w1,h1]])
					    .precision(.1);

					  redraw(projection)
				  	break;
			   	}
				}

				function redraw(proj) {
					var path = d3.geo.path().projection(proj);
					d3.selectAll("path.section1map").transition().duration(1000).attr("d",path)
			}

			}//render()

			function canvasSize(target) { 
					//var height = parseFloat(d3.select(target).node().clientHeight)
					var width = parseFloat(d3.select(target).node().clientWidth)
					return [width]
				}//canvasSize


		
