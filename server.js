var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded());
app.use(session({secret: 'secretkey'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var route = require('./routes/routes.js')(app);

var server = app.listen(8000, function(){
  console.log("listening on port 8000");
})

var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){
  console.log("We are using sockets!");
  socket.on('got_a_new_user', function(data){
    console.log(data.name);
    io.emit('new_user', {new_user_name: data.name});
  })

})
