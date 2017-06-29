angular.module("myChats").service("mainSrvc", function($http){

  this.getChats = function(){
    return $http.get("/api/chats").then(
      function(response){
        return response.data;
    })
  }

  this.addChats = function(chat){
    return $http.post("/api/chats", chat)
  }

  this.deleteChats = function(){
    return $http.delete("/api/chats");
  }

  this.login = function(username){
    return $http.post("/api/login/"+username);
  }
});
