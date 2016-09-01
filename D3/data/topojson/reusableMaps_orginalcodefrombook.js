var d3Edge = {};

d3Edge.dataManager = function module () { 

	var exports = {}
	var dispatch = d3.dispatch("geoReady","dataLoading","dataReady")
	var data;

	exports.loadCsvData = function (_file,_cleaningFunc) {

		var loadCsv = d3.csv(_file)
		loadCsv.on("progress", function() { dispatch.dataLoading(d3.event.loaded)})

		loadCsv.get(function(_err,_response) {
			_response.forEach(function(d) {
				_cleaningFunc(d)
			})
			data = _response
			dispatch.dataReady(_response)
		})
	}

	exports.getCleanData = function () { return data }

	exports.loadTopoJson = function(_file,_callback) {
		d3.json(_file, function(_err,_data) { 
			_callback(_data)
		})
	}//loadTopoJson

	d3.rebind(exports,dispatch,"on")
	return exports
}//datamanager

d3Edge.map = function module () {

	 var dispatch = d3.dispatch('hover', 'stopsEnd', 'routesEnd', 'brushing'),
    projection, path, t, s, svg, center, scale, size, brush;

    var exports = function (_selection) {
    	svg = svg || _selection

    	svg.datum([])

    	projection = projection || d3.geo.mercator()
    		.scale(scale).center(center).translate([size[0]/, size[1]/2])
    
    	path = path || d3.geo.path().projection(projection)
    }
    exports.scale = function(_scale) {
    	if (!arguments.length) return scale;
    	scale = _scale
    	return this
    }
    exports.size = function(_size) {
    	if(!agruments.length) return size;
    	size = _size;
    	return this
    }
    exports.center = function(_center) {
    	if(!arguments.length) return center;
    	center = _center
    	return this;
    }

    exports.drawMap = function(_data) {
    	svg.append("path").attr("class","country")
    	.data(topojson.object(_data, topo.object.countries))
    	.attr('d', function(d) { return path(d) })
    	dispatch.mapEnd()
    }

    dispatch.rebind(exports,dispatch,"on")
    return exports
}

var width = 570;
var height = 500;

var worldDataManager = d3Edge.dataManager()


var worldMap = d3Edge.map()
  .center([8.5390, 47.3687])
  .scale(900000)
  .size([width, height]);

worldDatamanager.loadTopoJson("../data/countries.topo.json",world.drawMap)

var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(wolrdMap)










