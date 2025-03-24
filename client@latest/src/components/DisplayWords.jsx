import React from 'react';
import { Box, Typography } from '@mui/material';

const typedCurrentlyStyle = {
  backgroundColor: "#34eb77", 
  color: "white",
  padding: "2px 4px",
  borderRadius: "4px",
  marginRight: "4px",
};

const currentStyle = {
  textDecoration: "underline", 
  color: "#007bff", 
  fontWeight: "bold",
  marginRight: "4px",
};

const mutedStyle = {
  color: "#6c757d",
  marginRight: "4px",
};

const getTypedWords = (words, player) => {
  if (!words || !player || typeof player.currentWordIndex === 'undefined') {
    return null;
  }
  let typedWords = words.slice(0, Math.min(player.currentWordIndex, words.length));
  typedWords = typedWords.join(" ");
  return (
    <Typography component="span" style={typedCurrentlyStyle}>
      {typedWords}
    </Typography>
  );
};

const getCurrentWord = (words, player) => {
  if (!words || !player || typeof player.currentWordIndex === 'undefined') {
    return null;
  }
  const currentWord = words[player.currentWordIndex];
  return currentWord ? (
    <Typography component="span" style={currentStyle}>
      {currentWord}
    </Typography>
  ) : null;
};

const getWordsToBeTyped = (words, player) => {
  if (!words || !player || typeof player.currentWordIndex === 'undefined') {
    return null;
  }
  let wordsToBeTyped = words.slice(player.currentWordIndex + 1, words.length);
  wordsToBeTyped = wordsToBeTyped.join(" ");
  return (
    <Typography component="span" style={mutedStyle}>
      {wordsToBeTyped}
    </Typography>
  );
};

const DisplayWords = ({ words = [], player = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#f8f9fa", 
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {getTypedWords(words, player)}
      {getCurrentWord(words, player)}
      {getWordsToBeTyped(words, player)}
    </Box>
  );
};

export default DisplayWords;
