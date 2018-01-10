require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./routes');
const db = require('./SQL/db');
const { users, events, posts, comments } = require('./SQL/models');
const app = express();


//creates an http server and serving app
const server = require('http').createServer(app);
//creates an instance of socketio and serving server so it can bind to it
const io = require('socket.io')(server);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/public')));

// serves up the index.html on any page refreshes to the react routes.
app.get('/userprofile', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})
app.get('/userpage', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})

//
app.get('/eventprofile', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})

app.get('/createEvent', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})

app.get('/editEvent', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'))
})

app.use('/events', router);
app.use('/users', router);
app.use('/posts', router);
app.use('/comments', router);

//listens for a connection with a callback with a socket
io.on('connection', (socket) => {
  //the socket will listen for ?? from the client
  // this.socket.on('post', )


  console.log('Socket io connection');
})

//must do server.listen for our sockets to work
//if you do app.listen, everything will still work, but the
//sockets won't!!!
server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});