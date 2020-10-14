import React from 'react';
import ChatItem from './chat_item';
class ChatContent extends React.Component {
    constructor(props){
        super(props);
    }
    renderMessages = () => {
        return this.props.messages && this.props.messages.map(message=>{
            return <ChatItem isStore={message.isStore} msg={message.msg} time={message.time} />
        })
    }
    render(){
        return(
            <div className="chat-content">
                {this.renderMessages()}
            </div>
        );
    }
}

export default ChatContent;