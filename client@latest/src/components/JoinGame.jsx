import React, { useState } from 'react';
import socket from '../socketCongig';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const JoinGame = () => {
  const [userInput, setUserInput] = useState({ gameID: '', nickName: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    setError(''); 
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { gameID, nickName } = userInput;

    if (!gameID.trim() || !nickName.trim()) {
      setError('Both Game ID and Nickname are required!');
      return;
    }

    socket.emit('join-game', userInput, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess(true);
        console.log('Game joined successfully:', response);
        
      }
    });
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
        color: 'white',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Join Game
      </Typography>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Game joined successfully!</Alert>}
        <TextField
          label="Enter Game ID"
          name="gameID"
          variant="outlined"
          fullWidth
          value={userInput.gameID}
          onChange={onChange}
          InputProps={{
            sx: {
              color: 'white', 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'skyblue', 
                },
                '&:hover fieldset': {
                  borderColor: 'pink', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue', 
                },
              },
            },
          }}
          sx={{
            mb: 2,
            '& .MuiInputLabel-root': {
              color: 'white', 
            },
          }}
        />
        <TextField
          label="Enter Nickname"
          name="nickName"
          variant="outlined"
          fullWidth
          value={userInput.nickName}
          onChange={onChange}
          InputProps={{
            sx: {
              color: 'white', 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'skyblue', 
                },
                '&:hover fieldset': {
                  borderColor: 'pink', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            },
          }}
          sx={{
            mb: 2,
            '& .MuiInputLabel-root': {
              color: 'white', 
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default JoinGame;
