import React, { useState } from 'react';
import socket from '../socketCongig';
import { Button, Box } from '@mui/material';

const StartBtn = ({ gameID, player }) => {
  const [showBtn, setShowBtn] = useState(true);

  const isPartyLeader = player ? player.isPartyLeader : false;

  const onClickHandler = () => {
    socket.emit('timer', { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
      {isPartyLeader && showBtn ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onClickHandler}
          sx={{
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3', 
            },
          }}
        >
          Start Game
        </Button>
      ) : null}
    </Box>
  );
};

export default StartBtn;
