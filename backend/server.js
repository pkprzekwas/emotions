
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;
var router = express.Router();


streamCache = [];

app.use('/api', router);
app.use(express.static('public'))

app.get('/cache', function (req, res) {
    res.json(JSON.stringify(streamCache))
});

http.listen(port);
console.log('App working on port: ' + port);


// Socket.io Events

io.on('connection', (socket) => {
    console.log('New socket connection');
    streamCache = [];
    socket.on('emotion-stream', (data) => {
        streamCache.push(data)
    });

    socket.on('end-stream', function(data){
        console.log("data: ", data);
    });
});

