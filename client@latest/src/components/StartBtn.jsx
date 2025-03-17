import React, { useState } from 'react';
import socket from '../socketCongig';

const StartBtn = ({ gameID, player }) => {
  const [showBtn, setShowBtn] = useState(true);

  // Check if player exists and then destructure
  const isPartyLeader = player ? player.isPartyLeader : false;

  const onClickHandler = () => {
    socket.emit('timer', { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return (
    <div>
      {isPartyLeader && showBtn ? (
        <button type='button' onClick={onClickHandler} className='btn btn-primary'>
          Start Game
        </button>
      ) : null}
    </div>
  );
};

export default StartBtn;
