require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const Game = require('./models/gameModel');
const QuotableAPI = require('./QuotableAPI');
const app = express();
app.use(cors());

const expressServer = app.listen(3001);

const io = socketio(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

mongoose.connect(process.env.MONGO_URI||3001)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });


app.get('/', (req, res) => {
  res.send('hello ji');
});



io.on('connect', (socket) => {


  socket.on('userInput', async ({ userInput, gameID }) => {
    try {
      let game = await Game.findById(gameID);
      if (!game.isOpen && !game.isOver) {
        let player = game.players.find(player => player.socketID === socket.id);
        let word = game.words[player.currentWordIndex];


        if (word === userInput) {
          player.currentWordIndex++;

          console.log(`Player: ${player.nickName}, Updated Word Index: ${player.currentWordIndex}`);

          // Save the game after updating player progress
          game = await game.save();

          if (player.currentWordIndex !== game.words.length) {
            io.to(gameID).emit('updateGame', game);
          } else {
            let endTime = new Date().getTime();
            let { startTime } = game;

            // Fetch the latest player data before calculating WPM
            player = game.players.find(player => player.socketID === socket.id);
            player.WPM = calculateWPM(endTime, startTime, player);

            game = await game.save();

            socket.emit('done');
            io.to(gameID).emit('updateGame', game);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });



  socket.on('timer', async ({ gameID, playerID }) => {
    let countDown = 5;
    let game = await Game.findById(gameID);
    if (!game) return socket.emit('error', { message: 'Game not found' });

    let player = game.players.id(playerID);
    if (!player) return socket.emit('error', { message: 'Player not found' });

    if (player.isPartyLeader) {
      let timerID = setInterval(async () => {
        if (countDown >= 0) {
          io.to(gameID).emit('timer', { countDown, msg: "Starting Game" });
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit('updateGame', game);
          StartGameClock(gameID);
          clearInterval(timerID);
        }
      }, 1000);
    }
  });


  socket.on('join-game', async ({ gameID, nickName }) => {
    try {
      let game = await Game.findById(gameID);
      if (!game || !game.isOpen) {
        socket.emit('error', { message: 'Game not found or is no longer open.' });
        return;
      }

      const player = { socketID: socket.id, nickName };
      game.players.push(player);
      await game.save();

      socket.join(gameID);
      io.to(gameID).emit('updateGame', game);
    } catch (err) {
      socket.emit('error', { message: 'Error joining game.' });
    }
  });


  socket.on('create-game', async (nickName) => {
    try {
      const quotableData = await QuotableAPI.getData();
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



const StartGameClock = async (gameID) => {
  let game = await Game.findById(gameID);
  if (!game) return;

  game.startTime = new Date().getTime(); 
  game = await game.save();

  console.log(`Game started with ID: ${gameID}, Start Time: ${game.startTime}`);
  
  let time = 15; 

  let timerID = setInterval(async () => {
    if (time >= 0) {
      const formatTime = calculateTime(time);
      io.to(gameID).emit('timer', { countDown: `${formatTime}`, msg: "Time Remaining" });
      time--;
    } else {
      (async () => {
        let endTime = new Date().getTime();
        let game = await Game.findById(gameID); 
        let { startTime } = game;

        console.log(`Game ended with ID: ${gameID}, End Time: ${endTime}`);
        console.log(`Game Duration (seconds): ${(endTime - startTime) / 1000}`);

        game.isOver = true;

        game.players.forEach((player, index) => {
          if (player.WPM === -1) {
            console.log(`Calculating WPM for player: ${player.nickName}`);
            game.players[index].WPM = calculateWPM(endTime, startTime, player);
          }
        });

        game = await game.save(); 
        io.to(gameID).emit('updateGame', game); 
        clearInterval(timerID);
      })();
    }
  }, 1000);
};



const calculateTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};


const calculateWPM = (endTime, startTime, player) => {
  let noOfWords = player.currentWordIndex;
  const timeInSeconds = (endTime - startTime) / 1000;
  const timeInMinutes = timeInSeconds / 60;


  if (timeInMinutes <= 0) {
    console.warn("Time in minutes is too small or zero, setting WPM to 0.");
    return 0;
  }

  const WPM = Math.floor(noOfWords / timeInMinutes);
  console.log(`WPM Calculated: ${WPM}`);
  return WPM;
};
