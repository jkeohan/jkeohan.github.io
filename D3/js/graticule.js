var width = 300;
var height = 300

var svg = d3.select("#section1map").attr("width",width).attr("height",height)

//var lonlat = [-2, -13];
var projection = d3.geo.orthographic()
//var projection = d3.geo.albers()
//var projection = d3.geo.mercator()
  .scale(200)
  .rotate([9,0,0])
  //.center(lonlat)
  .translate([width/2, height/2])
  .clipAngle(90);

var path = d3.geo.path()
  .projection(projection);


var graticule = d3.geo.graticule()

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

