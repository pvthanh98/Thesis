import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from '../../service/axios_user';
import Home from './home';
import Login from './login';
import Rescue from './cuuho';
import ServiceDetail from './service_detail';
import UserRegister from './user_register';
import StoreRegister from './store_register';
import StoreDetail from './store_detail';
// redux
import { useSelector, useDispatch } from 'react-redux';
import socketIOClient from "socket.io-client";
import {server} from '../../constant';
import CustomerIndex from './Customer/index';
import StoreList from './storelist';
const socket = socketIOClient(server);
socket.on('connect', function(){
    socket.emit("authenticate",{token: localStorage.getItem("user_token"), type: "user"});
});

function Index() {
  const message = useSelector(state=>state.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    loadCategories();
    socket.on("store_send_msg_to_you",({from_id})=>{
      if(message.info.store.id === from_id) loadMessages(from_id);
    })
  },[message]);

  

  const loadMessages = (store_id) => {
    axios().get(`/api/messages/customer_to/${store_id}`)
    .then(({data})=> {
      dispatch({type:"UPDATE_MESSAGES", messages:data})
    })
    .catch(err=>console.log(err));
  }
  const loadCategories = () => {
    axios().get('/api/category')
    .then(({data})=> dispatch({type:"GET_CATEGORY", categories:data}))
    .catch(err=>console.log(err))
  }
  return (
    <div>
      <Route exact path="/login" component={Login} />
      <Route exact path="/cuuho" component={Rescue} />
      <Route exact path="/user/register" component={UserRegister} />
      <Route exact path="/store/register" component={StoreRegister} />
      <Route exact path="/store/id/:id" component={StoreDetail} />
      <Route exact path="/store" component={StoreList} />
      <Route exact path="/service/:id/:name" component={ServiceDetail} />
      <Route path="/customer/" component={CustomerIndex} />
      <Route exact path="/" component={Home} />
    </div>
  );
}
export {socket};
export default Index;
