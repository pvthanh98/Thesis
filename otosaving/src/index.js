/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Index from "./views/users_ui/index";
// core components
import Admin from "layouts/Admin.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import Reducer from "./reducer/index";
import { Provider } from "react-redux";
import AdminLogin from './views/Adminpage/login';
import socketIOClient from "socket.io-client";
import {server} from './constant';
const socket = socketIOClient(server);

const hist = createBrowserHistory();
const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

export {socket};