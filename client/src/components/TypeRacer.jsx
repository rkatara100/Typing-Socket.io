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

const getCurrentPlayer = (players) => {
  return players.find(player => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const navigate = useNavigate();
  const { _id, players, words, isOpen, isOver } = gameState || {};

  useEffect(() => {
    if (!_id) {
      navigate('/'); 
    }
  }, [_id, navigate]);

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

  const currentPlayer = getCurrentPlayer(players);

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
      <DisplayWords words={words} player={currentPlayer} />

      <ProgresBar players={players} player={currentPlayer} wordLength={words.length} />

      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />

      <CountDown />

      <StartBtn player={currentPlayer} gameID={_id} />

      <ScoreBoard players={players} />
    </Box>
  );
};

export default TypeRacer;
