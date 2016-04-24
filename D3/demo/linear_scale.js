(function() {
   var width = 650;
      var height = 400;

      var cb = colorbrewer;
     // console.log(cb)

      var domainRange = [100, 1000, 10000, 100000, 1000000, 10000000]
      var colorRange  = cb.Greens[6]

      var color = d3.scale.linear().domain(domainRange).range(colorRange)

      var projection = d3.geo.albersUsa()
                   //.center([ 0, 40])
                   .translate([ width/2 - 50, height/2]) //moving left or right
                   .scale([ 650 ]);

      //Define path generator
      var path = d3.geo.path() 
               .projection(projection);

    var columns = [
    { head: 'State', cl: 'title',
      html: function(row) { return row.properties.name; } },
    { head: 'Value', cl: 'center',
      html: function(row) { return row.properties.value; } }
    ];

      var rate = []
      var rateById = d3.map()
      d3_queue.queue()
        .defer(d3.json,"../D3/data/geojson/usa.json")
        .defer(d3.json,"../D3/data/states.json")
        .await(function(error,us,states) { 
           var obj = {};
           states.forEach(function(d, i) {
              us.features.forEach(function(e, j) {
                  if (d.state === e.properties.name) {                  
                      e.properties.value = d.value
                      obj["title"] = e.properties.name
                      obj["contributed"] = e.properties.value
                      rate.push(obj)
                      obj = {}
                  }
              })
            })//forEach
            var max = d3.max(states.map(function(d) { return +d.value }))
            var extent = d3.extent(states.map(function(d) { return +d.value }))
           // console.log(max)
            //console.log(extent)

          render(error,us)
          renderTable(rate.sort(function(a,b) {return b.contributed - a.contributed }) )
          //console.log(rate)       
        })//await



      function render(error,geo) {
       // console.log(geo)

       svg = d3.select(".linear-scale").append("svg")
        .attr("width",width).attr("height",height)

          svg.selectAll('path')
                .data(geo.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr("class", function(d) { 

                  return "state " + d.properties.name.replace(' ','_')}) // just replacing space with _
                .style("fill",function(d) {return color(d.properties.value)})

        addLegend(svg,color)
       }


       function addLegend(sel,color) {

          //console.log(color.scale.range())
           var legendHolder = sel.append('g').attr("transform","translate("+ (width-100) + ",100)")
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
          return "state-table " + d.title})
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
  var state = item.title
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

