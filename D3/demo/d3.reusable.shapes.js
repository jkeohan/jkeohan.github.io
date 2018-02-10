d3.models = {};

d3.models.points = function() {
  var radius = 5;
  var strokeWidth = 100;
  var fill = "#e6e6e6"
  var stroke = "#ae174b"
  var type = "simple";
  var data;
  var classed;

  function render(selection) {
    selection.each(function(d) {
      if(type == "simple") {
      }
      else if ( type == "meteores") {
          var outter = selection.selectAll("g.outter").data(data)
          outter.enter().append('g').classed("outter",true)
            .attr("transform", (d,i) => { return "translate(" + d.lon + "," + d.lat + ")" } )
            .append("circle")//.classed(function(d) { return d.code },true)
          //.classed(manualClass,true)//
          // .attr("class",function(d) { 
          //   return ( manualClass + " " + d[dynamicClass]) })
          .transition().delay(function(d,i) { return i/data.length * 5000 })
            .style("stroke", stroke)
            .style("stroke-width",1)
            .style("fill-opacity",0)  
            .style("fill",fill) 
            .attr("r",.5)
            .style("stroke-opacity",1)                       
          .transition().duration(1000)
            .attr("r",1)
            .ease(Math.sqrt)
            .style("stroke-width",strokeWidth)
            .style("stroke-opacity", 1e-6)
          .transition().duration(250)
            .style("stroke-width",1)
            .style("stroke","#e6e6e6")  

           var inner = selection.selectAll("g.inner").data(data)
          inner.enter().append('g').classed("inner",true).attr("transform", 
            function(d,i) { return "translate(" + d.lon + "," + d.lat + ")" } )
          .append("circle").attr("class",classed)
          .transition().delay(function(d,i) { return i/data.length * 5000 })
            .attr("r",0)
            .style("fill",fill)                 
            .style("fill-opacity",.8)
            .style("stroke",stroke)    
            .style("stroke-opacity", .3) 
            .style("stroke-width",0)
          .transition().duration(1000)
            .attr("r",radius)
            .style("stroke-width",2)

          inner.append("text")
            .text(function(d) { return d.code}).style("text-anchor","middle")
            .attr("dy",2).style("opacity",0)
          .transition().delay(function(d,i) { return i/data.length * 6000 })
            .duration(1000)
            .style("font-size",8)
            .style("opacity",0)
            .style("fill","white")

          // var outterCircle = outter.append("circle").classed("outter",true).classed(identifier,true)
          // .transition().delay(function(d,i) { return i/data.length * 5000 })
          //   .style("stroke", stroke)
          //   .style("stroke-width",1)
          //   .style("fill-opacity",0)  
          //   .style("fill",fill) 
          //   .attr("r",.5)
          //   .style("stroke-opacity",1)                       
          // .transition().duration(1000)
          //   .attr("r",1)
          //   .ease(Math.sqrt)
          //   .style("stroke-width",strokeWidth)
          //   .style("stroke-opacity", 1e-6)
          // .transition().duration(250)
          //   .style("stroke-width",1)
          //   .style("stroke","#e6e6e6")            

        // var innerCircle = outter.append("circle").classed("inner",true).classed(identifier,true)
        //   .transition().delay(function(d,i) { return i/data.length * 5000 })
        //     .attr("r",0)
        //     .style("fill",fill)                 
        //     .style("fill-opacity",.4)
        //     .style("stroke",stroke)    
        //     .style("stroke-opacity", .3) 
        //     .style("stroke-width",0)
        //   .transition().duration(1000)
        //     .attr("r",7)
        //     .style("stroke-width",2)

        // d3.selectAll("." + identifier).transition().delay(1500).duration(500)
        //  .style("fill-opacity",.4)  
        //    .style("stroke-opacity", .3)  
        //     .attr("r",7)
        //   .style("stroke-width",2)
      } 
    })
  }  
  render.type = function(_x) {
    if(!arguments.length) return type
    type = _x
    return this;
  }
  render.data = function(_x){
    if(!arguments.length) return data
    data = _x
    return this;
  }
  render.radius = function(_x) {
    if(!arguments.length) return radius
    radius = _x
    return this
  }
  render.fill = function(_x){
    if(!arguments.length) return fill
    fill = _x
    return this;
  }
  render.stroke = function(_x){
    if(!arguments.length) return stroke
    stroke  =_x
    return this
  }
  render.strokeWidth = function(_x){
    if(!arguments.length) return strokeWidth
    strokeWidth = _x
    return this
  }
  render.end = function(_x) {
    if(!arguments.length) return end
    end = _x
    return this
  }
  render.classed = function(_x){
    if(!arguments.length) return classed 
    classed = _x
    return this
  }
  render.dynamicClass = function(_x) {
    if(!arguments.length) return dynamicClass
    dynamicClass = _x
    return this
  }         
  return render
}
