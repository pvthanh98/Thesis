import React from "react";
import ChatItem from './chat_item';
import { Form, Input } from 'reactstrap'; 
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChatContent from './chatcontent';
export default (props) => {
  const [messages, setMessages] = React.useState([
    {msg:"Hi! how are you today", isStore:false, time:"12h00"},
    {msg:"Fine! thanks", isStore:true, time:"12h01"},
    {msg:"What are you doing tomorow", isStore:false, time:"12h02"},
    {msg:"I do not know", isStore:true, time:"12h03"}
  ])
  return (
    <div className="chat-container">
      <div className="chat-header" style={{display:"flex", alignItems:"center", padding:"8px"}}>
        <h4>Cửa hàng 01</h4>
      </div>
      <ChatContent messages={messages} />
      <div className="chat-input">
          <Form style={{height:"100%", display:"flex"}}>
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
