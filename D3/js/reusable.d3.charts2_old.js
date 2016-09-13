d3.models = {};

d3.models.maps = function() {

	var fontSize = 15;
	var width = 650;
	var transX = 0;
	var transY = 0;
	var scale = 10;
	var dispatch = d3.dispatch("mouseOver", "mouseOut","onClick");

	function render(selection) {
		selection.each(function(data){
			
			var projection = d3.geo.mercator()
      .scale(scale)
      .translate( [transX, transY]);
      var path = d3.geo.path().projection(projection);

      var map = selection.selectAll("path")
      .data(geo_data.features)
      .enter()
      .append("path")
        .attr("d", path)
        .style("fill", "lightBlue")
        .style("stroke", "black")
        .style("stroke-width", 0.5);
		})
	}//render()

	render.geoData = function(_x) {
	if (!arguments.length) return geoData;
  geoData = _x;
	return this;
	}
	render.fontSize = function(_x) {
	if (!arguments.length) return fontSize;
	fontSize = _x;
	return this;
	}
	render.transX = function(_x) {
		if(!arguments.length) return transX
		transX = _x
		return this;
	}
	render.transY = function(_x) {
		if(!arguments.length) return transY
		transY = _x
		return this;
	}
	//https://github.com/mbostock/d3/wiki/Internals#rebind
	d3.rebind(render, dispatch, "on")
	return render
}
debugger;
// We add the legend module, which is a simple function returning a function. The outer
// function serves as the scoped closure for our module.
d3.models.legend = function () {
// Some variables are available in the closure and not accessible from the outside (pri- vate). 
// They have default values.
	var fontSize = 15;
	var width = 650;
	var height = 400;
	var transX = 0;
	var transY = 0;
	//var translate = [0,0];
	var legendValues;
	var position = "vertical";
// One way for the module to expose events to the outside world is by using  d3.dispatch to declare 
// an event that we can then listen to from the out- side when it’s triggered in the module.
//Both d3.dispath and d3.rebind are classified as d3 Internals and are utilities for implementing reusable components.
	var dispatch = d3.dispatch("mouseOver", "mouseOut","onClick");

	function render(selection) {
		//console.log(selection)
		selection.each(function(data) { 
			console.log(selection)
			if(position === "vertical") { 
	        //D3 Vertical Legend//////////////////////////
	        var legend = selection.append('g').attr("transform", function (d, i) { return "translate(" + transX + "," + transY  + ")" })//attr("transform",function(d,i) { return "translate(" + transX + ',' + transY ")"} )
	        .selectAll("legend").data(legendValues).enter().append("g")
							.attr("class", "legend")
	            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")" })
	            .on("mouseover",dispatch.mouseOver) //dispath name cannot be same as event
	        		.on("mouseout", dispatch.mouseOut)
	       		  .on("click", dispatch.onClick)
	        
			 legend.append('rect')
			 		.attr({ x:width+5, y:5, width: 10, height: 10 })
          .style("fill", function (d, i) { return d.color })

        legend.append('text')
        	.attr({ x: width+25, y: 15})
		  		.text(function (d, i) { return d.text})
		      .style("text-anchor", "start")
		      .style("font-size", fontSize)

			} else {   

				var legend = selection.selectAll("legend").data(legendValues).enter().append('div')
	        .attr("class", "legend")

	      legend
	        .html(function(d,i) {return d.text})
	        .style("color", function(d,i) {return d.color })
	        .style("display","inline-block")
	        .style("padding","0px 5px")
	        .style("margin",".2em")
	        .on("mouseover",dispatch.mouseOver)
	        .on("mouseout", dispatch.mouseOut)
	        .on("click", dispatch.onClick)
			  }//else
		})//_selection.each()
	}//render()
	//Functions are also objects so we can add addtional properties and\or methods
	// These “public” functions will be used as getters and setters at the same time. 
	// They are getters when no argument is passed to the function; otherwise they set 
	// the private variable to the new value passed as an argument. When setting, we return 
	// the current context this, as we want these methods to be chainable.
	render.fontSize = function(_x) {
		if (!arguments.length) return fontSize;
		fontSize = _x;
		return this;
	}
	render.width = function(_x) {
		if (!arguments.length) return width;
		width = _x;
		return this;
	}
	render.height = function(_x) {
		if (!arguments.length) return height;
		height = _x;
		return this;
	}
	// render.translate = function(_x) {
	// 	if (!arguments.length) return translate;
	// 	translate = _x;
	// 	return this;
	// }
	render.transX = function(_x) {
		if(!arguments.length) return transX
		transX = _x
		return this;
	}
	render.transY = function(_x) {
		if(!arguments.length) return transY
		transY = _x
		return this;
	}
	render.inputScale = function(_x) {
     if (!arguments.length) return inputScale;
        scale = _x;
        legendValues = [];
       	scale.domain().forEach(function (el) {
	        var cellObject = {color: scale(el), text: el} 
	        legendValues.push(cellObject)
	        //console.log(legendValues)
    	})
		return this;
  }
  render.position = function(_x) {
  	if(!arguments.length) return position;
  	position = _x;
  	return this;
  }
	//https://github.com/mbostock/d3/wiki/Internals#rebind
	d3.rebind(render, dispatch, "on")
	return render
}
//d3.rebind(target,source,names)
// Copies the methods with the specified names from source to target, and returns target. 
// Calling one of the named methods on the target object invokes the same-named method on the source object, 
// passing any arguments passed to the target method, and using the source object as the this context
