
// var q = d3_queue.queue()
     
// q
//   .defer(d3.json, "demo/states.json")
//   .defer(d3.json, "demo/mb-states.json")
//   .await(function(error, file1, file2) { 
//       //console.log(file1, file2); 
//       drawMap(file1,file2)
//     });

// var m = {"top":10,"bottom":10,"left":10,"right":10},
//   w = 400 - m.left - m.right,
//   h = 400;

// var svg = d3.select("#wmap1").append('svg').attr("width",w).attr("height",h)

 
// var projection = d3.geo.albersUsa()
//   .scale(500)
//   .translate([w / 2, h / 2]);
 
// var path = d3.geo.path()
//   .projection(projection);

// function init() {
//   svg.append("g")
//       .attr("class", "counties")
//     .selectAll("path")
//       .data(topojson.feature(us, us.objects.counties).features)
//     .enter().append("path")
//       .attr("class", function(d) { return quantize(rateById.get(d.id)); })
//       .attr("d", path);

//   svg.append("path")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//       .attr("class", "states")
//       .attr("d", path);
// }

// function drawMap(data,states) {
//   console.log(states)
//   svg.selectAll('path').data(topojson.feature(states,states.objects.counties).features)
//     .enter().append("path").attr('d',path)//.attr("class","states")

//      svg.append("path")
//       .data(topojson.mesh(states,states.objects.counties, function(a, b) { return a !== b; }))
//       .attr("class", "states")
//       .attr("d", path);

// }

(function() {
var width = 400,
    height = 400;

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var projection = d3.geo.albersUsa()
    .scale(500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#wmap1").append("svg")
    .attr("width", width)
    .attr("height", height);

d3_queue.queue()
    .defer(d3.json, "demo/mb-states.json")
    .defer(d3.json, "demo/states.json")
    //, function(d) { 
    //   console.log(d)
    //   rateById.set(d.id, +d.rate); })
    .await(ready);

function ready(error, us, states) {

  states.map(function(d) { rateById.set(d.state,+d.value)})
  quantize.domain(d3.extent(states.map(function(d) { return d.value })))
  //if (error)  { throw error; }

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("class", function(d) { 
        console.log(quantize(rateById.get(d.value)))
        return quantize(rateById.get(d.value)); })
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}
})()

