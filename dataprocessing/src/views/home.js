import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from '@material-ui/core';
export default function() {
    const [redirect, setRedirect] = React.useState(null);
    if(redirect) return <Redirect push to={redirect} />
    return (
        <div style={{display:"flex", justifyContent:"center",height:window.innerHeight, padding:"40px", backgroundColor:"ButtonFace"}}>
            <div style={{border:"1px solid #ddd", width:"600px", height:"600px", padding:"8px", borderRadius:"24px", backgroundColor:"#fff"}}> 
                <h1 style={{textAlign:"center"}}>DATA CENTER PROCESSING</h1>
                <Button style={{margin:"4px"}} variant="contained" onClick={()=>setRedirect("/store_comment")}>STORE COMMENTS</Button>
                <Button style={{margin:"4px"}} variant="contained" onClick={()=>{setRedirect("/service_comment")}}  color="primary">SERVICE COMMENTS</Button>
            </div>
        </div>
    )
}