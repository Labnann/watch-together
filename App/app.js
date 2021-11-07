const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server: SocketServer } = require('socket.io');
const io = new SocketServer(server);


const start = () => {
    app.listen(8033, () => {
        console.log("Listening to 8033");
    });



    app.get("/", (request, response) => {
        response.send("Hello World");
    });


}

module.exports = {
    start
}

