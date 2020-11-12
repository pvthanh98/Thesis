import "../../App.css";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Navbar from "../../components/user_ui/navbar";
import Carousel from "../../components/user_ui/Carousel";
import Stores from "../../components/user_ui/stores";
import Footer from "../../components/user_ui/footer";
import Service from "../../components/user_ui/service";
import axios from '../../service/axios_user';
import {connect} from 'react-redux';
function Home(props) {
  const [outStandingService, setOutStandingService] = React.useState([]);
  const getStores = () => {
    axios() 
      .get("/api/store")
      .then((res) => {
        props.updateStore(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getServices = () => {
    axios()
      .get("/api/service")
      .then((res) => {
        props.updateService(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getOutStandingService = () => {
    axios().get('/api/service/outstanding')
    .then(res=>setOutStandingService(res.data))
    .catch(err=>console.log(err));
  }
 
  const loadMessages = () => {
    if(localStorage.getItem('user_id')){
        axios().get(`/api/messages/customer/${localStorage.getItem('user_id')}`)
        .then(({data})=>props.updateMessages(data))
        .catch(err=>console.log(err));
    }
  }
  useEffect(() => { 
    getStores();
    getServices();
    getOutStandingService();
    loadMessages();
  },[]);
  return (
    <div className="App">
      <Navbar />
      <Carousel />
      <Container fluid={true} className="my-container">
        <Service outStandingService={outStandingService} />
        <Stores />
      </Container>
      <Footer />
    </div>
  );
}
const mapProp = state => ({
    stores: state.stores
})

const mapDispatch = dispatch => ({
    updateStore: (stores) => {
        dispatch({
            type:"GET_STORES",
            stores
        })
    },
    updateService: (services) => {
        dispatch({
            type:"GET_SERVICES",
            services
        })
    },
    updateMessages : (messages) => {
      dispatch({type:"UPDATE_MESSAGES", messages})
    }
})

export default connect(mapProp, mapDispatch)(Home);
