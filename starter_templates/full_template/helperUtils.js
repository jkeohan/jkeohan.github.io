//remove duplicates example 1
function removeDuplicatesUniqueMethod (arr) {
  return arr.reduce(function(newArr,elem) {
    if(newArr.indexOf(elem) < 0 ) {
      newArr.push(elem)
    }
    return newArr
  },[])
}

//remove duplicates example 2
function removeDuplicatesFilterMethod(arr) {
  return arr.filter(function(item,index){
    return arr.indexOf(item) != index
  })
}

//D3 SPECIFIC
//Method1
//d3.set(us.features.map(function(d) { return d.properties.region } )).values()
//Method2
// var data = us.features
// d3.keys(d3.nest().key(function(d) { return d.properties.region } ).map(data))

///////////  COLORS ////////////////
function getRandomColor1() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  var random = function() { return Math.floor(Math.random()*16) }
  for(i=0;i<6;i++) { color += letters[random()]}
  return color
}

function getRandeomColor2() {
  return "#" + ((1<<24) * Math.random() | 0).toString(16)
}

function rgbToHex(rgb) {
  var a = rgb.split("(")[1].split(")")[0].split(",");
  return "#" + a.map(function(x) {
    x = parseInt(x).toString(16);
    return (x.length == 1) ? "0"+x : x;
  }).join("");
}

