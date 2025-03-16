import React, { useState } from 'react'
import socket from '../socketCongig';

const JoinGame = () => {
 
      const [userInput,setUserInput]=useState({gameID:"",nickName:""});

      const onChange=(e)=>{
             setUserInput({...userInput,[e.target.name]:e.target.value});
      }

      const onSubmit=(e)=>{
            e.preventDefault();
            console.log(userInput);
            socket.emit('join-game',userInput);
      }

  return (
    <div className='row'>
      <div className="col-sm">
            <div className="col-sm-8">
              <h1 className='text-center'>
                  Join Game
              </h1>
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                        <label htmlFor="gameID">Enter Game ID</label>
                        <input type="text" name='gameID' value={userInput.gameID} onChange={onChange} placeholder='Enter Game ID' className='form-control m-4' />

               <label htmlFor="nickName">Enter Nick Name</label>
                        <input type="text" name='nickName' value={userInput.nickName} onChange={onChange} placeholder='Enter Nick Name' className='form-control m-4' />
                    
                  </div>

                  <button type='submit' className='btn btn-primary m-4'>Submit</button>
              </form>
            </div>
            <div className="col-sm">

            </div>
      </div>
      
    </div>
  )
}

export default JoinGame
