var models = {};

models.hello = function(word) {
  console.log("Hello", word)
}


var overlay = function(source) {
    $('#popUp').removeClass()
    $('#popUp').find('h1').html(source.title)
    $('#popUp').find('p').html(source.description)
    $('#popUp').find('.popUpAction').attr('href',source.url)
}


