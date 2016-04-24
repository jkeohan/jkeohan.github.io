(function() {
      //Width and height
      var width = 450;
      var height = 200;

      var cb = colorbrewer;
      //console.log(cb)

       var domainRange = [100, 1000, 10000, 100000, 1000000, 10000000]
          var colorRange  = cb.Greens[6]

      var projection = d3.geo.albersUsa()
                   //.center([ 0, 40])
                   .translate([ width/2 - 50, height/2]) //moving left or right
                   .scale([ 400 ]);

      //Define path generator
      var path = d3.geo.path() 
               .projection(projection);

      //USA ONLY
      // ogr2ogr -f GeoJSON -where "gu_a3 = 'USA'" states.json ne_10m_admin_1_states_provinces.shpne_50m_admin_0_countries.shp
      //Load in GeoJSON data
      // d3.json("../data/countries/usa.json", function(json) {
      //  //console.log(json.features[0].properties.pop_est)
      //  //Bind data and create one path per GeoJSON feature
      //  svg.selectAll("path")
      //     .data(json.features)
      //     .enter()
      //     .append("path")
      //     .attr("d", path)
      //     .on("mouseover", function(d,i) { 
      //        var current = this;});
      // });

      var rateById = d3.map()
      d3_queue.queue()
        .defer(d3.json,"../D3/data/geojson/usa.json")
        .defer(d3.json,"../D3/data/states.json")
        .await(function(error,us,states) { 
           states.forEach(function(d, i) {
              us.features.forEach(function(e, j) {
                  if (d.state === e.properties.name) {                  
                      e.properties.value = d.value
                  }
              })
            })
            //states.filter(function(d) { return +d.value < 350000 } ).map(function(d){ rateById.set(d.state,d.value)})
            //color.domain(d3.extent(states.filter(function(d) { return +d.value < 350000}).map(function(d){ return +d.value })))
            var max = d3.max(states.map(function(d) { return +d.value }))
            var extent = d3.extent(states.map(function(d) { return +d.value }))
            //console.log(max)
            //console.log(extent)
                
          //  draw(error,us,states)
          var scales = [];
          //scales.push({"name":"Oridnal - Using Manually Created Range","scale":d3.scale.ordinal().range(cb.Greens[7]).domain(domainRange)})
          //scales.push({"name":"Ordinal - Using Dynamically Created Range","scale":d3.scale.ordinal().range(colorRange).domain([0,max])})
          scales.push({"name":"linear","title":"Linear - Using Manually Created Range",
            "scale":d3.scale.linear().range(colorRange).domain(domainRange)})
          scales.push({"name":"linear","title":"Linear -  Using d3.extent","scale":d3.scale.linear().range(colorRange).domain([0,max])})
          scales.push({"name":"quantile","title":"Quantile - Using Manually Created Range","scale":d3.scale.quantile().range(colorRange).domain(domainRange)})
          scales.push({"name":"quantile","title":"Quantile - Using d3.extent","scale":d3.scale.quantile().range(colorRange).domain(extent)})
          scales.push({"name":"threshold","title":"Threshold - Using Manually Created Range","scale":d3.scale.threshold().range(colorRange).domain(domainRange)})
          scales.push({"name":"threshold","title":"Threshold - Using d3.extent","scale":d3.scale.threshold().range(colorRange).domain(extent)})
          // var scale = scales[0].scale
          // for(prop in colors) { console.log(scale.invertExtent(colors[prop])) }
          smallmultiples(error,us,scales)
         
        })

      function smallmultiples(error,us,scales) {
        var visualizationWrapper = d3.select(".s9 .maps")
        scales.forEach(function(scale,i) {
          var wrapper = visualizationWrapper.append("div").style("width",width).style("height",height).style("float","left")
           .attr("class","scalemaps")

        createMap(wrapper, us, scales[i])
            })
      };

       function createMap(wrapper,geo,color) {
        wrapper.append('p')
          .text(color.title)
          .attr('class', 'map-title');
  
        var svg = wrapper.append('svg').attr({
                    width: width,
                    height: height
                });
        svg.selectAll('path')
                .data(geo.features)
                .enter()
                .append('path')
                .attr('d', path)
                .style("fill",function(d) {
                  return color.scale(d.properties.value)
                  // if(d.properties.value === null) { return "#f0efef"  } //color.scale(0) }//"#f0efef" }
                  // else { return  color.scale(d.properties.contributed) }
                })
         addLegend(svg,color)

       }

       function addLegend(sel,color) {

           var newArr = legendText(color)
           //console.log(newArr)

          //console.log(color.scale.range())
           var legendHolder = sel.append('g').attr("transform","translate(310,30)")
           var legend = legendHolder.selectAll("g.legend")
            .data(color.scale.range())
            .enter().append("g")
            .attr("class", "legend")

            var ls_w = 20, ls_h = 20;

            legend.append("rect")
            .attr("x", 20)
            .attr("y", function(d, i){ return i * 20 } )
            .attr("width", ls_w)
            .attr("height", ls_h)
            .style("fill", function(d, i) { return d })
            .style("opacity", 0.8);

            legend.append("text")
            .attr("x", 50)
            .attr("y", function(d, i){ return i * 20 + 20  })
            .attr("dy",-5)
            .text(function(d, i){ 
              var val = newArr[i]
                if(val != undefined) {
                  return (newArr[i].toString().replace(","," - "))
                }
                else { return "NaN"}
              })
            .style("font-size","10px")
              //return d3.format('s')(domainRange[i]); });

       }

       function legendText(color){
          //console.log(color.name)
          if(color.name != "linear") {
           var colors = color.scale.range()
           var scale = color.scale
           var newArr = [];
           for(prop in colors) { 
            newArr.push(scale.invertExtent(colors[prop]).map(function(d) {return  d3.format('$.2s')(d)}))
            //console.log(scale.invertExtent(colors[prop]).map(function(d) {return Math.floor(d)})) 
            }
           }
          else {
            //console.log(color.scale.domain().map(function(d) { return d3.format('$.2s')(d)  } ) )
            newArr = color.scale.domain().map(function(d) { return d3.format('$.2s')(d)  } )
          }
           return newArr
       }

       d3.select(".withoutlegend").on("click",hideLegend)

       function hideLegend() {
        d3.selectAll(".legend").style("opacity",1).transition().duration(1000).style("opacity",0)
       }

        d3.select(".withlegend").on("click",showLegend)

       function showLegend() {
            d3.selectAll(".legend").style("opacity",0).transition().duration(1000).style("opacity",1)
           }

           d3.selectAll(".story a").on("click",tellstory)

        $(document).ready(function() {
            tellstory("s1")
            });
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

     //  d3.selectAll(".s4 h2.dontsee").classed(".hide",false).transition().duration(2000).style("opacity",1)

})()

   //Demo a map of the US without color
