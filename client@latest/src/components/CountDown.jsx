import React,{useEffect, useState} from 'react';
import socket from '../socketCongig';


const CountDown = () => {
      const [timer,setTimer]=useState({countDown:"",msg:""});

      useEffect(() => {
            const handleTimer = (data) => {
              setTimer(data);
            };
        
            const handleDone = () => {
              socket.removeListener('timer', handleTimer);
            };
        
            socket.on('timer', handleTimer);
            socket.on('done', handleDone);
        
            return () => {
              // Clean up listeners when the component is unmounted
              socket.removeListener('timer', handleTimer);
              socket.removeListener('done', handleDone);
            };
          }, []);
        

      const {countDown,msg}=timer;

  return (
    <div className='text-center'>
          <h1>{countDown}</h1>
          <h3>{msg}</h3>
    </div>
  )
}

export default CountDown
