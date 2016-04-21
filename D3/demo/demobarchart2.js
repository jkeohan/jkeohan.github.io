var margin = {top: 20, right: 20, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10,'s');

var svg = d3.select("#barchart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3_queue.queue()
  .defer(d3.json, 'demo/states.json')
  .await(function(error,states) { 
    draw(states.sort(function(a,b) { return b.value - a.value}))
    console.log(d3.median(states,function(d) { return d.value }))
    
  })

//d3.json('demo/states.json', type, function(error, data) {})

function draw(data) { 
  data = data.filter(function(d) {  return d.value < 350000})
  //console.log(data)
  x.domain(data.map(function(d) { return d.state; }));
  y.domain([0, d3.max(data, function(d) { return +d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.state); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(+d.value); })
      .attr("height", function(d) { return height - y(+d.value); })
      .on("mouseover",function(d) { console.log(d.value) })
};

function type(d) {
  //console.log(d)
  d.value = +d.value;
  return d;
}






