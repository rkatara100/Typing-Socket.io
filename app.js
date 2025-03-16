const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const socketio = require('socket.io');
const mongoose = require('mongoose');

const expressServer = app.listen('3001');

const io = socketio(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

mongoose.connect('mongodb://localhost:27017/typeracer')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

const Game = require('./models/gameModel');
const QuotableAPI = require('./QuotableAPI'); // Import the module

app.get('/', (req, res) => {
  res.send('hello ji');
});

io.on('connect', (socket) => {
    
  socket.on('join-game', async ({ gameID, nickName }) => {
    try {
      let game = await Game.findById(gameID);
      if (game && game.isOpen) {
        const player = { socketID: socket.id, nickName };
        game.players.push(player);
        await game.save();
        
        socket.join(gameID);
        io.to(gameID).emit('updateGame', game);
      } else {
        socket.emit('error', { message: 'Game not found or is no longer open.' });
      }
    } catch (err) {
      socket.emit('error', { message: 'Error joining game.' });
    }
  });
  

  socket.on('create-game', async (nickName) => {
    try {
      const quotableData = await QuotableAPI.getData(); // Call the correct method
      console.log(quotableData);

      let game = new Game();
      game.words = quotableData;

      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName
      };

      game.players.push(player);
      game = await game.save();

      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit('updateGame', game);

    } catch (err) {
      console.log(err);
    }
  });
});
