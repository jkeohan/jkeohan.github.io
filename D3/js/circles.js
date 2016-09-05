//Create circles and describe base properties

//Add color 

//Add stroke/stroke-width

//Redraw them with varying radii

//

//EFFECTS

//On Enter
//1. Stagger the circles
//2. Drop them into place like map with circles on https://quizlet.com/
//3  Have them start on left and reposition

//TRANSITIONS


//Mouseover
//1. Expand circle\stroke as per chart1 in renewable energy
//2. Expand circle\stroke as per jdfiddle ?
//3. Expand circle to fade out completely
//4. Add tooltip 


//Elaborate on colors
//1. Overview of how colors can convey meaning
//2  Demo possible variations of colors
//2. Add scale to assign colors

//Images in circles
//1. (EM) Chap ?...circles

//Story line
//Once there was a circle...As with all circles one dy he wasn't here and then..he was...
//He explored his new wolrd...going forward and backward
//Going up and down...
//Sometimes he even jupmed into the sky and flew around like superman...
//Othertimes he just layed back and looked at the stars and dreamed
//After sometime he felf lenely...and sad...wishing he had a someone to play with..
//And so the gods being kind and generous decided to not only send him one friend...but two
var canvas = canvasSize(".circledemo1")
var w = canvas[0];
//var h = canvas[1]
var h = 100;
var data = [1,2,3]

var cd1 = d3.select('.circledemo1').append('svg').attr({width:w, height:h})
var cd1circles = cd1.selectAll(".circledemo1").data(data)
cd1circles.enter().append("circle")
	.attr("cx", function(d,i) { return i * 50 + 30})
	.attr("cy", 50)
	.attr("r", 5)


var color = d3.scale.category20()
var cd2 = d3.select('.circledemo2').append('svg').attr({width:w, height:h})
var cd2circles = cd2.selectAll(".circledemo2").data(data)
cd2circles.enter().append("circle")
	.attr("cx", function(d,i) { return i * 50 + 30})
	.attr("cy", 50)
	.attr("r", 20)
	.attr("fill", color)

var cd3 = d3.select('.circledemo3').append('svg').attr({width:w, height:h})
var cd3circles = cd3.selectAll(".circledemo3").data(data)
cd3circles.enter().append("circle")
	.attr("cx", function(d,i) { return i * 50 + 30})
	.attr("cy", 50)
	.attr("r", 15)
	.attr("fill", color)
	.attr("stroke", "rgba(230,230,230, .5)")
	.attr("stroke-width", 20)

var cd5 = d3.select('.circledemo5').append('svg').attr({width:w, height:h})
var cd5circles = cd5.selectAll(".circledemo5").data(data)
cd5circles.enter().append("circle").attr("class","circledemo5")
function initcircleDemo5() {
	cd5circles
	.attr("cx", function(d,i) { return i * 50 + 30})
	.attr("cy", 50)
	.attr("fill", color)
	.attr("r",0)
	.transition().delay(function(d,i) { return i / data.length * 2000})
	.attr("r", 5)
}
initcircleDemo5()
d3.select(".cd5").on('click',function() { initcircleDemo5() })

var cd6 = d3.select('.circledemo6').append('svg').attr({width:w, height:h})
var cd6circles = cd6.selectAll(".circledemo6").data(data)
cd6circles.enter().append("circle")
function initcircleDemo6() {
	cd6circles
		.attr("cx",-10)
	.attr("cy", 50)
	.attr("fill", color)
	.attr("r",5)
	.transition().delay(function(d,i) { return i / data.length * 2000})
	 .attr("cx", function(d,i) { return i * 50 + 30})
}

initcircleDemo6()
d3.select(".cd6").on('click',function() { initcircleDemo6() })

var cd7 = d3.select('.circledemo7').append('svg').attr({width:w, height:h})
var cd7circles = cd7.selectAll(".circledemo7").data(data)
cd7circles.enter().append("circle")
function initcircleDemo7() {
	cd7circles
		.attr("cx", function(d,i) { return i * 50 + 30})
		.attr("cy", -10)
		.attr("fill", color)
		.attr("r",0)
		.transition().delay(function(d,i) { return i / data.length * 2000})
		.transition().duration(1000)
		.attr("cy", 50)
		.attr("r",5)
}
initcircleDemo7()
d3.select('.cd7').on('click', function() { initcircleDemo7() })

var cd8 = d3.select('.circledemo8').append('svg').attr({width:w, height:h})
var cd8circles = cd8.selectAll(".circledemo8").data(data)
cd8circles.enter().append("circle")
function initcircleDemo8() {
	cd8circles
		.attr("cx", function(d,i) { return i * 50 + 30})
		.attr("cy", 50)
		.attr("fill", color)
		.attr("r",20)
		.attr("stroke", "rgba(230,230,230, .8)")
		.attr("stroke-width",1)
		.transition().delay(function(d,i) { return i / data.length * 2000})
		.transition().duration(1000)
		.ease("bounce")
		.attr("r",8)
		.attr("stroke-width",6)
}
initcircleDemo8()
d3.select('.cd8').on("click", function() { initcircleDemo8() })

var cd9 = d3.select('.circledemo9').append('svg').attr({width:w, height:h})
var cd9circles = cd9.selectAll(".circledemo8").data(data)
cd9circles.enter().append("circle")
function initcircleDemo9() {
	cd9circles
		 .attr("cx", function(d,i) { return i * 50 + 30})
	   .attr("cy", 50)
	   .attr("fill-opacity",0)
		 .attr("stroke-width",0)
		 .attr("fill","#d4ee80")
		.transition().delay(function(d,i) { 
		  return i / data.length * 2000})	
		  .attr("r",15)
		.transition().duration(500)
		  .attr("stroke", "#59b318")
		  .attr("fill-opacity",1)
		  .attr("fill","#59b318")
		  .attr("r",1)
		  .attr("stroke-opacity",.8)
		.transition().duration(1000)
      .ease(Math.sqrt)
		  .attr("r",5)
			.attr("stroke-width",1)
      .attr("stroke-opacity", 1e-6)
}
initcircleDemo9()
d3.select('.cd9').on("click", function() { initcircleDemo9() })


var cd10 = d3.select('.circledemo10').append('svg').attr({width:w, height:h})
var cd10circlesa = cd10.selectAll(".circledemo10a").data(data)
var cd10circlesb = cd10.selectAll(".circledemo10b").data(data)

cd10circlesa.enter().append("circle")
cd10circlesb.enter().append("circle")
function initcircleDemo10() {
	cd10circlesa
		.attr("cx", function(d,i) { return i * 50 + 40})
				.attr("cy", 50)
		  //.style("stroke-width",0)
		  .attr("fill","#d4ee80")
		  .attr("class","circledemo10a")
		.transition().delay(function(d,i) { 
		  return i / data.length * 2000})	
		  .attr("r",15)

cd10circlesb
	//.transition().delay(1000)
		.attr("cx", function(d,i) { return i * 50 + 40})
		.attr("cy", 50)
		.attr("fill","white")
		.attr("fill-opacity",0)
		.attr("r",15)
		.attr("class","circledemo10b")
		.attr("stroke","white")
	.transition().delay(function(d,i) { return i/data.length * 2000 }).duration(1000)
		.attr("stroke","#d4ee80")
		.attr("stroke-width",3)
		.attr("r",20)
}
initcircleDemo10()
d3.select('.cd10').on("click", function() { initcircleDemo10() })
	//.attr("stroke",)
// cd1circles.enter().append("circle")
// 		.attr("cx",0)
// 	   // .attr("r", function(d,i) { return d * 5.84 } )
// 	  .attr("r",0)
// 	  .attr("cy", function(d,i) { return 20} )
// 	  .attr("class","circledemo1")
// 	  .attr("fill","blue")
// 	  .attr("stroke","green")
// 	  .attr("stroke-width",3)
// 	 .transition()
//     .delay(function(d, i) { return i / data.length * 2000; })
//     .attr("r", 5)
//     .attr("cx", function(d,i) { return d * 50 + 30})

// circles.enter().append("circle")
// 		.attr("cx",0)
// 	   // .attr("r", function(d,i) { return d * 5.84 } )
// 	  .attr("r",0)
// 	  .attr("cy", function(d,i) { return 20} )
// 	  .attr("class","circledemo1")
// 	  .attr("fill","blue")
// 	  .attr("stroke","green")
// 	  .attr("stroke-width",3)
// 	 .transition()
//     .delay(function(d, i) { return i / data.length * 2000; })
//     .attr("r", 5)
//     .attr("cx", function(d,i) { return d * 50 + 30})

	// .each(function(d,i) {
	// 	//console.log(d)
	// 	d3.select(this).transition().attr("cx",0)
	// 	.transition().duration(500)
	// 		.attr("cx", function(d,i) { console.log(d); return d * 50 + 30})
	// })

// d3.select("#circles").transition()
//     .delay(750)
//     .each("start", function() { 
//     	console.log(this)
//     	d3.select(this).style("background-color", "green"); })
//     .transition().duration(1000)
//     .style("background-color", "red");

 // d3.select("#circles").transition().duration(1000)
 //    .styleTween("background-color", function() { return d3.interpolate("green", "red"); });



//     .transition()
//     .duration(2500)
//     .delay(function(d) { return d * 40; })
//     .each(slide);

// function slide() {
//   var circle = d3.select(this);
//   (function repeat() {
//     circle = circle.transition()
//         .attr("cx", width)
//       .transition()
//         .attr("cx", 0)
//         .each("end", repeat);
//   })()
// }

//http://bl.ocks.org/mbostock/1125997

//http://www.visualcinnamon.com/2015/05/gooey-effect.html

//http://www.jeromecukier.net/blog/2012/07/16/animations-and-transitions/

//http://jsfiddle.net/TheMcMurder/H3HTe/

//http://www.astrobiased.com/2013/04/01/legacy10/

//https://bost.ocks.org/mike/transition/

// function lcobo(arr) {
// 	var data = [];
// 	function lc(i) {
// 		if( i < arr.length ) {
// 			data.push(arr[i]);
// 			d3.setTimeout(function() {render(data); lc(i + 1);}, 0);
// 		}
// 	}
// 	lc(0)
// }

// function render(data) {
// var circles = svg.selectAll("circles-demo").data(data)

// circles.enter().append("circle")
//   .attr({
//     cx: function(d,i) { return i * 50 + 30}, 
//     cy: function(d,i) { return i * 35 + 24},
//     r: function(d,i) { return d * 5.84 }
//   })
//   .attr("class","circles-demo")
//   .attr("fill","blue")
//   .attr("stroke","green")
//   .attr("stroke-width",3)

// }
	function canvasSize(target) { 
					var height = parseFloat(d3.select(target).node().clientHeight)
					var width = parseFloat(d3.select(target).node().clientWidth)
					return [width]
				}//canvasSize







// .map .sessions .session .blip {
//     background: #f4f0ea;
//     border-radius: 10px;
//     box-shadow: 0 0 0 4px rgba(255,255,255,0.3),0 0 0 1px #000;
//     opacity: 1;
//     -ms-filter: none;
//     filter: none;
//     position: absolute;
//     height: 8px;
//     width: 8px;
