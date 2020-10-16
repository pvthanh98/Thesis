import React from "react";
import { Media } from "reactstrap";
import Loading from "../../components/user_ui/loading";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { animateScroll as scroll } from 'react-scroll';
import Rating from '../../components/user_ui/rating';
import axios from "../../service/axios";
import {useDispatch} from 'react-redux';
export default (props) => {

  const dispatch = useDispatch();
  
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  const setSelectedWindow = () => {
    props.setSelectedWindow({
      id: props.store._id,
      name: props.store.name,
      description: props.store.description,
      lat: props.store.latitude,
      lng: props.store.longtitude,
      distance: props.store.distance.distance,
      rating: props.store.rating.total,
    });
    scrollToTop();
  };

  const handleButtonClick = () => {
    props.chatToggle();
    loadMessages();
  }
  const loadMessages = () => {
    const customer_id =localStorage.getItem("user_id")
    if(customer_id){
      axios().get(`/api/messages/customer_and_store/${customer_id}/${props.store._id}`)
      .then(({data})=> dispatch({type:"UPDATE_MESSAGES", messages:data}))
      .catch(err=>console.log(err));
    }
  }
  return (
    <Media className="mb-3">
      <Media left href="#" className="mr-3">
        <img
          src={"http://localhost:8080/images/" + props.store.image}
          style={{ borderRadius: "12px" }}
          height="80px"
        />
      </Media>
      <Media body>
        <Media heading>{props.store.name}</Media>
        {props.description}
      </Media>
      <Media className="mr-5">
        <Rating star= {props.store.rating.total}/>
      </Media>
      <Media className="mr-5">
        Cách bạn {props.store.distance ? props.store.distance.distance.text : <Loading />}
      </Media>
      <Media>
        <Button onClick={handleButtonClick}  variant="contained" color="primary" endIcon={<Icon>send</Icon>}>
          Nhắn Tin
        </Button>
        <Button
          variant="contained"
          color="success"
          className="ml-2"
          endIcon={<Icon>perm_phone_msg</Icon>}
        >
          Gọi
        </Button>
        <Button
          variant="contained"
          color="success"
          className="ml-2"
          endIcon={<Icon>alt_route</Icon>}
          onClick={setSelectedWindow}
        >
          Xem đường
        </Button>
      </Media>
    </Media>
  );
};
