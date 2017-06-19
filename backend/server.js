var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var winston = require('winston');

var routes = require("./api/routes")

var port = process.env.PORT || 8080;
var router = express.Router();


streamCache = [];

app.use('/api', router);
app.use(express.static('public'))

routes.init(router);

http.listen(port);
console.log('App working on port: ' + port);


// Socket.io Events

io.on('connection', (socket) => {
    console.log('New socket connection');
    socket.on("new-stream", id => {
        console.log("neeww")
        let logger = new winston.Logger({
            level: 'info',
            transports: [
                new (winston.transports.File)({
                    json: true,
                    filename: "./streams/" + id + ".log",
                }),
            ]
        });

        socket.on('emotion-stream', data => {
            logger.info(data)
        });

        socket.on('end-stream', function (data) {
            console.log("data: ", data);
        });
    });
});

