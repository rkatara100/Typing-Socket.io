import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ProgresBar = ({ players, player, wordLength }) => {
  const calculatePercentage = (currentWordIndex, wordLength) => {
    return ((currentWordIndex / wordLength) * 100).toFixed(2);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" sx={{ textAlign: 'left', color: '#4e54c8' }}>
          {player.nickName}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={calculatePercentage(player.currentWordIndex, wordLength)}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#34eb77',
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{ textAlign: 'right', color: '#6c757d', marginTop: '4px' }}
        >
          {calculatePercentage(player.currentWordIndex, wordLength)}%
        </Typography>
      </Box>

      {players.map((playerObj) => {
        if (playerObj._id !== player._id) {
          return (
            <Box key={playerObj._id} sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'left', color: '#007bff' }}>
                {playerObj.nickName}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(playerObj.currentWordIndex, wordLength)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#007bff',
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: 'right', color: '#6c757d', marginTop: '4px' }}
              >
                {calculatePercentage(playerObj.currentWordIndex, wordLength)}%
              </Typography>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default ProgresBar;
