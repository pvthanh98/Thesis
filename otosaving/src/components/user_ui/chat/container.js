import React, {useEffect} from "react";
import { Form, Input } from 'reactstrap'; 
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChatContent from './chatcontent';
import CancelIcon from '@material-ui/icons/Cancel';
import {useSelector, useDispatch} from 'react-redux';
import {socket} from '../../../views/users_ui/index';
import axios from '../../../service/axios_user';
export default (props) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const [msgInput, setMsgInput] = React.useState("")
  useEffect(()=>{
    socket.on('server',(data)=>{
      alert("server send data");
    })
  });
  
  const handleForm = (e) => {
    e.preventDefault();
    socket.emit("customer_send_msg", {
      to: messages.info.store.id,
      body: msgInput
    });
    setMsgInput("");
    loadMessageLocal();
  }

  const loadMessageLocal = () => {
    let newMsg = {
      is_store:false,
      body: msgInput,
      timestamp: new Date().toISOString()
    }
    
    let newMsgContent = [...messages.content];
    newMsgContent.push(newMsg);
    let newMessages = {
      info: {...messages.info},
      content: newMsgContent
    }

    console.log(newMessages)
    dispatch({type:"UPDATE_MESSAGES", messages: newMessages});
  }

  const loadMessages = () => {
    axios().get(`/api/messages/customer_to/${messages.info.store.id}`)
    .then(({data})=> {
      dispatch({type:"UPDATE_MESSAGES", messages:data})
    })
    .catch(err=>console.log(err));
  }

  return (
    <div className="chat-container">
      <div className="chat-header" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px"}}>
        <h4>{messages && messages.info.store.name}</h4>
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
