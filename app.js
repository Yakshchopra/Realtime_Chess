var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, function () {
  console.log('listening on port: ' + port);
});

var io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log('new connection');

  // Called when the client calls socket.emit('move')
  socket.on('move', function (msg) {
    socket.broadcast.emit('move', msg);
  });
});
