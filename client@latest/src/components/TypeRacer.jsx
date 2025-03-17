import React, { useEffect } from 'react';
import CountDown from './CountDown.jsx';
import StartBtn from './StartBtn.jsx';
import socket from '../socketCongig.js';
import { useNavigate } from 'react-router-dom';

const findPlayer=(players)=>{
     return players.find(player=>player.socketID===socket.id);
}

const TypeRacer = ({gameState}) => {
      
      const navigate=useNavigate();
      const {_id,players}=gameState;
      const player=findPlayer(players);

      useEffect(() => {
            if (!gameState._id) {
              navigate('/');  // Redirect if no game ID
            }
          }, [gameState._id, navigate])

  return (
    <div className='text-center'>
      <CountDown/>
      <StartBtn player={player} gameID={_id} />
      
    </div>
  )
}

export default TypeRacer
