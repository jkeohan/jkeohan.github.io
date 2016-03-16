


			

			//Logic
			//map gets drawn on first render
			//then transitions into diff projection
			//-tranistion will occur on path being updated to new projection and then applying them to all paths


			//what functions are needed?
			//init(), render()

			//init should include:
			//svg, colors, canvasSize, d3.json, .data().enter().append(path)

			//render() should include:
			//projection
			//all path elements and attr(d,path)
			
			//what has to be defined first?
			//svg, colors, canvas

			//

			init()

		function init() {

				var target = "#section1map"
				w1 = canvasSize(target)[0];

			//w = 400;
				h1 = 300;

				//Define map projection

				//Create SVG
				var svg = d3.select(target)
							.append("svg")
							.attr("width", w1)
							.attr("height", 300);
				
				// var projection = d3.geo.mercator()	
				//    .center([ 0, 0 ])
				//    .translate([ w/2, h/1.5232 ])
				//    .scale([ w/8 ]);

					var projection = d3.geo.mercator()	
					   .center([ 0, 0 ])
					   .translate([ w1/2, h1/1.5232 ])
					   .scale([ w1/5 ]);

			//Define path generator
			var path = d3.geo.path()
							 .projection(projection);
	

			//Load in GeoJSON data
			d3.json("../D3/data/countries/mapshaper_output.json", function(json) {
	
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path").attr("class","country section1map")
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
					    //.rotate([-20, 0])
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

			// //Load in GeoJSON data

		
