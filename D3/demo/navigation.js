
d3.selectAll(".story a").on("click",tellstory)

function tellstory(param){
  var name;
  //console.log(this)
  if(param == "s1") { 
    name = "#s1"
    d3.select(".story.s1 a").style("background-color","rgb(238, 238, 238)")
  }
  else {
    var text = d3.select(this).text().toLowerCase()
    d3.selectAll(".story a").style("background-color","#f8f8f8")  
    d3.select(".story"+"."+text + " a").style("background-color","rgb(238, 238, 238)") 
    name = "#" + d3.select(this).text().toLowerCase()
  }
  console.log(name)
  d3.selectAll(".section")
    .transition().duration(500)
    .style("opacity",0).style("display","none")
  d3.selectAll(".section").filter(name)
    .transition().duration(1000)
    .style("opacity",1).style("display","block")
}

$(document).ready(function() {
    tellstory("s1")
});
