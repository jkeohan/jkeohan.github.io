var models = {};

models.hello = function(word) {
  console.log("Hello", word)
}

// COLORS //
function getRandomHexColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//unfamiliar chars in js..
//http://stackoverflow.com/questions/1828455/unfamiliar-characters-used-in-javascript-encryption-script/1828469#1828469
// function getRandomHexColor() {
// "#"+((1<<24)*Math.random()|0).toString(16)
// }
//1<<24 is the same a Math.pow(2,24)

/////////////////////////////////////////////

var overlay = function(source) {
    $('#popUp').removeClass()
    $('#popUp').find('h1').html(source.title)
    $('#popUp').find('p').html(source.description)
    $('#popUp').find('.popUpAction').attr('href',source.url)
}

function apiPull (url) {      
    var results =  $.get(url)
      .fail(function(fail){
        console.log(fail);
      })
      .done(function(res){
        arr.push(res)            
      })
      .then(function(res){
         dosomething(res)
      }) 
}



Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});
  

