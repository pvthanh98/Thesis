import React, {useEffect} from "react";
import { Form, Input } from 'reactstrap'; 
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChatContent from './chatcontent';
import CancelIcon from '@material-ui/icons/Cancel';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../service/axios_user';
import {socket} from '../../../layouts/Admin';
export default (props) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.message_store);
  const [msgInput, setMsgInput] = React.useState("")
  useEffect(()=>{
    socket.on('server',(data)=>{
      alert("server send data");
    });
    socket.on("customer_send_msg_to_you",(data)=>{
      console.log("Customer send what?")
    })
    socket.on("disconnection",function(){
      console.log("SOCKET DISCONECTED")
    })
  },[]);

  
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("store_send_msg", {
      to: messages.info.customer.id,
      body: msgInput
    });
    setMsgInput("");
    loadMessageLocal();
  }

  const loadMessageLocal = () => {
    let newMsg = {
      is_store:true,
      body: msgInput,
      timestamp: new Date().toISOString()
    }
    
    let newMsgContent = [...messages.content];
    newMsgContent.push(newMsg);
    let newMessages = {
      info: {...messages.info},
      content: newMsgContent
    }
    dispatch({type:"UPDATE_STORE_MESSAGES", messages: newMessages});
  }


  return (
    <div className="chat-container">
      <div className="chat-header" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px"}}>
        <h4>{messages && messages.info.customer.name}</h4>
        <CancelIcon style={{cursor:"pointer"}} onClick={()=> dispatch({type:"SET_CHAT_TOGGLE",state:false})} />
      </div>
      <ChatContent where={props.where} info={messages.info} messages={messages.content} />
      <div className="chat-input">
          <Form onSubmit={handleForm} style={{height:"100%", display:"flex"}}>
             <Input 
              value={msgInput} 
              placeholder="Type your message..." 
              type="text-area" 
              style={{height:"100%"}} 
              onChange={(e)=>setMsgInput(e.target.value)}
            />
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
