// also include ngRoute for all our routing needs
var searchUserApp = angular.module('searchUserApp', ['ngRoute','ngAnimate']);

// configure our routes
searchUserApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'user.html',
        controller: 'mainController'
    })

    // route for the about page
    .when('/profile/:userObject', {
        templateUrl : 'profile.html',
        controller: 'profileController'
    });
        
});

// create the controller and inject Angular's $scope
searchUserApp.controller('mainController', function($scope,$http) {
    // create a message to display in our view
    $scope.pageClass = 'page-home';
    $scope.message = 'index';
    var usersArray = new Array();
    var url = "https://api.myjson.com/bins/3y28n";
	$http.get(url).
    success(function(data, status, headers, config) {
      $scope.usersData = data.data.bst_users[0];
      $scope.users = Object.keys(data.data.bst_users[0]);
      for(var i=0;i<$scope.users.length;i++){
      	usersArray[i] = new Array();
	  	usersArray[i][0] = $scope.users[i];
	  	usersArray[i][1] = $scope.usersData[$scope.users[i]].user_logo;
	  }
	  $scope.usersArray = usersArray;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});

searchUserApp.controller('profileController', function($http,$scope,$routeParams) {
    $scope.pageClass = 'page-about';
    $scope.userName = $routeParams.userObject;
    var url = "https://api.myjson.com/bins/3y28n";
	$http.get(url).
    success(function(data, status, headers, config) {
      $scope.usersData = data.data.bst_users[0];
      $scope.profileData = $scope.usersData[$scope.userName];
      $scope.image = $scope.profileData.user_logo;
      $scope.partner_since = $scope.profileData.partner_since;
      $scope.status_now = $scope.profileData.status_now;
      $scope.year_wise_usage = $scope.profileData.year_wise_usage;
      $scope.storage_wise_usage = $scope.profileData.storage_wise_usage;
      $scope.server_wise_usage = $scope.profileData.server_wise_usage;
      $scope.total = $scope.profileData.total;
      $scope.halfOfTotal = $scope.total/2;
      $scope.percentEarn = Math.round(($scope.year_wise_usage/$scope.total)*100);
      $scope.percentBadge = $scope.percentEarn -5;
      $scope.percentStorage = Math.round(($scope.storage_wise_usage/($scope.total/2))*100);
      $scope.percentServer = Math.round(($scope.server_wise_usage/($scope.total/2))*100);
      $scope.year_calculated = $scope.profileData.year_calculated;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});