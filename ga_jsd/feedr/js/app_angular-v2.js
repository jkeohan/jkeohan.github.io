/*
  Please add all Javascript code to this file.
*/

var feedrApp = angular.module('feedrApp', ['ui.router', 'ngAnimate'])

//used for routing
feedrApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    // .state('/', {
    //   url:"/",
    //   templateUrl:'partials/home.html'
    // })
    // .state('/mapping', {
    //   url:"/mapping",
    //   templateUrl:"chloropleth/mapping.html"
    // })
})

function Newsfeed(url,main,title,image,rank,description,tags,link) {
  this.main = main;
  this.title = title;
  this.image = image;
  this.rank = rank;
  this.description = description;
  this.tags = tags;
  this.link = link;
  this.articles = [];
}

var Mashable = new Newsfeed('new','title','image','shares.total','content.plain','channel','link')
console.log(Mashable)

feedrApp.controller('apiCtrl', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
      $scope.activeSource = [];
      $scope.sources = {
        Mashable: {
          url: "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json",
          keys: {
            main: 'new',
            title: 'title',
            image: "image",
            rank: 'shares.total',
            description: 'content.plain',
            tags: 'channel',  
            link: 'link'
          },
          data: {
            articles: []
          }
        },
        Digg: {
          url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
          //url: 'http://digg.com/api/news/popular.json',
          keys: {
            main: 'data.feed',
            title: "content.title",
            image: "content.media.images[0].url",
            rank: "digg_score",
            description: "content.description",
            tags: 'content.tags',//'content.tags[0].name'
            link: 'content.url'
          },
          data: {
            articles: [],
          }
        },
         Reddit: {
              url: "https://www.reddit.com/top.json",
          keys: {
            articles: "new",
            image: "feature_image"
          }
        }
      }
    //used to pull the top level keys of the sources object which will be Digg,Mashable,ect..
    //The keys will then be used to create\populate source dropdown options
    $scope.sourceKeys = Object.keys($scope.sources)

    //if search is !empty show currently choosen feed
    //if search is true than filter article titles for search term
    //this will require attaching event listener to input field
    //and calling a function that filters and then renders results

    // $.get($scope.url)
    // .done(function(response) { console.log(response)})
    // .fail(function(response) {console.log(response )})

    //console.log($scope.sources.Digg)
    function buildObject () {};
    function updateSearchName(sourceName) { 
      $('.sourceName').html(sourceName)
    };
    //used to populate the overlay and executed as click event with article title
    //<a ng-click="overlay(item)" href="#"><h3>{{item.title}}</h3></a>
    $scope.overlay = function(source) {
      $('#popUp').removeClass()
      $('#popUp').find('h1').html(source.title)
      $('#popUp').find('p').html(source.description)
      $('#popUp').find('.popUpAction').attr('href',source.url)
    }

    function objPath(layer,path,value) {
      //console.log("layer: ",layer)
      //console.log("path: ",path)
      path = path.split('.');
      //console.log(path) 
      for (i=0; i < path.length; i++) {
          //console.log("layer before concatenation: ", layer)
          //console.log("path as path[i] : ", path[i])
          //console.log("layer as layer[path[i]]: ", layer[path[i]])
         layer = layer[path[i]]; 
      }
      return layer;
    };

    //createObj is called within getContent as: createObj(articles,source,mediaSourceKeys)
    //the params for createObj:
    // articles: will be the full path to the top level key of the json object. 
    // In the case of Digg this would be:  response.data.data.feed
    // another function called objPath was created to build this path as in:
    // var articles = objPath(response.data,mediaSourceKeys.main)
    //
    // source: this is passed a string of the name of the key in sources obj, such as Digg, Mashable
    // 
    // mediaSourceKeys: this is the keys key of the Digg,Mashable,ect obj
    //
    function createObj(articles,source,mediaSourceKeys){
        //var articles = objPath(response.data,mediaSourceKeys.main)//.data.feed
          $scope.activeSource = [];
          var obj = {}
          $.each(articles, function(i,e){
            obj.title = objPath(articles[i],mediaSourceKeys.title)
            if(source == "Digg") {
              obj.img = articles[i]['content']['media']['images'][0].url
            } else { 
              obj.img = objPath(articles[i],mediaSourceKeys.image) }
            obj.count = objPath(articles[i],mediaSourceKeys.rank)
            obj.description = objPath(articles[i],mediaSourceKeys.description)
            if(source == "Digg") {
              obj.tags = [articles[i]['content']['tags'][0].name]
            } else { 
              obj.tags = [objPath(articles[i],mediaSourceKeys.tags)] }
            obj.link = objPath(articles[i],mediaSourceKeys.link)
 
            $scope.sources[source].data.articles.push(obj)
            $scope.activeSource.push(obj)
            obj = {}
          })//each
    }

    $scope.getContent =  function(url,source){
      $('.loader').removeClass("hidden")
      var mediaSourceKeys = $scope.sources[source].keys
   
      $http.get(url.url)
        .then(function(response) {
          //this uses the objPath function to build the full path of response.data, which 
          //is the placeholder for the returned json pull and also the sources main key path 
          //such as in:  Digg.keys.main = data.feed
          //articles would then be: response.data.data.feed
          var articles = objPath(response.data,mediaSourceKeys.main)//.data.feed
          //console.log(articles)
          createObj(articles,source,mediaSourceKeys)
          updateSearchName(source)
        }, function(response) {
        //Second function handles error
          alert("Something went wrong");
        }).finally(function(){
          $('.loader').addClass("hidden")
          console.log($scope.activeSource)
        })//then
       
    }//function
}])

var help = models
help.hello("world")

function value(layer, path, value) {
    var i = 0,
        path = path.split('.');
  console.log(path) 
    for (; i < path.length; i++)
        if (value != null && i + 1 === path.length)
             { console.log("yes"); layer[path[i]] = value; }
        else { layer = layer[path[i]]; } 
    console.log(layer)
    return layer;
};
