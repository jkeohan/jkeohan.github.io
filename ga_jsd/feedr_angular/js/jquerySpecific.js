 $('.closePopUp').click(function() {
    $('#popUp').addClass('loader hidden')
    })

$('#search').find('img').click(function() {
    $('#search').toggleClass('active')
 })


  //This was replaced with using Angular's ng-click directive
  // $('.feeds').on("click", "li", function(){
   //   var val = $(this).val()
   //   console.log(val,$scope.sources[val])
   //   getContent($scope.sources[val],val)
   // })
