import React from 'react'
import { useNavigate } from 'react-router-dom';

const GameMenu = () => {
     let navigate=useNavigate();
  return (
    <div className='text-center'>
      <h1>Welcome to type racer Game</h1>
      <button type='button' onClick={()=>navigate('/game/create')} className='btn btn-primary btn-lg mr-3'> Start Game</button>
      <button type='button' onClick={()=>navigate('/game/join')} className='btn btn-primary btn-lg m-4'> Join Game</button>

    </div>
  )
}

export default GameMenu
