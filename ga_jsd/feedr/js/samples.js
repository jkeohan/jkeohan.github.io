  function dosomething(res) { console.log("inside dosomething",arr)}
    var arr = []
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
  apiPull(mashableUrl)
