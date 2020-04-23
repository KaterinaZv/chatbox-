import express from 'express';
import serverHTTP from 'http';
import io from 'socket.io';
import path from 'path';

const app = express();
const server = serverHTTP.createServer(app);
server.listen(3000);

app.use(express.static(path.join(__dirname, './public')));

const socketServer = io.listen(server);

socketServer.on('connection', (socket) => {
    socket.broadcast.emit('showMessage', { name: 'Anonymous', message: 'A NEW USER HAS JOINED' });

    socket.on('sendMessage', (message) => socketServer.emit('showMessage', message));
});
