ERROR: Uncaught TypeError: Cannot read property 'points' of undefined.
Call Stack
meteores  @ VM42664:107
func1 @ VM42665:10
myFunction  @ VM42665:51

I think this has to do with myFunction being run before the custom lib has been loaded. 

The only happens when I call d3.models outside of .await.  Tried loading 
<script src="demo/d3.resuseable.maps.js"></script> in multiple places but 

RESOLUTION: defining var points = d3.models.points() as the top of the script worked

ISSUE: tried to filter NYC as below but this prevented the circle form expanding it's radius when it's first created
   d3.transition().delay(3200)
      .each("end",function(d,i){ meteores(cities.filter(function(d,i){ return d.city == "NYC"}))
POSSIBLE CAUSES: 1) time it takes to run the filter with the param might be the time dedicated to expanding the stroke-width

ISSUE: GA Location circle text off center right
CAUSE: Defining font-size:0 as intial state before transition.  It seems that it's postion changes once it grows in size 

ISSUE: TypeError: Cannot read property 'features' of undefined when trying to load gadata.json 
RESOLUTION: Moved this into it's own d3_queue

ISSUE: SyntaxError: Unexpected token / in JSON at position 163(…). Using d3_queue to pull in gsdata.json using [{}] as format in file
RESOLUTION: Removed // used for comments

ISSUE: Using d3.json to pull gsdata.json returns null
RESOLUTION: Not sure what I did but after several rounds of testing it works using both d3.json and d3_queue.queue()


