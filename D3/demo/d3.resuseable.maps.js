d3.models = {};
d3.models.maps = function() {

  var fontSize = 15;
  var width = 650;
  var transX = 0;
  var transY = 0;
  var scale = 1;
  var geoData = "";
  var supportingData = "";
  var color = d3.scale.category20()
  var uniqueClass = "uniqueClass";
  var proj = "mercator";
  var dispatch = d3.dispatch("mouseOver", "mouseOut","onClick");

  function render(selection) {
    selection.each(function(data){
      if(proj == "mercator") {
        projection = d3.geo.mercator()
        .scale(scale).translate([transX, transY]);
        redraw(projection)
      }
      if(proj == "orthographic") {
        projection = d3.geo.orthographic()
         .scale(1).translate([0, 0])
         .center([ 0, 0 ])
      }
      if(proj == "albersUsa") {
      
        projection = d3.geo.albersUsa()
         .scale(scale).translate([transX, transY])
         //.center([ 0, 0 ])
          redraw(projection)
      }  
    })  
      function redraw(projection) {   
        var path = d3.geo.path().projection(projection);
        map = selection.selectAll("path."+ uniqueClass)
         .data(geoData)
         .enter()
         .append("path")
         .attr("d",path)
         .attr("class",uniqueClass)
         .style("stroke", "white")
         .style("stroke-width", 0.5);
      } 
  }//render()

  render.geoData = function(_x) {
  if (!arguments.length) return geoData;
  geoData = _x;
  return this;
  }
  render.uniqueClass = function(_x) {
  if(!arguments.length) return uniqueClass
  uniqueClass = _x;
  return this;
  }
  render.supportingData = function(_x){
  if(!arguments.length) return supportingData
  supportingData = _x;
  return this;
  }
  render.proj = function(_x){
  if(!arguments.length) return proj;
  proj = _x;
  return this;
  }
  render.color = function(_x){
    if(!arguments.length) return color;
    color = _x;
    return this;
  }
  render.fontSize = function(_x) {
  if (!arguments.length) return fontSize;
  fontSize = _x;
  return this;
  }
  render.transX = function(_x) {
    if(!arguments.length) return transX
    transX = _x
    return this;
  }
  render.transY = function(_x) {
    if(!arguments.length) return transY
    transY = _x
    return this;
  }
  render.scale = function(_x){
    if(!arguments.length) return scale
    scale = _x
    return this;
  }
  //https://github.com/mbostock/d3/wiki/Internals#rebind
  d3.rebind(render, dispatch, "on")
  return render
}
// We add the legend module, which is a simple function returning a function. The outer
// function serves as the scoped closure for our module.
d3.models.legend = function () {
  // Some variables are available in the closure and not accessible from the outside (pri- vate). 
  // They have default values.
  var fontSize = 15;
  var width = 650;
  var height = 400;
  var transX = 0;
  var transY = 0;
  //var translate = [0,0];
  var legendValues;
  var position = "vertical";
  // One way for the module to expose events to the outside world is by using  d3.dispatch to declare 
  // an event that we can then listen to from the out- side when it’s triggered in the module.
  //Both d3.dispath and d3.rebind are classified as d3 Internals and are utilities for implementing reusable components.
  var dispatch = d3.dispatch("mouseOver", "mouseOut","onClick");

  function render(selection) {
    //console.log(selection)
    selection.each(function(data) { 
      console.log(selection)
      if(position === "vertical") { 
          //D3 Vertical Legend//////////////////////////
          var legend = selection.append('g').attr("transform", function (d, i) { return "translate(" + transX + "," + transY  + ")" })//attr("transform",function(d,i) { return "translate(" + transX + ',' + transY ")"} )
          .selectAll("legend").data(legendValues).enter().append("g")
              .attr("class", "legend")
              .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")" })
              .on("mouseover",dispatch.mouseOver) //dispath name cannot be same as event
              .on("mouseout", dispatch.mouseOut)
              .on("click", dispatch.onClick)
          
         legend.append('rect')
          .attr({ x:width+5, y:5, width: 10, height: 10 })
          .style("fill", function (d, i) { return d.color })

         legend.append('text')
          .attr({ x: width+25, y: 15})
          .text(function (d, i) { return d.text})
          .style("text-anchor", "start")
          .style("font-size", fontSize)

      } else {   

        var legend = selection.selectAll("legend").data(legendValues).enter().append('div')
          .attr("class", "legend")

        legend
          .html(function(d,i) {return d.text})
          .style("color", function(d,i) {return d.color })
          .style("display","inline-block")
          .style("padding","0px 5px")
          .style("margin",".2em")
          .on("mouseover",dispatch.mouseOver)
          .on("mouseout", dispatch.mouseOut)
          .on("click", dispatch.onClick)
        }//else
    })//_selection.each()
  }//render()
  //Functions are also objects so we can add addtional properties and\or methods
  // These “public” functions will be used as getters and setters at the same time. 
  // They are getters when no argument is passed to the function; otherwise they set 
  // the private variable to the new value passed as an argument. When setting, we return 
  // the current context this, as we want these methods to be chainable.
  render.fontSize = function(_x) {
    if (!arguments.length) return fontSize;
    fontSize = _x;
    return this;
  }
  render.width = function(_x) {
    if (!arguments.length) return width;
    width = _x;
    return this;
  }
  render.height = function(_x) {
    if (!arguments.length) return height;
    height = _x;
    return this;
  }
  // render.translate = function(_x) {
  //  if (!arguments.length) return translate;
  //  translate = _x;
  //  return this;
  // }
  render.transX = function(_x) {
    if(!arguments.length) return transX
    transX = _x
    return this;
  }
  render.transY = function(_x) {
    if(!arguments.length) return transY
    transY = _x
    return this;
  }
  render.inputScale = function(_x) {
     if (!arguments.length) return inputScale;
        scale = _x;
        legendValues = [];
        scale.domain().forEach(function (el) {
          var cellObject = {color: scale(el), text: el} 
          legendValues.push(cellObject)
          //console.log(legendValues)
      })
    return this;
  }
  render.position = function(_x) {
    if(!arguments.length) return position;
    position = _x;
    return this;
  }
  //https://github.com/mbostock/d3/wiki/Internals#rebind
  d3.rebind(render, dispatch, "on")
  return render
}
//d3.rebind(target,source,names)
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

// Copies the methods with the specified names from source to target, and returns target. 
// Calling one of the named methods on the target object invokes the same-named method on the source object, 
// passing any arguments passed to the target method, and using the source object as the this context
//Determine current width\height oftarget div
function canvasSize(target) { 
  var height = parseFloat(d3.select(target).node().clientHeight)
  var width = parseFloat(d3.select(target).node().clientWidth)
  console.log(d3.select(target).node().clientWidth)
  return [width,height]
}//canvasSize
