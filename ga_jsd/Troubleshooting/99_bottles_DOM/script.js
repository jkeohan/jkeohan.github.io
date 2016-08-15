$(document).ready(function(){
  //Work with students to record possible issues.  
  //Use this as an opportunity to discuss and categorize 
  //Start with asking the question:  What is the most common type of issue?
  //and keep in mind that what were doing...coding..involves typing...

  //Possible Issues:
  //Syntax errors
  //1. jQuery not loaded
  //2. id's don't exist
  //3. Using wrong methods to add update DOM
  //4. html() method not appropiate choice for appending items

  // Error Types:
  // SyntaxError
  // ReferenceError
  // TypeError


  //Code that stops execution
    //jQuery not loaded
      //ReferenceError: $ is not defined
    //Missing { after click call back
      //SyntaxError: Unexpected token for
    //Missing { after for loop
      //SyntaxError: missing ) after argument list
    //Missing { after if statement
      //SyntaxError: Unexpected token else

  //Code that allows initial page load compilation but will error when executed 
    //Missing $
      //TypeError: "#bottles".append is not a function

  //Code that allows execution with no erros but not doing what we expect
    //Nothing appears when clicking on button
      //UL with id=bottles doesn't exist
    //Only 1 LI item is created
      //using wrong jquery method()
    //LI items appear without clicking button
      //loopy() function being executed immediately on page load compilation
      //setting breakpoint on function resets breakpoint to end of .ready()


  // $("#sing-button").click(function loopy() {
  //   for(var i = 99; i>-1; i--) {
  //       if(i>1) {
  //         $('#bottles').append('<li class = "bottle">'+ i +" bottles of beer on the wall");
  //       }
  //       else if(i===1){
  //         $('#bottles').append('<li class = "bottle">'+ i +" bottle of beer on the wall");
  //       }
  //       else{
  //         $('#bottles').append('<li class = "bottle">'+ "no more bottles of beer on the wall");
  //       }
  //   }; 
  // });

  $("#sing-button").click(loopy)

  function loopy() {
    for(var i = 2; i>-1; i--) {//set breakpoint here
        if(i>1) {
          $('#bottles').append('<li class = "bottle">'+ i +" bottles of beer on the wall");
        }
        else if(i===1){
          $('#bottles').append('<li class = "bottle">'+ i +" bottle of beer on the wall");
        }
        else{
          $('#bottles').append('<li class = "bottle">'+ "no more bottles of beer on the wall");
        }
    }; 
  }


  //   function timer() {
  //     console.log("timer!")
  //   }
  //////////  BASIC /////////////////////////////////
  //   var arr = [];
  //   $("#sing-button").click(function(){
  //   for(var i = 3; i>-1; i--){
    
  //   if(i>1){
  //     arr.push('<li class = "bottle">'+ i +" bottles of beer on the wall");
  //   }
  //   else if(i===1){
  //     arr.push('<li class = "bottle">'+ i +" bottle of beer on the wall");
  //   }
  //   else{
  //     arr.push('<li class = "bottle">'+ "no more bottles of beer on the wall");
  //   }
  // }; 
  //   var counter = 0;
  //    setInterval(function() {
  //     console.log(counter)
  //     console.log(arr[counter])
  //     $('#bottles').append(arr[counter])
  //     console.log("This has run " + counter++ + "times")
  //   },1000)
  // });

    //setting debugger on .click line...
      //Step Over 3x takes me to last line.
      //step over then takes me into jquery
      //2 stop outs take me back to setInterval
    //setp over now takes me to console.log
    //Setp over onlast line take me to windows
    //2 Setp outs and back to setInterval

});
