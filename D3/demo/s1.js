
(function() { 
var margin = {top: 20, right: 20, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var s1Text = ["DATA","VISUALIZATION"]
var s1Line = [{"x":100,"y":50},{"x":100,"y":100}]

var svg = d3.select('.s1').append("svg")//.attr("width",width).attr("height",height)
console.log("yes")

svg.append("line")
.style("stroke", "black")
.style("stroke-width", 10)
.style("stroke-linecap", "butt") // stroke-linecap type
.attr("x1", 100)
.attr("y1", 50)
.attr("x2", 100)
.attr("y2", 200);
//.data(s1Line).style("fill","red")

console.log(s1Text)
//svg.selectAll("text").data(s1Text,function(d) { return d })
svg.selectAll("text").data(s1Text)
.enter().append("text")
.text(function(d) {return d})
 .attr("x",100)
// .attr("y",100)
.style("fill","white")
.style("opacity",0)
.transition().delay(function(d,i) { return i / s1Text.length * 750})
.attr("x",function(d,i) { return i * 10 + 40 })
.attr("y", 100)
.style("opacity",1)
.style("fill","red")

// svg.append("text")
// .style("fill", "black")
// .attr("x", 100)
// .attr("y", 50)
// .attr("text-anchor", "start") // set anchor y justification ; // define the text to display
// .text("Hello World - start")
})()
