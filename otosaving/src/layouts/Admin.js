import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Chat from '../components/user_ui/chat/container_store';
import {useSelector, useDispatch} from 'react-redux';
import routes from "routes.js";
import axios from '../service/axios';
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import PrivateRoute from '../components/PrivateRoute/privateroute';

import socketIOClient from "socket.io-client";
import {server} from '../constant';
const socket = socketIOClient(server);
socket.on('connect', function(){
  if(localStorage.getItem("admin_token")){
    socket.emit("authenticate",{token: localStorage.getItem("admin_token"), type: "store"});
    return;
  }
});

let ps;
const switchRoutes = (
  <Switch> 
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            exact={prop.exact}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  const toggleChat = useSelector(state=>state.chat_toggle);
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const message_store_list = useSelector(state=> state.message_store_list);
  const message_store = useSelector(state=> state.message_store);
  const dispatch = useDispatch();
  
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  const loadListMsgOfStore = () => {
    console.log("load list running")
    axios().get("/api/messages/store_list")
    .then(({data})=>dispatch({type:"UPDATE_MESSAGE_STORE_LIST", messages: data}))
    .catch(err=>console.log(err))
  }

  const loadBill = () => {
    axios().get('/api/bill')
    .then(({data})=> dispatch({type:"UPDATE_BILLS", bills: data}))
    .catch(err=>console.log(err));
  } 


  React.useEffect(() => {
    //socket io
    socket.on("refresh_message",()=>{
      loadListMsgOfStore();
    })
    
    socket.on("customer_send_msg_to_you",(data)=>{
      console.log("RECEIVE",data.from_id, message_store.info.customer.id)
      if(message_store.info.customer.id === data.from_id) {
        loadMessages(data.from_id);
        console.log("CORRECT LET'S LOAD MESSAGE")
      }
      loadListMsgOfStore()
    });





    ////////////////////////////////////////////////
    loadBill();
    loadListMsgOfStore()
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [message_store]);

  const loadMessages = (customer_id) => {
    axios().get(`/api/messages/store_to/${customer_id}`)
    .then(({data})=> {
      dispatch({type:"UPDATE_STORE_MESSAGES", messages:data})
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {toggleChat && <Chat where="store"  />}
      </div>
    </div>
  );
}

export {socket}