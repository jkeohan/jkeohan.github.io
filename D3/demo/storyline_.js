function storyline(cities) {

  function func1() {

     d3.selectAll(".wrapper h1")
      .transition().duration(1000).style("opacity",0)
      .transition().style("display","none")
     d3.selectAll(".wrapper .p1")
      .transition().duration(1000).style("opacity",0)
      .transition().style("display","none")
     d3.select(".wrapper .p2")
     .transition().delay(1500).duration(1000).style("opacity",1)
  }

  function func2() { 

    d3.select(".wrapper .nyc").transition().delay(750).duration(1000)
      .style('font-size',"20px")
      .style("color","rgb(174,23,75)")
      .style("vertical-align","-2px")
      .style("margin-left","10px")
    //drawCities(cities,projection)
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
    //drawAllCities(cities,projection)
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
