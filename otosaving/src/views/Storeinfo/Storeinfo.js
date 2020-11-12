import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from '../../service/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';
import CardAvatar from "components/Card/CardAvatar.js";
import FormData from 'form-data';
import {server} from '../../constant';
import Loading from '@material-ui/core/CircularProgress';
import Rating from '../../components/user_ui/rating';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
    
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() { console.log(this.props.store_coordinate)}
  })
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{
      lat: props.store_coordinate ? props.store_coordinate.lat : 10.0223554,
      lng: props.store_coordinate ? props.store_coordinate.lng : 105.77034019999999,
    }}
    center={{
      lat: props.store_coordinate ? props.store_coordinate.lat : 10.0223554,
      lng: props.store_coordinate ? props.store_coordinate.lng : 105.77034019999999,
    }}
    options={{
      gestureHandling:'greedy',
      scrollwheel:false
    }}
  >
    {props.store_coordinate && (
      <Marker
        position={{
          lat: props.store_coordinate.lat,
          lng: props.store_coordinate.lng,
        }}
      >
        <InfoWindow>
          <div>Vị trí của bạn</div>
        </InfoWindow>
      </Marker>
    )}
  </GoogleMap>
));
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  customContainer :{
      padding:"8px"
  },
  marginTop: {
    marginTop: "45px"
  }
};
const useStyles = makeStyles(styles);

export default function StoreInfo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = React.createRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [mystore_lat, setMystore_Lat] = useState(-1);
  const [mystore_lng, setMystore_Lng] = useState(-1);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  useEffect(() => {
      loadStore();
  }, []);

  const loadStore = () => {
    setLoading(true);
    axios().post('/api/store/me', { id: localStorage.getItem('admin_id') })
    .then(res => {
      dispatch({
        type: "GET_MYSTORE",
        mystore: res.data
      })
      setName(res.data.name);
      setDescription(res.data.description);
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setLat(parseFloat(res.data.latitude));
      setLng(parseFloat(res.data.longtitude));
      setMystore_Lat(parseFloat(res.data.latitude));
      setMystore_Lng(parseFloat(res.data.longtitude));
      setImageText(res.data.image);
      setLoading(false);
      setRating(res.data.rating);
    })
    .catch(err => {
      setLoading(true);
      console.log(err);
    })  
  }

  const onInputChange = (e) => {
    const {value} = e.target
    switch(e.target.name){
      case "name": {
        setName(value);
        return;
      }
      case "description": {
        setDescription(value);
        return;
      }
      case "address": {
        setAddress(value);
        return;
      }
      case "lat": {
        setLat(value);
        return;
      }
      case "lng": {
        setLng(value);
        return;
      }
      case "phone" : {
        setPhone(value);
        return;
      }
      case "image" : {
        setImage(e.target.files[0])
        console.log(e.target.files[0])
      }

    }
  }
  const onFormSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
      let data = new FormData();
      let coordinate = `${lat},${lng}`
      data.append("file_store", image);
      data.append("name", name);
      data.append("description", description);
      data.append("address", address);
      data.append("coordinate", coordinate);
      data.append("phone", phone);
    
      axios()
        .post("/api/store/modify", data)
        .then(() => {
          loadStore()
        })
        .catch((err) => console.log(err));
    
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <MyMapComponent
            store_coordinate={{lat:mystore_lat,lng: mystore_lng}}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={8} >
          <Card >
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Store Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
             <Grid container>
                <Grid item md={4} className={classes.customContainer}>
                    <InputLabel >Name</InputLabel>
                    <Input fullWidth={true} name="name" onChange={onInputChange} value={name}  />
                </Grid>
                <Grid item md={8} className={classes.customContainer}>
                <InputLabel>Description</InputLabel>
                    <Input fullWidth={true} name="description" onChange={onInputChange} value={description} />
                </Grid>
                <Grid item md={8} className={classes.customContainer}>
                    <InputLabel>Address</InputLabel>
                    <Input fullWidth={true} name="address" onChange={onInputChange} value={address} />
                </Grid>
                <Grid item md={4} className={classes.customContainer}>
                    <InputLabel>Phone</InputLabel>
                    <Input fullWidth={true} name="phone" onChange={onInputChange} value={phone} />
                </Grid>
                <Grid item md={4} className={classes.customContainer}>
                    <InputLabel>Lat</InputLabel>
                    <Input fullWidth={true} value={lat} name="lat" onChange={onInputChange} />
                </Grid>
                <Grid item md={4} className={classes.customContainer}>
                    <InputLabel>Lng</InputLabel>
                    <Input fullWidth={true} value={lng} name="lng" onChange={onInputChange} />
                </Grid>
                <Grid item md={4} className={classes.customContainer}>
                    <Button onClick={onFormSubmit} variant="contained" color="secondary">UPDATE</Button>
                    {loading && <Loading style={{marginLeft:"24px"}} />}
                </Grid>
                <Grid item md={8} className={classes.customContainer}>
                    We recommend you to get coordinates from this site{" "}
                    {" "}<a target ="_blank" href="https://www.latlong.net/convert-address-to-lat-long.html">Link</a>
                </Grid>
             </Grid>
            </CardBody>
          </Card> 
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={server+"images/"+imageText} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{name}</h4>
              <p className={classes.description}>
                {description}
              </p>
              <Input type="file" ref={inputRef} name="image" onChange={onInputChange} />
            </CardBody>
          </Card>
          <Card>
              <CardBody style={{textAlign:"center"}}>
                Đánh giá: 
                <Rating star={5} quantity={rating.five} />
                <Rating star={4} quantity={rating.four} />
                <Rating star={3} quantity={rating.three} />
                <Rating star={2} quantity={rating.two} />
                <Rating star={1} quantity={rating.one} />
                <hr />
                Trung bình
                <Rating star={rating.total}/>
              </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
