import "../../App.css";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Navbar from "../../components/user_ui/navbar_v2";
import Carousel from "../../components/user_ui/Carousel";
import Stores from "../../components/user_ui/stores";
import Footer from "../../components/user_ui/footer";
import Service from "../../components/user_ui/service";
import axios from '../../service/axios_user';
import Chat from '../../components/user_ui/chat/container';
import {connect} from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import store from "reducer/store";
function Home(props) {
  const [outStandingService, setOutStandingService] = React.useState([]);
  const [storePage, setStorePage] = React.useState(1);
  const [storeTotalPage, setStoreTotalPage] = React.useState(1);
  const [servicePage, setServicePage] = React.useState(1);
  const [serviceTotalPage, setServiceTotalPage] = React.useState(1);
  const getStores = (page) => {
    axios() 
      .get("/api/store/page/"+page)
      .then((res) => {
        props.updateStore(res.data.stores);
        setStoreTotalPage(res.data.total_page)
      })
      .catch((err) => console.log(err));
  };

  const onChangeStorePage = (page) => {
    setStorePage(page);
    getStores(page);
  }
  const onChangeServicePage = (page) => {
    setServicePage(page);
    getServices(page);
  }
  

  const getServices = (page) => {
    axios()
      .get("/api/service/page/"+page)
      .then((res) => {
        props.updateService(res.data.services);
        setServiceTotalPage(res.data.total_page)
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
        axios().get(`/api/messages/customer_to/${localStorage.getItem('user_id')}`)
        .then(({data})=>props.updateMessages(data))
        .catch(err=>console.log(err));
    }
  }
  useEffect(() => { 
    getStores(storePage);
    getServices(servicePage);
    getOutStandingService();
 //   loadMessages(); there're some errors in this task, we need to fix later
  },[]);
  return (
    <div className="App">
      <Navbar />
      <Container fluid={true} className="my-container">
        <Stores 
          page={storePage} 
          setPage={onChangeStorePage} 
          total_page={storeTotalPage} 
          setTotalPage={setStoreTotalPage} 
        />
        <Service 
          outStandingService={outStandingService} 
          page={servicePage} setPage={onChangeServicePage} 
          total_page={serviceTotalPage} 
          setTotalPage={setServiceTotalPage} 
        />
        {props.chat_toggle && <Chat where="customer" />}
      </Container>
      <Footer />
    </div>
  );
}
const mapProp = state => ({
    stores: state.stores,
    chat_toggle: state.chat_toggle
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
