import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const getScoreboard = (players) => {
  const scoreBoard = players.filter(player => player.WPM !== -1); 
  return scoreBoard.sort((a, b) => b.WPM - a.WPM); 
};

const ScoreBoard = ({ players }) => {
  const scoreBoard = getScoreboard(players);
  
  if (scoreBoard.length <= 1) { 
    return null; 
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold', color: '#4e54c8' }}>
        Scoreboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: '#007bff' }}>#</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#007bff' }}>User</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#007bff' }}>WPM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreBoard.map((player, index) => (
            <TableRow key={`${player.nickName}-${player._id}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{player.nickName}</TableCell>
              <TableCell>{player.WPM === -1 ? "No words typed" : player.WPM}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreBoard;
