import React from 'react';

const typedCurrentlyStyle = {
  backgroundColor: "#34eb77",
};

const currentStyle = {
  textDecoration: "underline",
};

const getTypedWords = (words, player) => {
  if (!words || !player || typeof player.currentWordIndex === 'undefined') {
    return null;
  }
  let typedWords = words.slice(0, Math.min(player.currentWordIndex, words.length));
  typedWords = typedWords.join(" ");
  return <span style={typedCurrentlyStyle} className="text-success">{typedWords}</span>;
};

const getCurrentWord = (words, player) => {
  if (!words || !player || typeof player.currentWordIndex === 'undefined') {
    return null;
  }
  const currentWord = words[player.currentWordIndex];
  return currentWord ? <span style={currentStyle} className="text-primary">{currentWord}</span> : null;
};

const getWordsToBeTyped = (words, player) => {
  if (!words || !player || typeof player.currentWordIndex === 'undefined') {
    return null;
  }
  let wordsToBeTyped = words.slice(player.currentWordIndex + 1, words.length);
  wordsToBeTyped = wordsToBeTyped.join(" ");
  return <span className="text-muted">{wordsToBeTyped}</span>;
};

const DisplayWords = ({ words = [], player = {} }) => {
  return (
    <div className="d-flex flex-wrap">
      {getTypedWords(words, player)}
      {getCurrentWord(words, player)}
      {getWordsToBeTyped(words, player)}
    </div>
  );
}

export default DisplayWords;
