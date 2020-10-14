import React, { useState } from "react";
import { Route } from "react-router-dom";
import Home from './home';
import Login from './login';
import Rescue from './cuuho';
import ServiceDetail from './service_detail';
import UserRegister from './user_register';
import StoreRegister from './store_register';
import StoreDetail from './store_detail';
function Index() {
  return (
    <div>
      <Route exact path = "/login" component = {Login} />
      <Route exact path = "/cuuho" component={Rescue} />
      <Route exact path = "/user/register" component={UserRegister} />
      <Route path="/store/register" component={StoreRegister} />
      <Route path="/store/id/:id" component={StoreDetail} />
      <Route exact path = "/service/:id/:name" component={ServiceDetail} />
      <Route exact path = "/" component={Home} />
    </div>
  );
}

export default Index;
