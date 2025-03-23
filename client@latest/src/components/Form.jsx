import React, { useState, useEffect, useRef } from 'react';
import socket from '../socketCongig';
import { Box, TextField } from '@mui/material';

const Form = ({ isOpen, isOver, gameID }) => {
  const [userInput, setUserInput] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      textInput.current.focus();
    }
  }, [isOpen]);

  const resetForm = () => {
    setUserInput('');
  };

  const onChange = (e) => {
    let value = e.target.value;
    let lastChar = value.charAt(value.length - 1);
    if (lastChar === ' ') {
      socket.emit('userInput', { userInput, gameID });
      resetForm();
    } else {
      setUserInput(value);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 2,
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type here..."
        value={userInput}
        onChange={onChange}
        inputRef={textInput}
        InputProps={{
          readOnly: isOpen || isOver,
          sx: {
            color: 'black', // Typing text color
            backgroundColor: '#f8f9fa', // Light background
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#007bff', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#34eb77', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#007bff', // Focused border color
              },
            },
          },
        }}
        sx={{
          width: '100%',
          maxWidth: '400px',
          mb: 2,
        }}
      />
    </Box>
  );
};

export default Form;
