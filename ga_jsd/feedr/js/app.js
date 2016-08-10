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

feedrApp.controller('apiCtrl', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
      $scope.test = [];
      $scope.sources = {};
      $scope.sourceKeys; 
      $scope.activeSource = [];
      var url = "http://digg.com/api/news/popular.json"

      $scope.sources = {
        Mashable: {
          url: "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json",
          keys: {
            articles: 'news',
            title: 'title',
            image: "feature_image",
            rank: 'shares.total',
            tag: 'channel',
            description: 'content',
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
            articles: [],
            content: 'content',
            title: "title",
            image: "['media']['images'][0][url]",
            rank: "diggs.count",
            description: "description"
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

    $scope.sourceKeys = Object.keys($scope.sources)
    //console.log($scope.sourceKeys)
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
    // this 
    $scope.overlay = function(source) {
      $('#popUp').removeClass()
      $('#popUp').find('h1').html(source.title)
      $('#popUp').find('p').html(source.description)
      $('#popUp').find('.popUpAction').attr('href',source.url)
    }

    $scope.getContent =  function(url,source){
      console.log(source)
      $scope.source = source;
       $('.loader').removeClass("hidden")
      var mediaSource = $scope.sources[source]
      console.log(mediaSource)

      $http.get(url.url)
        .then(function(response) {
         
        //console.log(response.data.data.feed)
          $scope.test = response.data.data.feed
          var articles = response.data.data.feed
          var obj = {}
          $.each(articles, function(i,e){

            obj.title = articles[i].content.title
            //obj.img = articles[i][mediaSource][image]
            obj.img = articles[i]['content']['media']['images'][0].url
            obj.description = articles[i].content.description
            obj.url = articles[i].content.url
            obj.count = articles[i].diggs.count
            obj.tags = articles[i].content.tags
            $scope.sources[source].data.articles.push(obj)
            $scope.activeSource.push(obj)
            obj = {}
          })//each

        console.log("$scope.....", $scope.activeSource[0].title)
        //setTimeout(function() { $('.loader').addClass("hidden") },3000)
          updateSearchName(source)
        }, function(response) {
        //Second function handles error
          alert("Something went wrong");
        }).finally(function(){
          $('.loader').addClass("hidden")
        })//then

        //this doesn't work while inside the controller
        //opted to use ng-click
        // $('.feeds').on("click", "li", function(){
        //     var val = $(this).val()
        //    console.log(val,$scope.sources[val])
        //   getContent($scope.sources[val],val)
        // })
       
    }//function
}])

var help = models
help.hello("world")

  
