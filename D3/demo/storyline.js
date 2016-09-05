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
      .style("color","#d4ee80")
    drawCities(cities,projection)
    d3.select(".wrapper .p3").transition().delay(4000).duration(1000).style("opacity",1)
  }

  function func3() { 
  console.log("this is func3")
    $('.msg').append("<div>this is func3</div") }

  arr = [ 
    {"func":func1, "time":2500}, 
    {"func":func2, "time":1000},  
    {"func":func3, "time":2000}
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
