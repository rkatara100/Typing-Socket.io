import React,{useState,useEffect,useRef} from 'react';
import socket from '../socketCongig';

const Form = ({isOpen,isOver, gameID}) => {
   
      const [userInput,setUserInput]=useState("");
      const textInput=useRef(null);

      useEffect(()=>{
            if(!isOpen){
                  textInput.current.focus();
            }
      },[isOpen])

      const resetForm=()=>{
           setUserInput("");  
      };

      const onChange=(e)=>{
          let value=e.target.value;
          let lastChar=value.charAt(value.length-1);
          if(lastChar===" ")
          {
             socket.emit('userInput',{userInput,gameID});
             resetForm(); 
          }else{
            setUserInput(e.target.value);
          }
      }

  return (
    <div className='row my-3'>
      <div className="col-sm">

      </div>
      <div className="col-sm-4">
          <form>
            <div className="form-group">
                  <input type='text' className='form-control' readOnly={isOpen||isOver}
                   onChange={onChange} value={userInput} ref={textInput}>

                  </input>
            </div>
          </form>
      </div>
      <div className="col-sm">

      </div>
      
    </div>
  )
}

export default Form
