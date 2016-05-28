(function() {
   var width = 650;
      var height = 400;
   var map;

      var cb = colorbrewer;
     // console.log(cb)

      var domainRange = [100, 1000, 10000, 100000, 1000000, 10000000]
      var colorRange  = cb.Greens[6]

      var color = d3.scale.linear().domain(domainRange).range(colorRange)

      var projection = d3.geo.albersUsa()
                   //.center([ 0, 40])//not used in albersUsa projection
                   //.translate([ width/2 - 50, height/2]) //moving left or right
                   //.scale([ 650 ]);
                   .scale([1])//scale will change based on bounding box
                   .translate([0,0])//translate will change base don bounding box

      //Define path generator
      var path = d3.geo.path() 
               .projection(projection);

      //Define columns headers for table, class name and and return function for html  
      var columns = [
      { head: 'State', cl: 'title',
        html: function(row) { return row.properties.name; } },
      { head: 'Value', cl: 'center',
        html: function(row) { return row.properties.value; } }
      ];

      var rate = []
      var rateById = d3.map()
      //D3.QUEUE is being used instead of nested d3.json('file',function(){})
      d3_queue.queue()
        .defer(d3.json,"../D3/data/geojson/usa.json")
        .defer(d3.json,"../D3/data/states.json")
        //await is a promise that will run once the previous data has been retrieved
        .await(function(error,us,states) { 
           var obj = {};
           //creating new property in us.json to include values from states.json
           states.forEach(function(d, i) {
              us.features.forEach(function(e, j) {
                  if (d.state === e.properties.name) {                  
                      e.properties.value = d.value
                      obj["title"] = e.properties.name
                      obj["postal"] = e.properties.postal
                      obj["contributed"] = e.properties.value
                      rate.push(obj)
                      obj = {}
                  }
              })
            })//forEach
            var max = d3.max(states.map(function(d) { return +d.value }))
            var extent = d3.extent(states.map(function(d) { return +d.value }))
            var mean = d3.mean(states, function(d) { return d.value})
            var allVals = states.reduce(function(p,c) { if(p.indexOf(c) < 0 ) { p.push(c["value"]) }  return p },[]).sort(d3.descending)
           // console.log(max)
            //console.log(extent)
            var obj = {}
            //states.reduce(function(p,c) { if(p.indexOf(c["value"]) < 0 ) { obj[c["value"]=0 ] }

            //},[])
            console.log(mean)
            //debugger;


          render(error,us)
          renderTable(rate.sort(function(a,b) {return b.contributed - a.contributed }) )
          //console.log(rate)       
        })//await



      function render(error,geo) {
       // console.log(geo)

       var b = path.bounds(geo)
       console.log(b)
       var s = .95/Math.max( (b[1][0] - b[0][0])/width,(b[1][1] - b[0][1])/height );
       console.log((b[1][0] - b[0][0])/width, (b[1][1] - b[0][1])/height)
       console.log(s)
       var t = [(width - s * (b[1][0] + b[0][0]))/2, (height - s * (b[1][1] + b[0][1]))/2];
       projection.scale(s).translate(t)
       //debugger

       svg = d3.select(".linear-scale").append("svg")
        .attr("width",width).attr("height",height)

      map = svg.append('g').attr("class",'boundary')

      map.selectAll('path')
                .data(geo.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr("class", function(d) { 
                  //console.log(d)
                  return "state " + d.properties.postal})
                .style("fill",function(d) {return color(d.properties.value)})

    //       var zoomed = function() { 
    //   console.log("zooomed")
    //   map.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
    // }

    // var zoom = d3.behavior.zoom()
    //   .scaleExtent([1,8])
    //   .on("zoom", zoomed)
    //   .size([width,height])


    // map.call(zoom)
    // map.on('click',function() { console.log("clicked")})
    // svg.append('rect')
    //   .attr('width',width)
    //   .attr("height",height)
    //   .attr("class",'overlay')
    //   .call(zoom)


        addLegend(map,color)
    }



       function addLegend(sel,color) {

          //console.log(color.scale.range())
           var legendHolder = sel.append('g').attr("transform","translate("+ (width-100) + ",250)")
           var legend = legendHolder.selectAll("g.legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")

            var ls_w = 20, ls_h = 20;

            legend.append("rect")
            .attr("x", 20)
            .attr("y", function(d, i){ return i * 20 } )
            .attr("width", ls_w)
            .attr("height", ls_h)
            .style("fill", function(d, i) { return color(d) })
            .style("opacity", 0.8);

            legend.append("text")
            .attr("x", 50)
            .attr("y", function(d, i){ return i * 20 + 20  })
            .attr("dy",-5)
            .text(function(d, i){ 
              //return d
              return "$" + d3.format('.2s')(d) 
            })
            .style("font-size","10px")
              //return d3.format('s')(domainRange[i]); });
       }
function renderTable(data) {
  console.log(data)
    //USING JETPACK ƒ symbol is made using alt + f on MAC
    var columns2 = [
        { head: 'State',html: ƒ('title'),cl:'tr-state' } ,
        { head: 'Contributed', html: ƒ('contributed',d3.format('$,.2s')),cl:'tr-budget' }
    ]

    // create table
    var table = d3.select('.linear-scale')
        .append('table')
        .attr("class","scroll");

    // create table header
    table.append('thead').append('tr')
        .selectAll('th')
        .data(columns2).enter()
        .append('th')
        .attr('class', ƒ('cl'))
        .text(ƒ('head'));

    // create table body
    table.append('tbody')
        .selectAll('tr')
        .data(data).enter()
        .append('tr')
        .style("background-color", function(d) {return color(d.contributed)})
        .style("opacity",1)
        .attr("class",function(d) {
          return "state-table " + d.postal})
        .on("mouseover",function(d) { highlightOn(d) } )
        .on("mouseout",function(d) { highlightOff(d) } )
        .selectAll('td')
        .data(function(row, i) {
            return columns2.map(function(c) {
                // compute cell values for this specific row
                var cell = {};
                d3.keys(c).forEach(function(k) {
                    cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
                });
                //console.log(cell)
                return cell;
            });
        }).enter()
        .append('td')
        .html(ƒ('html'))

    function length() {
        var fmt = d3.format('02d');
        return function(l) { return Math.floor(l / 60) + ':' + fmt(l % 60) + ''; };
    }
}

  function highlightOn(item) {
    var state = item.postal
    var mapStates = d3.selectAll(".state").style("opacity", .3)
    var currentMap = mapStates.filter("."+state).style("opacity",1).style("stroke","black")

    var tableStates = d3.selectAll(".state-table ").style("opacity", .3)
    var currentRow = tableStates.filter("."+state).style("opacity",1)

  }
  function highlightOff(item) {
    var mapStates = d3.selectAll(".state").style("opacity", 1).style("stroke","none")

    var tableStates = d3.selectAll(".state-table").style("opacity", 1)
  }


})()

