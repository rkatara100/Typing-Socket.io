import React, { useEffect, useState } from 'react';
import socket from '../socketCongig';
import { Box, Typography } from '@mui/material';

const CountDown = () => {
  const [timer, setTimer] = useState({ countDown: "", msg: "" });

  useEffect(() => {
    const handleTimer = (data) => {
      setTimer(data);
    };

    const handleDone = () => {
      socket.removeListener('timer', handleTimer);
    };

    socket.on('timer', handleTimer);
    socket.on('done', handleDone);

    return () => {
      // Clean up listeners when the component is unmounted
      socket.removeListener('timer', handleTimer);
      socket.removeListener('done', handleDone);
    };
  }, []);

  const { countDown, msg } = timer;

  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: 4,
        padding: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          color: countDown > 0 ? '#007bff' : '#34eb77', // Blue for countdown, green when done
        }}
      >
        {countDown || "Waiting..."}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: 2,
          color: '#6c757d', // Muted gray for the message
        }}
      >
        {msg || "Get ready to start!"}
      </Typography>
    </Box>
  );
};

export default CountDown;
