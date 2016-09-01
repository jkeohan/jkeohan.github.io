(function() { 

  d3_queue.queue()
    .defer(d3.json,"data/countries/mapshaper_output.json")
    .defer(d3.csv,"data/countries/cities2.csv")
    .await(function(error,world,cities) { 
      drawMap(world)
      //drawTitle()
      //drawCities(cities)          
    })//await

var canvas = canvasSize('.section.s1')
//console.log(canvas)
var margins = { top:200,bottom:100,left:200,right:200}

//subtracting margns.left\right from width causes g elem to position 
//itself 100 pix down and right
width = canvas[0]// - margins.left - margins.right
height = 500;

var svg = d3.select('#worldMap').attr("width",width).attr("height",height)//style("background-color","#000000")
//ar g = svg.append('g')//.attr("transform","translate(0,0)")//.attr("width",400)
function drawTitle(){
  var data = "DATA VISUALIZATION AND STORYTELLING USING D3".split(" ")
  //var data = "DATA".split("")
  //console.log(data)
  var g = svg.append("g").attr("transform","translate(" + 100 + "," + 100 + ")")
  var text = g.selectAll("text").data(data)

  text.enter().append("text") .text(function(d) { return d })
       .style({
        "fill":"black",
        "font-size":"10px" ,
        "font-family":"fantasy",
        "font-weight":"800",
        "text-anchor":"middle",
        "opacity":"1"
      })
        .attr("x",function(d,i) { return i * 200 })
        .attr("y",0).transition().duration(4000).ease("ease")//.delay(function(d,i) { return i/data.length * 5000 } ) 
  //.style("fill","yellow")
  .style("opacity",1)
  .style("font-size","30px")
  //.transition().duration(2000).delay(500)
  .attr("y",0)

  //text.exit().remove()
} 
debugger;
function drawMap(countries) {

  //Define map projection
  projection = d3.geo.mercator()
  //.center([ -5, 10 ])
    //.scale(500)
   .scale([ width/8.5 ])
   .translate([ 500,300])
  // projection = d3.geo.mollweide()
  //   .precision(.1)
  //   .scale([ width/5 ])
  //   .translate([ 400,300])
  // projection = d3.geo.equirectangular()
    //.center([ -5, 10 ])
   //.translate([ width/2 + 500, height/1.74026575872 ])
    
    //.rotate([0,0])
    //.parallels([19.5, 75.5])

  //Define path generator
  var path = d3.geo.path()
     .projection(projection);

  svg.selectAll("path")
     .data(countries.features)
     .enter()
     .append("path")
     .attr("class",function(d,i) { if ( i % 2 === 0) { return "dark"} else { return "light" }})
     .style("fill",function(d,i) { 
   
     if( i % 2 === 0) { return "rgb(52,81,103)" } else { return "rgb(35,54,69)" }})// "fill",'#337ab7')//"#054bff")
     .attr("d", path);
}

// function drawCities(cities) {

//   console.log("inside drawCities",cities)
//   var elem = svg.selectAll('g').data(cities)
//   var elemEnter = elem.enter().append('g')
//   .attr("transform", function(d,i) { 
//     return "translate(" + projection([d.lon, d.lat])[0] + "," + projection([d.lon, d.lat])[1]+ ")" } )

//   var circle = elemEnter.append('circle')
//     .attr("fill-opacity",0)
//     .style("stroke-width",0)
//     .attr("fill","#d4ee80")
//   .transition().delay(function(d,i) { 
//     if(i % 2 === 0) { text(this) }
//     return i / cities.length * 6000})  
//     .attr("r",35)
//   .transition().duration(2000)
//     .attr("stroke", "rgba(230,230,230, .5)")
//     .attr("fill-opacity",1)
//     .attr("fill","#59b318")
//     .attr("r",20)
//     .style("stroke-width",10)
//     .attr("stroke-opacity",.8)
//   .transition()
//             .duration(1000)
//             .ease(Math.sqrt)
//         .attr("r",10)
//             //.style("fill-opacity", 1e-6)
//          .style("stroke-width",100)
//             .attr("stroke-opacity", 1e-6)
//   //transition will allow the stroke-width to be fully expanded and then 
//   //reset to 0 before growing in diam
//   //if the first trans() is removed then s-w trans to 0 and then back out
//   //I believe that transition() is aware of the previous trans\duration 
//   //even though they aren't chained 
//   circle.transition().duration(500).style("stroke-width",0).attr("stroke-opacity",0)
//   .transition().style("stroke-width",10).attr("stroke-opacity",.8)
//   //


//   function text () {
//    // console.log(this)
//     var text = elemEnter.append("text")
//     .attr("fill","white")
//     .transition().duration(1000)//.delay(500)
//     .transition().delay(function(d,i) { return i / cities.length * 11000})
//      .transition().duration(1000) 
//       .attr("dx", function(d){return -33})
//       .attr("dy", function(d) { return 20 } )
//       .text(function(d){return d.city})
//       .attr("fill","black")
//       .style("font-size",10).style("font-weight","bold")
//       .attr("text-anchor","start")
//   }
// }

//Determine current width\height oftarget div
function canvasSize(target) { 
  var height = parseFloat(d3.select(target).node().clientHeight)
  var width = parseFloat(d3.select(target).node().clientWidth)
  console.log(d3.select(target).node().clientWidth)
  
  return [width,height]
}//canvasSize

d3.select("#explore").on("click",function(d,i) { 
  console.log(this)
  visibility(".section.s1 .wrapper")
})

function visibility(sel,vis){

  d3.select(sel).style("display","none")
}


})()
