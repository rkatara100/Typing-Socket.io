import React, { useEffect } from 'react';
import CountDown from './CountDown.jsx';
import StartBtn from './StartBtn.jsx';
import socket from '../socketCongig.js';
import { useNavigate } from 'react-router-dom';
import DisplayWords from './DisplayWords.jsx';
import Form from './Form.jsx';
import ProgresBar from './ProgresBar.jsx';
import ScoreBoard from './ScoreBoard.jsx';

const findPlayer = (players) => {
  return players.find(player => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const navigate = useNavigate();
  const { _id, players, words, isOpen,isOver } = gameState;
  useEffect(() => {
    if (!_id) {
      navigate('/'); 
    }
  }, [_id, navigate]);
 
  if (!gameState) {
    return <div>Loading...</div>;
  }


  

  
  if (!words || !players) {
    return <div>Loading words or players...</div>;
  }

  const player = findPlayer(players);

  if (!player) {
    return <div>Player not found, waiting for connection...</div>;
  }

  return (
    <div className='text-center'>
      <DisplayWords words={words} player={player} />
      <ProgresBar players={players} player={player} wordLength={words.length} />
      <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
      <CountDown />
      <StartBtn player={player} gameID={_id} />
      <ScoreBoard players={players} />
      
    </div>
  );
};

export default TypeRacer;
