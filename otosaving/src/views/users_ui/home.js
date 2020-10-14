import "../../App.css";
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Navbar from "../../components/user_ui/navbar";
import Carousel from "../../components/user_ui/Carousel";
import Stores from "../../components/user_ui/stores";
import Footer from "../../components/user_ui/footer";
import Service from "../../components/user_ui/service";
import axios from '../../service/axios';
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
  const loadCategories = () => {
    axios().get('/api/category')
    .then(({data})=> props.updateCategories(data))
    .catch(err=>console.log(err))
  }
  useEffect(() => {
    loadCategories() // navbar
    getStores();
    getServices();
    getOutStandingService();
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
    updateCategories : (categories) => {
      dispatch({type:"GET_CATEGORY", categories})
    }
})

export default connect(mapProp, mapDispatch)(Home);
