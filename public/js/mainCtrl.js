angular.module("myChats").controller("mainCtrl", function($scope, mainSrvc, $interval){
  $scope.test = "Chatting is the Best";

  $scope.addChat = function(chatmessage){
    mainSrvc.addChats(chatmessage).then(function(){
      getData();
      $scope.newChat.message = "";
    });
  }

  function getData(){
    mainSrvc.getChats().then(function(response){
      $scope.chats = response;

    });
  }

  $scope.deleteChats = function(){
    mainSrvc.deleteChats().then(function(){
      getData();
    });
  }

  $scope.login = function(){
    mainSrvc.login($scope.username).then(function(){
      $scope.loggedin = $scope.username;
    })
  }

  getData();

  $interval(getData, 3000);

})
