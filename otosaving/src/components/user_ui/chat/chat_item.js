import React from "react";
export default (props) => {
  switch (props.isStore) {
    case true: {
      return (
        <div className="msg store_msg">
          <img
            className="mr-2"
            src="http://localhost:8080/images/default_store.png"
            width="30px"
            style={{ borderRadius: "50%" }}
          />
          <div className="forloat">
            <div className="msg-content store-msg-content">{props.msg}</div>
            <div className="msg-info" style={{ textAlign: "left" }}>
              {props.time}
            </div>
          </div>
        </div>
      );
    }
    case false: {
      return (
        <div className="msg my_msg">
          <div className="msg-content my-msg-content">{props.msg}</div>
          <div className="msg-info" style={{ textAlign: "right" }}>
            {props.time}
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
};
