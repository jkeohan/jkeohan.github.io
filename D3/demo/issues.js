//this func would build all the circles at once and
//disregard the transition
function circlesWithRadius(circleData){
  debugger;
  circleData[0].map(function(d,i){     
    d3.select(d).append("circle")
    .attr("fill","#59b318")
    .attr("r",0)
    .attr("stroke", "rgba(230,230,230, .8)")
    .attr("stroke-width",1)
    .transition().delay(function(d,i) { return i / 14 * 2000})
    .transition().duration(3000)
    .ease("bounce")
    .attr("r",5)
    .attr("stroke-width",3)
  })
}
