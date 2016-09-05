// (function() { 

  var cities;
  d3_queue.queue()
    .defer(d3.json,"data/countries/mapshaper_output.json")
    .defer(d3.csv,"data/countries/cities.csv")
    .await(function(error,world,cities) {
      cities = cities 
      drawMap(world,cities)
      
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

function drawMap(countries,cities) {
  console.log(cities)
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

    //drawCities(cities,projection) 
    //drawCities(cities) 

    d3.select("#play").on("click",function() {
      d3.select(".buttonText").text("Pause")
      d3.select(".fa-play").classed("hidden",true)
      d3.select(".fa-pause").classed("hidden",false)
      storyline(cities)})

}

//meteores takes in a an object
//the obj must have lon & lat properties
//the lon\lat must be interpolated by a projection
function meteores(circleData,params) {
   //console.log(circleData)
   var lon = circleData.lon
   var lat = circleData.lat

    g = svg.append('g').attr("transform", function(d,i) { return "translate(" + lon + "," + lat + ")" } )
    var circle = g.append("circle")
       .attr("fill-opacity",0)
       .style("stroke-width",0)
       .attr("fill","#d4ee80")
       .attr("r",30)
      .transition().duration(250)      
        .attr("stroke", "#59b318")
        .attr("fill-opacity",0)
        .attr("fill","#59b318")
        .attr("r",0)
        //.style("fill-opacity",0)
        .style("stroke-opacity",1)

      .transition().duration(1000)
        .attr("r",1)
        .ease(Math.sqrt)
        //.attr("r",6)
        .style("stroke-width",1000)
        .style("stroke-opacity", 1e-6)
        // .each("end",function(d,i) { 
        //    (d3.select(this)).style("stroke-width",0).style("stroke-opacity",0)  } )
        // .transition().duration(1000).style("stroke-width",10).style("stroke-opacity",.5)
        // .each("end",function(d,i){
        //   dualCircles(circleData)
        // })
        // function trans(sel) { 
        //   console.log(d3.select(sel[0][0]).style("stroke-width",0))
        // }
      dualCircles(circleData)
      drawCityTitle(circleData)

    //this was a solution provided by MB but isn't being used
    // .call(endall, function() {
    //   console.log((d3.select(this)).style("stroke-width",0) )
    //   console.log("all done"); })
    function endall(transition, callback) { 
      var n = 0; 
      transition 
          .each(function() { ++n; }) 
          .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
    } 
}

function drawCityTitle(circleData){
     var lon = circleData.lon
   var lat = circleData.lat
  //   var lineSource = d3.svg.line()
  //   .x(function(d) { return d.source.lon })
  //   .y(function(d) { return d.source.lat })

  // var lineTarget = d3.svg.line()
  //   .x(function(d) { return d.source.lon })
  //   .y(function(d) { return d.source.lat })

  // svg.append("line")
  //  .attr("x1", function(d) { return lon + 15  })
  //  .attr("y1", function(d) { return lat})
  //  .attr("x2", function(d) { return lon + 30 })
  //  .attr("y2", function(d) { return lat })
  //  .style("stroke", "white");
}

function dualCircles(circleData) {

   var lon = circleData.lon
   var lat = circleData.lat

    g1 = svg.append('g')
    .attr("transform", function(d,i) { 
       return "translate(" 
        + lon + "," 
        + lat + ")" 
    } )

    g2 = svg.append('g').attr("class","g3")
    .attr("transform", function(d,i) { 
       return "translate(" 
        + lon + "," 
        + lat + ")" 
    } )

    g3 = svg.append('g').attr("class","group3")
    .attr("transform", function(d,i) { 
       return "translate(" 
        + lon + "," 
        + lat + ")" 
    } )

    var circle1 = g1.append("circle")
    var circle2 = g2.append("circle")
    var circle3 = g3.append("circle")

    circle1
        .attr("r",0)
        .attr("fill","#59b318")
        .attr("class","circledemo10a")
      .transition().duration(1000) 
        .attr("r",6)

    circle2
      //.transition().delay(1000)
        .attr("fill","#59b318")
        .attr("fill-opacity",0)
        .attr("r",0)
        .attr("class","circledemo10b")
        //.attr("stroke","white")
      .transition().duration(1000)
        .attr("stroke","white")
        .attr("stroke-width",1)
        .style("stroke-opacity", 1)
        .attr("r",10)

     circle3
      //.transition().delay(1000)
        .attr("fill","#59b318")
        .attr("fill-opacity",0)
        .attr("r",0)
        .attr("class","circledemo10c")
        //.attr("stroke","white")
      .transition().duration(1000)
        .attr("stroke","white")
        .attr("stroke-width",1)
        .style("stroke-opacity", 1)
        .attr("r",10)
      .transition().delay(1500)
        .each("end",function() {
          radarSignal(circle3)
        })
      // .transition().duration(1000)
      //               .attr("r",100)
      //                 .style("stroke-opacity", 1e-6) 
      

    //radarSignal(circle3)



    // var text = g3.append("text")
    // .attr("fill","white")
    //   .attr("dx", function(d){return 0})
    //   .attr("dy", function(d) { return 0 } )
    //   .text("New York")
    //   .attr("fill","white")
    //   .style("font-size",10).style("font-weight","bold")
    //   .attr("text-anchor","start")

    function radarSignal(){
      setInterval(function() {
        //d3.selectAll('g').remove()
        d3.select(".circledemo10c").attr("r",10).style("stroke-opacity", 1)
         .transition().duration(750)
                    .attr("r",100)
                      .style("stroke-opacity", 1e-6) 
        //dualCircles(circleData)
  
      },2000)
    }
}

function drawCities(cities,projection){
  console.log("drawCities - cities is: ", cities)
  var circleData = [];
  cities.filter(function(d,i){  
    var lon = projection([d.lon,d.lat])[0]
    var lat = projection([d.lon,d.lat])[1]
    circleData.push({lon,lat})
    console.log(circleData)
  })
  console.log("circleData is: ",circleData)
  var i = 0
  var drawCircles = setInterval(function(){
    if(i >= circleData.length) { clearInterval(drawCircles)}
    else { 
      //dualCircles(circleData[i])
      meteores(circleData[i],"meteorIn","meteorOut") 
    i++ }
  },1000) 
  //meteores(circleData[i])
  //connectCities(circleData)
}

function connectCities(cities) {

  console.log("connectCities - cities param", cities)
  function sourceTarget(cities){
    var links = [];
     cities.map(function(d,i){
        console.log(d,i)
        links.push( { source: cities[0], target: cities[1] } )
      })
      console.log(links)
      return links
  }  


  //    var links = [
  //   {source: nodes[0], target: nodes[1]},
  //   {source: nodes[2], target: nodes[1]}
  // ]

  var lineSource = d3.svg.line()
    .x(function(d) { return d.source.lon })
    .y(function(d) { return d.source.lat })

  var lineTarget = d3.svg.line()
    .x(function(d) { return d.source.lon })
    .y(function(d) { return d.source.lat })

  svg.selectAll(".line")
   .data(sourceTarget(cities))
   .enter()
   .append("line")
   .attr("x1", function(d) { return d.source.lon })
   .attr("y1", function(d) { return d.source.lat})
   .attr("x2", function(d) { return d.target.lon })
   .attr("y2", function(d) { return d.target.lat })

   .style("stroke", "rgb(6,120,155)");

  //   var links = [
  //   {source: nodes[0], target: nodes[1]},
  //   {source: nodes[2], target: nodes[1]}
  // ]

  //   svg.selectAll(".line")
  //    .data(cities)
  //    .enter()
  //    .append("line")
  //    .attr("x1", function(d) { return d.source.x })
  //    .attr("y1", function(d) { return d.source.y })
  //    .attr("x2", function(d) { return d.target.x })
  //    .attr("y2", function(d) { return d.target.y })
  //    .style("stroke", "rgb(6,120,155)");
}

// function drawCities(cities) {

//   console.log("inside drawCities",cities)
//   var elem = svg.selectAll('g').data(cities)
//   var elemEnter = elem.enter().append('g')
//   .attr("transform", function(d,i) { 
//     return "translate(" + projection([d.lon, d.lat])[0] + "," + projection([d.lon, d.lat])[1]+ ")" } )

//   var circle = elemEnter.append('circle')//.attr("class","meteorEnter")
//      .attr("fill-opacity",0)
//      .attr("stroke-width",0)
//      .attr("fill","#d4ee80")
//     .transition().delay(function(d,i) { 
//       return i / cities.length * 2000}) 
//       .attr("r",15)
//     .transition().duration(500)
//       .attr("stroke", "#59b318")
//       .attr("fill-opacity",1)
//       .attr("fill","#59b318")
//       .attr("r",5)
//       .attr("stroke-opacity",.8)
//     .transition().duration(1000)
//       .ease(Math.sqrt)
//       .attr("r",6)
//       .attr("stroke-width",500)
//       .attr("stroke-opacity", 1e-6)





//   //   .attr("fill-opacity",0)
//   //   .style("stroke-width",0)
//   //   .attr("fill","#d4ee80")
//   //   //.attr("r",35)
//   // .transition().delay(function(d,i) { 
//   //   if(i % 2 === 0) { text(this) }
//   //   return i / cities.length * 6000})  
//   //   .attr("r",35)
//   // .transition().duration(2000)
//   //   .attr("stroke", "rgba(230,230,230, .5)")
//   //   .attr("fill-opacity",1)
//   //   .attr("fill","#59b318")
//   //   .attr("r",1) 
//   //   .style("stroke-width",1)
//   // .transition().duration(1000)
//   //           .ease(Math.sqrt)
//   //       .attr("r",5)
         
//   //   .attr("stroke-opacity",.8)
//   //           //.style("fill-opacity", 1e-6)
//   //        .style("stroke-width",100)
//   //           .attr("stroke-opacity", 1e-6)
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
  //console.log(d3.select(target).node().clientWidth)
  
  return [width,height]
}//canvasSize

d3.select("#explore").on("click",function(d,i) { 

  //console.log(this)
  visibility(".section.s1 .wrapper")
})

function visibility(sel,vis){

  d3.select(sel).style("display","none")
}


// })()
