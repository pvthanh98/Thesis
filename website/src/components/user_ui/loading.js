import React from "react";
export default function (props) {
  return (
    <div>
        <div style={{marginLeft:"auto",marginRight:"auto"}} className="custom-spiner"></div>
        {props.message && <div style={{marginLeft:"auto",marginRight:"auto", textAlign:"center"}}>
           {props.message}
        </div>}
    </div>
  );
}
