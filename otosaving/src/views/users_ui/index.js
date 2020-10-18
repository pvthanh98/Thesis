import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from '../../service/axios';
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
const socket = socketIOClient(server);
socket.on('connect', function(){
  if(localStorage.getItem("user_token")){
    socket.emit("authenticate",{token: localStorage.getItem("user_token"), type: "user"});
    return;
  }
});

function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    loadCategories();
  });
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
      <Route path="/store/register" component={StoreRegister} />
      <Route path="/store/id/:id" component={StoreDetail} />
      <Route exact path="/service/:id/:name" component={ServiceDetail} />
      <Route exact path="/" component={Home} />
    </div>
  );
}
export {socket};
export default Index;
