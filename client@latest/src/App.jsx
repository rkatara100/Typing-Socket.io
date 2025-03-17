// App.js
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GameMenu from './components/gameMenu';
import socket from './socketCongig';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import TypeRacer from './components/TypeRacer.jsx';

function App() {
   const navigate = useNavigate();

  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], words: [] });

  useEffect(() => {
     socket.on('updateGame', (game) => {
           console.log(game);
           setGameState(game);
     });
     return ()=>{
      socket.removeAllListeners();
     }
  }, []);

  useEffect(() => {
    if (gameState._id !== "") {
      navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id,navigate]);

  return (
    
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/game/create" element={<CreateGame/>} />
        <Route path="/game/join" element={<JoinGame/>} />
        <Route path="/game/:gameID" element={<TypeRacer gameState={gameState} />} />

      </Routes>
  );
}

export default App;
