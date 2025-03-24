import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const GameMenu = () => {
  let navigate = useNavigate();
  const bubbles = Array.from({ length: 20 }); 

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg,rgb(223, 225, 229), #2a5298)',
      }}
    >
      {/* Animated Bubbles */}
      <div className="bubbles">
        {bubbles.map((_, index) => (
          <motion.div
            key={index}
            className="bubble"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            animate={{
              y: ['0%', '-100%'],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          ></motion.div>
        ))}
      </div>

      <Box
        sx={{
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Type Racer Game
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/game/create')}
          sx={{ marginRight: 2 }}
        >
          Start Game
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => navigate('/game/join')}
        >
          Join Game
        </Button>
      </Box>
    </Box>
  );
};

export default GameMenu;