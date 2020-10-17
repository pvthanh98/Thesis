import React from 'react';
import ReactDOM from 'react-dom';
import ChatItem from './chat_item';
class ChatContent extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidUpdate(){
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }
    renderMessages = () => {
        return this.props.messages && this.props.messages.map(message=>{
            return <ChatItem key={message._id} where={this.props.where} message={message} />
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