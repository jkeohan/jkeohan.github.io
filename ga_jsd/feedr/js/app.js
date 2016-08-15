/*
  Please add all Javascript code to this file.
*/

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

//var Mashable = new Newsfeed('new','title','image','shares.total','content.plain','channel','link')
//console.log(Mashable)
      var activeSource = [];
      var sources = {
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
    var mashableUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json"
    var diggUrl = 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json'

    var sites = { sites: Object.keys(sources)  }
    var activeSite = "Digg"
    function updateView(res) { 
      if(activeSite === "Digg") { 
        buildDiggObj(res)
      }
      else if(activeSite === "Mashable") {
        buildMashObj(res)
      }
    }

    var diggUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json"
    var mashUrl = "https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json"
    var currentPull = apiPull(updateView)

    handlebarsView('#navHeader',".feedSources", sites) 
    $('.feedSources').on("click", 'li a', function(event){
      var currentSite = $(this).html()
      if(currentSite == "Digg") {
        activeSite = "Digg"
        currentPull(diggUrl)
      }
      else if (currentSite == "Mashable") {
        activeSite = "Mashable"
        currentPull(mashUrl)
      }
    })

    function apiPull (func) { 
      return function(url){     
        $.get(url)
          .fail(function(fail){
            console.log(fail);
          })
          .done(function(res){
             func(res)          
          })
      }
    }

    function handlebarsView(sourceElem,destElem,data){
      console.log(data)
      var source = $(sourceElem).html();
      var template = Handlebars.compile(source);
      var createElems = $(destElem).append(template(data))
      //console.log(createElems)
    }

    function buildDiggObj(res) {
        var obj = { articles:[] }
       $.each(res.data.feed, function(index,articleObj){ 
        //console.log(articleObj)        
        obj.articles.push( { 
          "title": articleObj.content.title,
          "image": articleObj.content.media.images[0].url,
          "rank": articleObj.digg_score,
          "description": articleObj.content.description,
          "tags": articleObj.content.tags[0].name,
          "link": articleObj.content.url
         })//push
       //  //console.log(obj)
       })
       handlebarsView('#articles','#main',obj)
    }

    function buildMashObj(res) {
        var obj = { articles:[] }
       $.each(res.new, function(index,articleObj){ 
        console.log(articleObj)       
        obj.articles.push( { 
          "title": articleObj.title,
          "image": articleObj.image,
          "rank": articleObj.shares.total,
          "description": articleObj.content.plain,
          "tags": articleObj.channel,
          "link": articleObj.link
         })//push
       //  //console.log(obj)
       })
       handlebarsView('#articles','#main',obj)
    }

    
    //1. Create a higher level function called apiPull that takes in a single param which will be a function
    //   The function passed in will have the api response passed to it within the .done() method
    //2. The apiPull function will return an anonymous function that takes in a simple param which will be a url
    //   The return function will run the $.get() api call and will use the url that was passed in
    //3. Create another new function completely seprate from apiPull called updateView which will take in one
    //   param which will be the response data passed to it from within the apiPull function
    //   The updateView function will merely console.log(res)
    //4. Create a new variable called pull which will equal the apiPul function with the updateView function as it's param
    //5. Create 3 new variables for each of the news sources, such as mashPull,diggPull,ect..and have it equal
    //   to the pull method but also pass into it the url for that specific news source

