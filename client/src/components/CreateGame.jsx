import React, { useState } from 'react';
import socket from '../socketCongig';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const CreateGame = () => {
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setNickName(e.target.value);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nickName.trim()) {
      setError('Nickname is required!');
      return;
    }
    socket.emit('create-game', nickName, (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess(true);
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
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Game
      </Typography>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Game created successfully!</Alert>}
        <TextField
          label="Enter Nickname"
          variant="outlined"
          fullWidth
          value={nickName}
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

export default CreateGame;
