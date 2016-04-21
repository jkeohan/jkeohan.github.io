var d3App = angular.module('d3App', ['ui.router','ngAnimate'])

d3App.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('/', {
			url:"/",
			templateUrl:'partials/home.html'
		})
		.state('/mapping', {
			url:"/mapping",
			templateUrl:"chloropleth/mapping.html"
		})
		.state('circles', {
			url:"/circles",
			templateUrl:"circles/circles.html"
		})
		.state('present', {
			url:"/present",
			templateUrl:"demo/present.html"
		})
})

// myApp.config(function($stateProvider, $urlRouterProvider) {
// 	$urlRouterProvider.otherwise('/');
// 	$stateProvider//this is a service
// 		.state('/', {
// 			url:"/",
// 			templateUrl:"partials/home.html"
// 		})
// 		.state('home', {
// 			url:"/home",
// 			templateUrl:"partials/home.html"
// 		})
// 		.state('meal', {
// 			url:'/meal',
// 			templateUrl: 'partials/meal.html',
// 			controller: 'mealCtrl'
// 		})
// 		.state('earnings', {
// 			url:'/earnings',
// 			templateUrl: 'partials/earnings.html',
// 			controller: 'earningsCtrl'
// 		})
// 		.state('error', {
// 			url:'/error',
// 			templateUrl: 'partials/error.html'
// 		})
// })
