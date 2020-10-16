import React, {useEffect} from "react";
import { Form, Input } from 'reactstrap'; 
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChatContent from './chatcontent';
import CancelIcon from '@material-ui/icons/Cancel';
import {useSelector, useDispatch} from 'react-redux';
import {socket} from '../../../index';
export default (props) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  
  useEffect(()=>{
    socket.on('server',(data)=>{
      alert("server send data");
    })
  });
  
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("client","client send data");
  }

  return (
    <div className="chat-container">
      <div className="chat-header" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px"}}>
        <h4>Cửa hàng 01</h4>
        <CancelIcon style={{cursor:"pointer"}} onClick={()=> dispatch({type:"SET_CHAT_TOGGLE",state:false})} />
      </div>
      <ChatContent where={props.where} messages={messages} />
      <div className="chat-input">
          <Form onSubmit={handleForm} style={{height:"100%", display:"flex"}}>
             <Input placeholder="Type your message..." type="text-area" style={{height:"100%"}} />
             <Button
              variant="contained"
              color="primary"
            >
              <Icon>send</Icon>
            </Button>
          </Form>
      </div>
    </div>
  );
};
