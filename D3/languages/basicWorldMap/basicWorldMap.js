let width = d3.select('#map').node().clientWidth;
let height = d3.select('#map').node().clientHeight;

let svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)

projection = d3.geoEquirectangular()
    .scale(100)
    //.scale(width / 2 / Math.PI)
     .center([0, 0])
    //.translate([width / 2, height / 2])

path = d3.geoPath()
    .projection(projection)

d3.json('worldmap_geojson.json',function(err,world) {
     svg.attr("id", "countries").selectAll("path").data(world.features )
    .enter().append("path").attr("d", path )  
})
