function storyline(cities) {
    function func1() { 
    console.log(cities)
    drawCities(cities,projection)  
  }

  function func2() { 
  console.log("this is func2")
    $('.msg').append("<div>this is func2</div") }

  function func3() { 
  console.log("this is func3")
    $('.msg').append("<div>this is func3</div") }

  arr = [ 
    {"func":func1, "time":3000}, 
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
