import React from "react";
import Navbar from "../../components/user_ui/navbar";
import Footer from "../../components/user_ui/footer";
import { connect } from "react-redux";
import Rating from '../../components/user_ui/rating';
import {Container, Row, Col} from 'reactstrap';
import {Button} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "service/axios";
import MediaObject from '../../components/user_ui/media_store';
import Chat from '../../components/user_ui/chat/container';
import {socket} from '../../index';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} = require("react-google-maps");



const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    async componentDidMount() {
      const findDistance = (lat, lng) => {
        return new Promise((resolve, reject) => {
          const DirectionsService = new window.google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new window.google.maps.LatLng(
                this.props.myposition.lat,
                this.props.myposition.lng
              ),
              destination: new window.google.maps.LatLng(lat,lng),
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                resolve({
                  directions: result,
                  distance: result.routes[0].legs[0].distance,
                })
              } else {
                console.error(`error fetching directions ${result}`);
                reject(`error fetching directions ${result}`);
              }
            }
          );
        });
      };
      let { stores } = this.props;
      for(var i=0;i<stores.length;i++){
        try{
          let distance = await findDistance(stores[i].latitude, stores[i].longtitude)
          stores[i].distance =distance;
        } catch(e){
          console.log(e);
        }
      }
      this.props.updateStore(stores)
    },
    componentWillReceiveProps(nextProps){
      console.log("I RECEIVED A NEW PROP",nextProps)
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(
            this.props.myposition.lat,
            this.props.myposition.lng
          ),
          destination: new window.google.maps.LatLng(
            nextProps.selectedWindow ? nextProps.selectedWindow.lat: 0,
            nextProps.selectedWindow ? nextProps.selectedWindow.lng: 0
          ),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              distance: result.routes[0].legs[0].distance,
            });
          } else {
            console.error('error',result);
          }
        }
      )
    }

  })
)((props) => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{
      lat: props.myposition ? props.myposition.lat : 10.0223554,
      lng: props.myposition ? props.myposition.lng : 105.77034019999999,
    }}
  >
    {props.myposition && (
      <Marker
        position={{
          lat: props.myposition.lat,
          lng: props.myposition.lng,
        }}
        icon={{
          url: "/images/car.svg",
          scaledSize: new window.google.maps.Size(25, 25),
        }}
      >
        <InfoWindow>
          <div>Vị trí của bạn</div>
        </InfoWindow>
      </Marker>
    )}

    {props.stores &&
      props.stores.map((store, index) => {
        return (
          <Marker
            key={index}
            position={{
              lat: store.latitude,
              lng: store.longtitude,
            }}
            onClick={() => {
              console.log(store.rating.total)
              props.setSelectedWindow({
                id: store._id,
                name: store.name,
                description: store.description,
                lat: store.latitude,
                lng: store.longtitude,
                distance:store.distance.distance,
                rating: store.rating.total
              });
            }}
          >
            {props.selectedWindow &&
              props.selectedWindow.lat === store.latitude &&
              props.selectedWindow.lng === store.longtitude && (
                <InfoWindow>
                  <div>
                    <Link to={"/store/" + props.selectedWindow.id}>
                      <h5>{props.selectedWindow.name}</h5>
                    </Link>
                    <p>{props.selectedWindow.description}</p>
                    <p>Click vào biểu tượng 1 lần để xem đường đi</p>
                    {props.selectedWindow.distance && (
                    <p>Khoảng cách: {props.selectedWindow.distance.text}</p>
                    )}
                    <Rating star={props.selectedWindow.rating} />
                    <div className="mt-2">
                      <Button color="success"> <i className="fas fa-sms"></i></Button>
                    </div>
                  </div>
                </InfoWindow>
              )}
          </Marker>
        );
      })}

    <DirectionsRenderer directions={props.directions} />
  </GoogleMap>
));

class Map extends React.PureComponent {
  state = {
    selectedWindow: null,
    sort: false,// descending,
    showChat: false
  };
  componentDidMount() {
    this.loadMyposition();
    this.loadStore();
    socket.emit("cuuho", "Hello")
  }

  loadStore = () => {
    if(this.props.stores.length === 0){
      axios()
      .get("/api/store")
      .then((res) => {
        this.props.updateStore(res.data);
      })
      .catch((err) => console.log(err));
    }
  }

  loadMyposition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        myposition: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    },function(err){
      console.log(err)
    });
  };

  setSelectedWindow = (window) => {
    console.log(window);
    this.setState({
      selectedWindow: window,
    });
  };

  chatToggle = () => {
    this.setState({showChat: !this.state.showChat})
  }

  renderStore = () => {
    return this.props.stores && this.props.stores.map(store =>{
      return  <MediaObject 
                store={store}
                setSelectedWindow={this.setSelectedWindow}
                chatToggle={()=>this.props.setChatToggle(true)}
              />
      
    })
  }

  sortStore = () => {
    this.setState({
      sortStore:!this.state.sortStore
    })
    let { stores } = this.props;
    if(!this.state.sortStore) {
      console.log("case1");
       stores.sort((store_1, store_2)=>{
         return store_1.distance.distance.value - store_2.distance.distance.value
       })
    } else {
      console.log("case 2")
      stores.sort((store_1, store_2)=>{
        return  store_2.distance.distance.value - store_1.distance.distance.value  
      })
    }


  }

  render() {
    return (
      <div>
        <Navbar />
        {
          this.state.position !==null 
          ?
          <MyMapComponent
          myposition={this.state.myposition}
          stores={this.state.stores}
          setSelectedWindow={this.setSelectedWindow}
          selectedWindow={this.state.selectedWindow}
          stores={this.props.stores}
          updateStore={this.props.updateStore}
        />
        : "Error"
        }
        <Container className="custom-container">
              <Row>
                  <Col md="12 mt-3">
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h4>Cửa hàng oto gần bạn</h4>
                        <div style={{
                          cursor:"pointer",
                          height:"50px", 
                          width:"50px",
                          textAlign:"center",
                          lineHeight:"50px",
                          fontSize:"42px"
                        }}
                        onClick ={this.sortStore}
                        >
                          {this.state.sortStore ? <i className="fas fa-sort-down"></i> 
                          :  <i className="fas fa-sort-up"></i>
                          }
                        </div>
                      </div>
                      <hr />
                  </Col>
                  <Col md="12">
                      <div style={{height:"500px", overflow:"scroll"}}>
                        {this.renderStore()}
                      </div>
                  </Col>
              </Row>
              {this.props.chat_toggle && <Chat where="customer" />}
          </Container>
        <Footer />
      </div>
    );
  }
}

const mapProp = (state) => ({
  stores: state.stores,
  chat_toggle: state.chat_toggle
});

const mapDispatch = (dispatch) => ({
  updateStore: (stores) => {
    dispatch({
      type: "GET_STORES",
      stores,
    });
  },
  updateService: (services) => {
    dispatch({
      type: "GET_SERVICES",
      services,
    });
  },
  setChatToggle: (state) => {
    dispatch({
      type: "SET_CHAT_TOGGLE",
      state,
    });
  },

});

export default connect(mapProp, mapDispatch)(Map);
