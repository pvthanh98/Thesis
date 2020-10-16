import React from "react";
import {server} from '../../../constant';
export default (props) => {
  const {message} = props;
  if(props.where==="customer"){
    switch (message.is_store) {
      case true: {
        return (
          <div className="msg partner_msg">
            <img
              className="mr-2"
              src={`${server}/images/${message.store_id.image}`}
              height="30px"
              style={{ borderRadius: "50%" }}
            />
            <div className="forloat">
              <div className="msg-content partner-msg-content">{message.body}</div>
              <div className="msg-info al-left">
                {message.timestamp}
              </div>
            </div>
          </div>
        );
      }
      case false: {
        return (
          <div className="msg my_msg">
            <div className="msg-content my-msg-content">{message.body}</div>
            <div className="msg-info al-right" style={{textAlign:"right"}}>
              {message.timestamp}
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className="msg my_msg">
            <div className="msg-content my-msg-content">{props.msg}</div>
            <div className="msg-info" style={{ textAlign: "right" }}>
              {props.time}
            </div>
          </div>
        );
      }
    }
  }
  
  if(props.where==="store"){
    switch (!message.is_store) {
      case true: {
        return (
          <div className="msg partner_msg">
            <img
              className="mr-2"
              src={`${server}/images/${message.customer_id.image}`}
              height="30px"
              style={{ borderRadius: "50%" }}
            />
            <div className="forloat">
              <div className="msg-content partner-msg-content">{message.body}</div>
              <div className="msg-info al-left">
                {message.timestamp}
              </div>
            </div>
          </div>
        );
      }
      case false: {
        return (
          <div className="msg my_msg">
            <div className="msg-content my-msg-content">{message.body}</div>
            <div className="msg-info al-right" style={{textAlign:"right"}}>
              {message.timestamp}
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className="msg my_msg">
            <div className="msg-content my-msg-content">{message.msg}</div>
            <div className="msg-info" style={{ textAlign: "right" }}>
              {message.timestamp}
            </div>
          </div>
        );
      }
    }
  }

  return <div>Null</div>
};
