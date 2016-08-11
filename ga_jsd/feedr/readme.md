## Project Overview

This is a breakdown of the top level functionality for building the Feedr application.

* Our reader will pull feeds from various API's such as Mashable, Reddit & Digg

* The user will be able to filter the feeds via a dropdown

* The user will be able to filter the current feeds using search terms

* Clicking an article will render a modal with more info

## Additional Libraries

## JSON Data Keys

## jQuery Functional Requirements

## Additional Functionality

### Toggle Spinning Gif While Retrieving JSON
Originally configured loading gif using the following which was placed inside the $http.get().then() promise:
```javascript
 $('.loader').removeClass("hidden")
 //code to build and populate object which ng-repeat uses to create the articles
  setTimeout(function() { $('.loader').addClass("hidden") },3000)
```

The above code was only a temporary solution to simulate waiting for the data but a better approach would be to add .finally(function(){}) and add remove the loader from there as per this [stackoverflow](http://stackoverflow.com/questions/15033195/showing-spinner-gif-during-http-request-in-angular)

### Accessing string dot notation into an object reference
[](http://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference)

### Infinite Scolling
Here are a list of possible solutions to implement infinite scolling:
* [jQuery Infinite Scolling](https://www.sitepoint.com/jquery-infinite-scrolling-demos/)
* [Infinite Scrolling Through Images](http://codepen.io/SitePoint/full/NxZKPR/) working solution via codepen

### Combining Two JS Objects

In order to create one giant object for all the Feedr JSON sources I decided to merge them all into one object. Research led me to this site ["Merge-Two-JS-Objects"](https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/)

## Change Log

## Issues and Resolutions

This section will contain a list of all issues encountered and their resolution
**ERROR**: angular.js:13920 Error: [ngRepeat:dupes] Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: tag in item.tags, Duplicate key: 

**RESOLUTION**: this issue is specifc to angular, specifically ng-repeat. This has been resolved in the past by adding $track by index after ng-repear="item in itmes", however additional issues arose due to that face that Digg contained the tags within an object with a name key, while Mashable had only one tag per article. I decided to add if\else statements to create a specfic path depending on source = Digg or Mashable.  And for Digg I only chose the first item and not all tags.

**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object

**ERROR**:  app.js:55 Uncaught SyntaxError: Unexpected identifier $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json"            
**RESOLUTION**: Missing closing } after both the Digg and Reddit sources sub objects

ERROR: angular.js:68 Uncaught Error: [$injector:modulerr] Failed to instantiate module feedrApp due to: Error: [$injector:nomod] Module 'feedrApp' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.

RESOLUTION: Missing closing { 

ERROR: app.js:77 Uncaught TypeError: Cannot read property 'keys' of undefined

RESOLUTION: Mispelled Dig..should be Digg

ERROR: console.log(response + ".data") outputs [object Object].data  

RESOLUTION: console.log is converting response into a string and outputing it's object type

ERROR: GET http://localhost:8080/%7B%7Bitem.img%7D%7D 404 (Not Found)

RESOLUTION: Updated src tag for images to be ng-src.  This causes angular to wait and populate
that element once the data has been retrieved

LOGIC ISSUES

ISSUE: clicking on X closes popup, displays article page but then updates pages to article url

RESOLUTION: reconfigured jquery from $('#popUp').find('a') to $('#popUp').find('.popUpAction').attr('href',source.url)

ISSUE: 

