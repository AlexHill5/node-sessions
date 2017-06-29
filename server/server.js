var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var port = 3000;
var config = require('./config');

var loggedInUser;
var chats = [];

app.use(express.static(__dirname+'/../public'));
app.use(bodyParser.json());
app.use(expressSession({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7*24*60*60*1000, secure:false }
}))
// app.use(cookieParser());

app.post("/api/login/:username", function(req, res){
  // res.cookie('myCookie', req.params.username, {maxAge:900000});
  req.session.username = req.params.username;
  res.sendStatus(200);
})

app.get("/api/chats", function(res,res){
  res.send(chats);
})

app.post("/api/chats", function(req,res){
  req.body.createdAt = new Date();
  // req.body.username=req.cookies.myCookie;
  req.body.username = req.session.username;
  chats.push(req.body);
  while (chats.length>50){
    chats.shift();
  }
  res.sendStatus(200);
})

app.delete("/api/chats", function(req, res){
  chats = [];
  // console.log("Communications Terminated");
  res.sendStatus(200);
})

app.listen(port, function(){
  console.log("Listeing on port ", port);
});
