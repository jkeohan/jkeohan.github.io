// (function() { 

  var cities;
  var points = d3.models.points()
  var canvas = canvasSize('.section.s1')
  var margins = { top:200,bottom:100,left:200,right:200}
  var countryScale = d3.scale.ordinal().range(["yellow","blue","green","orange"])
  //subtracting margns.left\right from width causes g elem to position 
  //itself 100 pix down and right
  width = canvas[0]// - margins.left - margins.right
  height = 500;
  projection = d3.geo.mercator().scale([ width/8.5 ]).translate([ 500,300])
  //projection = d3.geo.equirectangular().center([ 0, 10 ]).translate([ width/2 -150, height/1.74026575872 ])
  //projection = d3.geoNaturalEarth().scale(200).precision(.1).translate([ 400,300])//.scale([ width/5 ])
 //projection = d3.geoRobinson().scale([ width/6 ]).precision(.1).translate([ 450,300])//.scale([ width/5 ])
  //projection = d3.geoWinkel3().scale(200).precision(.1).translate([ 450,300])//.scale([ width/5 ])


  d3_queue.queue()
    .defer(d3.json,"data/countries/mapshaper_output.json")
    .defer(d3.csv,"data/countries/cities2.csv",project)
     .defer(d3.json,"data/countries/gadata1.json")
    .await(function(error,world,cities,gadata) {
      countryScale.domain( ["Afghanistan","United States of America","United Kingdom","Australia"])
      cities = cities 
      drawMap(world,cities)
      console.log(gadata)
    })//await
  function project(d){
    d.lon = +(projection([+d.lon,+d.lat])[0])
    d.lat = +(projection([+d.lon,+d.lat])[1])
    return d 
  }

//   d3.select("#explore").on("click",function(d,i) { 
//   console.log(this)
//   //visibility(".section.s1 .wrapper")
// })


  var svg = d3.select('#worldMap').attr("width",width).attr("height",height)
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
  //Define path generator
  var path = d3.geo.path()
     .projection(projection);

  svg.selectAll("path").data(countries.features).enter()
     .append("path")
     .attr("class",function(d,i) { if ( i % 2 === 0) { return "dark"} else { return "light" }})
     .style("fill",function(d,i) { if( i % 2 === 0) { return "rgb(52,81,103)" } else { return "rgb(35,54,69)" }})// "fill",'#337ab7')//"#054bff")
     .attr("d", path);

    //should be toggling fa-play & fa-pause
    d3.select("#play").on("click",function() {
      d3.select(".buttonText").text("Pause")
      d3.select(".fa-play").classed("hidden",true)
      d3.select(".fa-pause").classed("hidden",false)
      //storyline(cities)
      storyLineTransition(cities)
    })
}

    function storyLineTransition(cities) {
      var tE = 1000
      var nyc = cities.filter(function(d,i){ return d.city == "NYC"})

      d3.transition().duration(1000).
        each("end",function(d,i) { d3.selectAll(".wrapper h1,.p1").call(transFadeOut)})
     d3.select(".wrapper .p2")
     .transition().delay(2000).duration(1000).style("opacity",1)
     .transition().delay(7750).duration(1000) .style("opacity",0)
     .transition().style("display","none")
     d3.transition().delay(3200)
      .each("end",function(d,i){ newyorkcity(cities) })
     d3.transition().delay(5200) 
      .each("end",function(d,i){ allCities(cities); sidePanelLayout(cities) })
      //sidePanelInfo(cities)
     // d3.transition().delay(7500)
     //  .each("end",function(d,i) { redrawMap(cities) })
      
      function transFadeOut(sel) {
           sel.transition().duration(tE).style("opacity",0)
           .transition().style("display","none")
      }

    function importIcon() {
      // d3.html("images/gaicon.svg", loadSVG);
      // function loadSVG(svgData) {
      //     d3.select(svgData).selectAll("paths").append("g")

      //     //.each(function() { d3.select("svg").node().appendChild(this);});
      //     //d3.selectAll("paths").classed("icon",true).attr("transform", "translate(50,50)");
      // };
      //inserting the image adds it to the existing parent g.outter element and 
      //offsets the image
        d3.selectAll("g.outter circle").style("fill-opacity",0)
        .transition().duration(250).style("fill-opacity",0)
        .transition().duration(1000).style("fill-opacity",1).
        attr("r","1%").style("fill","url(#image)")
          .style("stroke","black").style("stroke-width","0.2%")    
        }

   }

    function transFadeOut(sel) {
           sel.transition().duration(1000).style("opacity",0)
           .transition().style("display","none")
      }

   function redrawMap(cities) {
    d3.selectAll("path").filter(function(d,i){
      var country = d.properties.admin
      console.log(country)
      if(countryScale.domain().indexOf(country) > 0) { 
        d3.select(this).style("fill",countryScale(country)) 
      }
    })
  }
   function sidePanelLayout(circleData){
      var rows = Math.ceil(Math.sqrt(circleData.length))
      var columns = rows
      var cell = 0
      for(i = 0;i<rows;i++){ //y
        for(j=0;j<columns;j++){ //x
          if(circleData[cell]){
            circleData[cell].x = j*50;
            circleData[cell].y = i*50;
            cell++
          }
          else {
            break
          }
        }
      }
      console.log("sidePanelLayout",circleData)
      sidePanelInfo(circleData)
      return circleData
   }
    function sidePanelInfo(circleData) {
      console.log("inside sidePanelInfo",circleData)
      var g = d3.select("#worldMap").append('g').classed("sidepanel",true)
       .attr("transform", function(d,i) { return "translate(" + 1000 + "," + 100 + ")" } )

      var text = g.append('g').attr("transform", function(d,i) { return "translate(" + -15 + "," + 0 + ")" } )
       .append("text").text("GA Locations").classed("titleText",true)
          .attr("dy",2)
          .style("font-size",30)
          .style("opacity",1)
          .style("fill","white")


      var circles = g.selectAll('g.sp.circles').data(circleData)

      circles.enter().append('g').classed("newside",true).classed("sp circles",true)
      .attr("transform", function(d,i) { return "translate(" + d.x + "," + (d.y + 50)  + ")" } )
        .style("opacity",0)
        //.each(function(d,i){ d3.select(".titleText").transition().duration(1000).text( function() { console.log(d.city); return d.city } ) })
      .transition().delay(function(d,i) { return i/circleData.length * 5500 }).duration(1000)
       .style("opacity",1)
        
        circles.append("circle")
              .attr("r",0).style("fill","red").style("fill-opacity",.4)
              .style("stroke","white").style("stroke-opacity", .3) .style("stroke-width",0)
            .transition().duration(1000)
              .attr("r",20).style("stroke-width",5)
            
       circles.append("text")
          .text(function(d) { return d.code}).style("text-anchor","middle")
          .attr("dx",0).attr("dy",2).style("opacity",0)//.style("font-size",0)
        .transition().delay(function(d,i) { return i/circleData.length * 5500 })
          .duration(1000).style("font-size",9).style("opacity",1).style("fill","white")
    }
    function newyorkcity(cities){
      var nyc = cities.filter(function(d,i){ 
        var code = d.city == "NYC"
        return d.city == "NYC"
      })
      console.log(nyc)
      meteores(nyc,800)
    }
    function nyc(cities){
      cities.map(function(d,i){
        return d.city == "NYC"
      })
      return cities
    }
    function allCities(cities){
      console.log("inside allCities")
      var all = cities.filter(function(d,i){ 
        return d.code != "NYC"
      })
      meteores(all,100)
    }   
    function meteores(cities,strokeWidth){
      console.log("inside meteores",cities)
        points.data(cities)
          .type("meteores")
          .radius(3)
          .fill("#ff0033")// #ae174b
          .stroke("#e6e6e6")
          .strokeWidth(strokeWidth)
          .identifier("city")
          //.end(dualCircles)
        svg.call(points)
    }
    function circlesWithRadius(circleData){
      console.log("inside circlesWithRadius")
      var circles = svg.selectAll(".city").data(circleData)
      //circles.enter().append("circle")
      circles
        .attr("fill","#ae174b")
        .attr("r",0)
        .attr("stroke", "rgba(230,230,230, .8)")
        .attr("stroke-width",1)
        .transition().delay(function(d,i) { return i / 14 * 2000})
        .transition().duration(1000)
        .ease("bounce")
        .attr("r",5)
        .attr("stroke-width",3)
    }

//         // .each("end",function(d,i) { 
//         //    (d3.select(this)).style("stroke-width",0).style("stroke-opacity",0)  } )
//         // .transition().duration(1000).style("stroke-width",10).style("stroke-opacity",.5)
//         // .each("end",function(d,i){
//         //   dualCircles(circleData)
//         // })
//         // function trans(sel) { 
//         //   console.log(d3.select(sel[0][0]).style("stroke-width",0))
//         // }
//       //dualCircles(circleData)
//       //drawCityTitle(circleData)

//     //this was a solution provided by MB but isn't being used
//     // .call(endall, function() {
//     //   console.log((d3.select(this)).style("stroke-width",0) )
//     //   console.log("all done"); })

//     function endall(transition, callback) { 
//       var n = 0; 
//       transition 
//           .each(function() { ++n; }) 
//           .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
//     } 
// }




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
    var circle3 = g3.append("circle").attr("class","cradar")

    circle1
        .attr("r",0)
        .attr("fill","#ae174b")
        .attr("class","circledemo10a")
      .transition().duration(1000) 
        .attr("r",6)

    circle2
      //.transition().delay(1000)
        .attr("fill","#ae174b")
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
        .style("fill", "url(#gacircle)")
        .attr("fill-opacity",1)
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

    function radarSignal(sel,times,radi){
      var counter = 0;
      var si = setInterval(function() {
        //d3.selectAll('g').remove()
        if(counter > 2) {  clearInterval(si) }
        else{
          counter++
          d3.select(".circledemo10c").attr("r",10).style("stroke-opacity", 1)
           .transition().duration(1000)
              .attr("r",200).style("stroke-width",5).style("stroke-opacity", 1e-6) 
          //dualCircles(circleData)
        }
      },2000)
    }
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
}
//Determine current width\height oftarget div
function canvasSize(target) { 
  var height = parseFloat(d3.select(target).node().clientHeight)
  var width = parseFloat(d3.select(target).node().clientWidth)
  //console.log(d3.select(target).node().clientWidth)
  
  return [width,height]
}//canvasSize

  d3.select("#explore").on("click",function(d,i) {
    d3.select(this).call(transFadeOut)
    d3.select('#worldMap').style("margin-left","250px") 
    d3.select(".bottomAside").style("top","500px").style("opacity",1)
    d3.select('.mapNavs').style("height","100px")
    d3.select('aside.leftAside').style("left",0)
    d3.select('#worldMap').style("margin-left","250px")
    d3.select('.wrapper.section1').style("display","none")
    d3.selectAll('path.light').style("fill","rgb(220,220,220")
    d3.selectAll('path.dark').style("fill","rgb(239,239,239")
    //d3.select(".wrapper.section1")
  //visibility(".section.s1 .wrapper")
  })

  d3.selectAll(".className").on("mouseover",function(d) {
    // var active = d3.select(this).active ? true : false
    // d3.select(this).transition().duration(500).style("font-size","35px")  
    d3.select(this).transition().style("transform","scaleY(1.3)")
    // d3.select(this).active = active
  })

  d3.selectAll(".className").on("mouseout",function(d) {
      d3.select(this).transition().style("transform","scaleY(1)")
  })

  // d3.select("#explore").on("click",function(d,i) { 
  //   d3.select(".bottomAside").style("top","500px").style("opacity",1)
  //   d3.select('.mapNavs').style("height","100px")
  //   d3.select('aside.leftAside').style("left",0)
  //   d3.select('#worldMap').style("margin-left","250px")
  //   d3.select('.section.s1').style("background","rgb(246,246,246)")
  //   d3.select('path.light').style"fill","rgb(220,220,220")
  //   d3.select('path.dark').style("fill","rgb(239,239,239")
  //   visibility(".section.s1 .wrapper")
  // })

  function visibility(sel,vis){
    //d3.select(".bottomAside").style("top","500px").style("opacity",1)
    d3.select(sel).style("display","none")
  }


function storyline(cities) {

  function func1() {

     d3.selectAll(".wrapper h1").transition().duration(1000).style("opacity",0)
      .transition().style("display","none")
     d3.selectAll(".wrapper .p1").transition().duration(1000).style("opacity",0)
      .transition().style("display","none")
     d3.select(".wrapper .p2").transition().delay(1500).duration(1000).style("opacity",1)
  }

  function func2() { 

    d3.select(".wrapper .nyc").transition().delay(750).duration(1000)
      .style('font-size',"20px")
      .style("color","rgb(174,23,75)")
      .style("vertical-align","-2px")
      .style("margin-left","10px")
    // drawCities(cities,projection)
    //meteores(cities)

    d3.select(".wrapper .p3").transition().delay(4000).duration(1000).style("opacity",1)

     d3.select(".wrapper .radar").transition().delay(5250).duration(1000)
      .style('font-size',"20px")
      .style("color","rgb(174,23,75)")
      .style("vertical-align","-1px")
     
  }

  function func3() { 
    d3.select(".wrapper .p2,.p3").transition().duration(1000).style("opacity",0).transition().style("display","none")
    d3.select(".wrapper .p4").transition().delay(1500).duration(1000).style("opacity",1)
  }

  arr = [ 
    {"func":func1, "time":2500}, 
    {"func":func2, "time":10000},  
    {"func":func3, "time":10000}
   ]

  var active = 0;
  var counter = 1000;

  var myFunction = function(){
      clearInterval(interval)
      if(active == arr.length) {clearInterval(interval)}
      else {
        arr[active].func()
        counter = arr[active].time
        active++
        interval = setInterval(myFunction, counter);
      }
  }
  var interval = setInterval(myFunction, counter);

}
