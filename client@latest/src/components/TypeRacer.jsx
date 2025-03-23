import React, { useEffect } from 'react';
import CountDown from './CountDown.jsx';
import StartBtn from './StartBtn.jsx';
import socket from '../socketCongig.js';
import { useNavigate } from 'react-router-dom';
import DisplayWords from './DisplayWords.jsx';
import Form from './Form.jsx';
import ProgresBar from './ProgresBar.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import { Box, Typography, CircularProgress } from '@mui/material';

// Function to find the current player based on socket ID
const getCurrentPlayer = (players) => {
  return players.find(player => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const navigate = useNavigate();
  const { _id, players, words, isOpen, isOver } = gameState || {};

  // Redirect to home if game ID is missing
  useEffect(() => {
    if (!_id) {
      navigate('/'); 
    }
  }, [_id, navigate]);

  // Show loading state if gameState is not available
  if (!gameState) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading game state...
        </Typography>
      </Box>
    );
  }

  // Show loading state if words or players are not loaded
  if (!words || !players) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading words or players...
        </Typography>
      </Box>
    );
  }

  // Get the current player
  const currentPlayer = getCurrentPlayer(players);

  // Show error if the current player is not found
  if (!currentPlayer) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" sx={{ color: 'red' }}>
          Unable to find your connection. Please wait or try reconnecting.
        </Typography>
      </Box>
    );
  }

  // Main game UI
  return (
    <Box sx={{ textAlign: 'center', padding: 2 }}>
      {/* Display the words for the typing game */}
      <DisplayWords words={words} player={currentPlayer} />

      {/* Show the progress bar for all players */}
      <ProgresBar players={players} player={currentPlayer} wordLength={words.length} />

      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />

      <CountDown />

      <StartBtn player={currentPlayer} gameID={_id} />

      <ScoreBoard players={players} />
    </Box>
  );
};

export default TypeRacer;
