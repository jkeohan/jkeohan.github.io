d3.models = {};

//var rlegend = d3.edge.legend().fontSize(15)
//svg.datum(yearMean).call(rlegend)

d3.models.legend = function () {

	var fontSize = 15;
	var width = 650;
	var height = 400;
	var legSpacing = 20;
	var translateX = 0;
	var translateY = 0;
	var translate = [0,0];
	var legendValues;

	var dispatch = d3.dispatch("mouseOver", "mouseOut");

	function render(selection) {
		console.log("selection",selection)
		selection.each(function(_data) { 
			console.log("_data",_data)
			var legend = selection.append('g').attr("transform", function (d, i) { return "translate(" + translate[0] + "," + translate[1] + ")"})
				.selectAll("legend").data(legendValues).enter().append("g")
				.attr("class", "legend")
				.attr("transform", function (d, i) { return "translate(0," + i *  legSpacing + ")"})
           	console.log(legend)
            legend.append('rect')
			 				.attr({ x:width+5, y:5, width: 10, height: 10 })
            	.style("fill", function (d, i) { 
            		console.log(d)
            		return d.color;})
        

        legend.append('text')
        	.attr({ x: width+25, y: 15})
		  		.text(function (d, i) { return d.text})
		      .attr("class", "textselected")
		      .style("text-anchor", "start")
		      .style("font-size", fontSize)
		      .on("mouseover",dispatch.mouseOver)
		      .on("mouseout", dispatch.mouseOut)
		})//_selection.each()
	}//render()

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
	render.translate = function(_x) {
		if (!arguments.length) return translate;
		translate = _x;
		return this;
	}
	// 	render.translateY = function(_x) {
	// 	if (!arguments.length) return translateY;
	// 	translateY = _x;
	// 	return this;
	// }
		render.legSpacing = function(_x) {
		if (!arguments.length) return legSpacing;
		legSpacing = _x;
		return this;
	}
	render.inputScale = function(_x) {
     if (!arguments.length) return inputScale;
        scale = _x;
        legendValues = [];
       	scale.domain().forEach(function (el) {
        var cellObject = {color: scale(el), text: el} 
        legendValues.push(cellObject)
    	})

		return this;
  }

	d3.rebind(render, dispatch, "on")
	return render
}
