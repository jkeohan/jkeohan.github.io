
(function() {

  var margin = {top: 20, right: 20, bottom: 80, left: 80},
    w = 960 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

var w = 1024;
var h = 200;

var svg = d3.select("#barchart1").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append('g').attr("transfrom","translate(10,10)")

var xScale = d3.scale.ordinal().rangeRoundBands([0,w],.1)
var yScale = d3.scale.linear().range([h,0])

var xAxis = d3.svg.axis().scale(xScale).orient('bottom')
var yAxis = d3.svg.axis().scale(yScale).orient("left")

d3_queue.queue()
  .defer(d3.json, 'demo/states.json')
  .await(function(error,states) { 
    draw(error,states)
  })



function draw(error,data) {
  console.log(data)

  xScale.domain(data.map(function(d) { return d.state }))
  yScale.domain(d3.extent(data.map(function(d) { return d.value})))

  svg.append('g').call(yAxis).attr("class","y axis")


  svg.append("g").call(xAxis).attr("class", "x axis")
      .attr("transform", "translate(0," + (h) + ")")
        .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");
      
  var rects = svg.selectAll("rects").data(data)
  rects.enter().append("rect")
    .attr("class","bar")
    .attr("x",function(d,i) { return xScale(d.state) })
    .attr("y",function(d) { return yScale(+d.value) })
    .attr("width", 10 )
    .attr("height",function(d) { return h - yScale(+d.value) } )
}

//ISSUE: d3.min.js:1 Error: Invalid negative value for <rect> attribute height="-300"
//RESOLUTION: 
})()
