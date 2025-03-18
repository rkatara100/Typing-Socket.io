import React, { useEffect } from 'react';
import CountDown from './CountDown.jsx';
import StartBtn from './StartBtn.jsx';
import socket from '../socketCongig.js';
import { useNavigate } from 'react-router-dom';
import DisplayWords from './DisplayWords.jsx';
import Form from './Form.jsx';

const findPlayer = (players) => {
  return players.find(player => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const navigate = useNavigate();
  const { _id, players, words, isOpen,isOver } = gameState;
  useEffect(() => {
    if (!_id) {
      navigate('/'); // Redirect if no game ID
    }
  }, [_id, navigate]);
 
  if (!gameState) {
    return <div>Loading...</div>;
  }


  

  // Check if words or players are missing
  if (!words || !players) {
    return <div>Loading words or players...</div>;
  }

  const player = findPlayer(players);

  // Check if player is found
  if (!player) {
    return <div>Player not found, waiting for connection...</div>;
  }

  return (
    <div className='text-center'>
      <DisplayWords words={words} player={player} />
      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
      <CountDown />
      <StartBtn player={player} gameID={_id} />
    </div>
  );
};

export default TypeRacer;
