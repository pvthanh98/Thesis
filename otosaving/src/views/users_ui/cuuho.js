import React from "react";
import Navbar from "../../components/user_ui/navbar";
import Footer from "../../components/user_ui/footer";
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import { Avatar, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from "service/axios_user";
import MediaObject from '../../components/user_ui/media_store';
import Chat from '../../components/user_ui/chat/container';
import Loading from '../../components/user_ui/loading'
import Alert from '@material-ui/lab/Alert';
import CityModal from '../../components/user_ui/city_modal'
import Rating from 'material-ui-rating';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { server } from '../../constant'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import axiosDefault from 'axios';
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
    async updateDistance(stores) {
      console.log("updating distance ");
      const findDistance = (lat, lng) => {
        return new Promise((resolve, reject) => {
          const DirectionsService = new window.google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new window.google.maps.LatLng(
                this.props.myposition.lat,
                this.props.myposition.lng
              ),
              destination: new window.google.maps.LatLng(lat, lng),
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                resolve({
                  directions: result,
                  distance: result.routes[0].legs[0].distance,
                })
              } else {
                console.log("co lou.............................");
                console.error(`error fetching directions ${result}`);
                reject(`error fetching directions ${result}`);
              }
            }
          );
        });
      };

      const sleep = (milisecond) => {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            resolve("ok")
          }, milisecond)
        })
      }
      for (var i = 0; i < stores.length; i++) {
        try {
          let distance = await findDistance(stores[i].latitude, stores[i].longtitude)
          await sleep(100);
          stores[i].distance = distance;
        } catch (e) {
          console.log(e);
        }
      }

      //sort

      if (stores.length > 0 && stores[0].distance) {
        stores.sort((a, b) => {
          if (a.distance && b.distance) return (a.distance.distance.value - b.distance.distance.value);
          else return -1;
        })
      }

      this.props.updateStore(stores)
    },
    async componentDidMount() {
      this.updateDistance(this.props.stores);
    },
    componentWillReceiveProps(nextProps) {
      console.log("I RECEIVED A NEW PROP", nextProps.stores);

      if (this.props.stores.length > 0 && !this.props.stores[0].distance) {
        this.updateDistance(this.props.stores);
      } else console.log("no need to update distance");
      if (this.props.stores[0].city !== nextProps.stores[0].city) this.updateDistance(this.props.stores);
      else console.log("no need to update distance");
      if (nextProps.selectedWindow !== null) {
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: new window.google.maps.LatLng(
              this.props.myposition.lat,
              this.props.myposition.lng
            ),
            destination: new window.google.maps.LatLng(
              nextProps.selectedWindow ? nextProps.selectedWindow.lat : 0,
              nextProps.selectedWindow ? nextProps.selectedWindow.lng : 0
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
              console.error('error', result);
            }
          }
        )
      }

    },
    componentWillMount() {
      console.log("unmount")
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
                phone: store.phone,
                description: store.description,
                image: store.image,
                lat: store.latitude,
                lng: store.longtitude,
                distance: store.distance ? store.distance.distance : "",
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
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ width: "60%" }}>
                        <p><PhoneAndroidIcon /> SDT: {props.selectedWindow.phone}</p>
                        {props.selectedWindow.distance && (
                          <p><DirectionsCarIcon /> Khoảng cách: {props.selectedWindow.distance.text}</p>
                        )}
                      </div>
                      <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Avatar style={{ height: "100px", width: "100px" }} src={`${server}/images/${props.selectedWindow.image}`} />
                      </div>
                    </div>

                    <Rating value={props.selectedWindow.rating} size="large" />
                    <div className="mt-2">
                      <Button
                        variant="contained"
                        startIcon={<MailOutlineIcon />}
                        color="primary"
                        onClick={props.handleClickSendMessage}
                      >
                        GỬI TIN NHẮN
                      </Button>
                      <Button variant="contained" className="ml-2">
                        CHI TIẾT CỬA HÀNG
                      </Button>
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
    showChat: false,
    problems: [],
    myposition: null,
    city: [],
    citySelected: null,
    cityNameSelected: null,
    stores: null,
    openCityModal: true,
    sortStoreByRating:true
  };
  componentDidMount() {
    this.loadMyposition();
    this.loadCarProblems();
    this.getCity();
  }

  handleCityModal = (city_id) => {
    this.loadStore(city_id);
    const index = this.state.city.findIndex(e => (e._id === city_id));
    this.setState({
      citySelected: city_id,
      cityNameSelected: this.state.city[index].name,
      openCityModal: !this.state.openCityModal
    })
  }

  updateStore = (stores) => {
    this.setState({
      stores: [...stores]
    })
  }

  loadStore = (city_id) => {
    axios()
      .get("/api/store/from_city/" + city_id)
      .then((res) => {
        console.log("stores loaded ", res.data);
        this.setState({
          stores: res.data
        })
      })
      .catch((err) => console.log(err));
  }

  loadCarProblems = () => {
    axios()
      .get("/api/problem")
      .then((res) => {
        this.setState({ problems: res.data })
      })
      .catch((err) => console.log(err));
  }

  loadMyposition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("finding.....................................")
      axios().put('/api/user/update_location', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }).then(() => console.log("position saved"))
        .catch(err => console.log(err));

      this.setState({
        myposition: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
      this.findCityFromLatLng( position.coords.latitude,position.coords.longitude,);
      
    }, function (err) {
      console.log(err)
    });
  };

  setSelectedWindow = (window) => {
    this.setState({
      selectedWindow: window,
    });
  };

  chatToggle = () => {
    this.setState({ showChat: !this.state.showChat })
  }

  renderStore = () => {
    return this.state.stores && this.state.stores.map(store => {
      return (
        <MediaObject
          key={store._id}
          store={store}
          setSelectedWindow={this.setSelectedWindow}
          chatToggle={() => this.props.setChatToggle(true)}
          problems={this.state.problems}
          myposition={this.state.myposition}
        />
      )

    })
  }

  sortStore = () => {
    this.setState({
      sortStore: !this.state.sortStore
    })
    let { stores } = this.state;
    if (!this.state.sortStore) {
      console.log("case1");
      stores.sort((store_1, store_2) => {
        return store_1.distance.distance.value - store_2.distance.distance.value
      })
    } else {
      console.log("case 2")
      stores.sort((store_1, store_2) => {
        return store_2.distance.distance.value - store_1.distance.distance.value
      })
    }
  }

  sortStoreByRating = () => {
    this.setState({
      sortStoreByRating: !this.state.sortStoreByRating
    })
    let { stores } = this.state;
    if (!this.state.sortStoreByRating) {
      stores.sort((store_1, store_2) => {
        return store_1.rating.total - store_2.rating.total
      })
    } else {
      stores.sort((store_1, store_2) => {
        return store_2.rating.total - store_1.rating.total
      })
    }
  }

  getCity = () => {
    axios().get('/api/city').then(({ data }) => this.setState({ city: data }))
      .catch(err => console.log(err))
  }

  handleClickSendMessage = () => {
    this.props.setChatToggle(true)
    this.loadMessages();
  };
  loadMessages = () => {
    axios()
      .get(`/api/messages/customer_to/${this.state.selectedWindow.id}`)
      .then(({ data }) => {
        this.props.updateMessage(data);
      })
      .catch((err) => console.log(err));
  };

  findCityFromLatLng = async (lat, lng) => {
    let cityName;
   // setLoadingCityName(true);
    try {
      const resp = await axiosDefault.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ`,
      );
      for (let address of resp.data.results[0].address_components) {
        if (address.types[0] === 'administrative_area_level_1') {
          cityName = address.long_name;
          break;
        }
      }
      console.log(cityName==="Thành phố Hồ Chí Minh")
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    // if (this.state.citySelected === null) return <CitySelection city={this.state.city} getCitySelected={this.getCitySelected} />
    return (
      <div>
        <Navbar />
        { this.state.citySelected && (
          (this.state.myposition !== null
            && this.state.stores !== null
          )
            ?
            <MyMapComponent
              myposition={this.state.myposition}
              setSelectedWindow={this.setSelectedWindow}
              selectedWindow={this.state.selectedWindow}
              stores={this.state.stores}
              updateStore={this.updateStore}
              handleClickSendMessage={this.handleClickSendMessage}
            />
            : <Loading message="Đang tải vị trí của bạn" />
        )
        }
        {this.state.stores && <Container className="custom-container">
          <Row>
            <Col md="12 mt-3">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h4>Cửa hàng oto gần bạn</h4>
                  <p>Thành Phố: {this.state.cityNameSelected}
                  </p>
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                  <div style={{
                    cursor: "pointer",
                    height: "50px",
                    textAlign: "center",
                    lineHeight: "50px",
                  }}
                    onClick={this.sortStore}
                  >
                    Khoảng cách
                  {this.state.sortStore ? <ArrowDropDownIcon size="large" />
                      : <ArrowDropUpIcon size="large" />
                    }

                  </div>
                  <div style={{
                    cursor: "pointer",
                    height: "50px",
                    textAlign: "center",
                    lineHeight: "50px",
                  }}
                    onClick={this.sortStoreByRating}
                  >
                    Đánh giá
                  {this.state.sortStoreByRating ? <ArrowDropDownIcon size="large" />
                      : <ArrowDropUpIcon size="large" />
                    }
                  </div>
                </div>
              </div>
              <hr />
            </Col>
            <Col md="12">
              {
                (this.state.stores.length > 0) ? <div style={{ height: "500px", overflow: "scroll" }}>
                  {this.renderStore()}
                </div>
                  : <div style={{ textAlign: "center", paddingBottom: "16px" }}>
                    <Alert severity="error">Xin lỗi, chúng tôi không tìm được cửa hàng gần bạn</Alert>
                  </div>
              }
            </Col>
          </Row>
          {this.props.chat_toggle && <Chat where="customer" />}
        </Container>}
        <Footer />
        <CityModal open={this.state.openCityModal} city={this.state.city} setOpen={this.handleCityModal} />
      </div>
    );
  }
}

const mapProp = (state) => ({
  chat_toggle: state.chat_toggle
});

const mapDispatch = (dispatch) => ({
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
  updateMessage: (messages) => {
    dispatch({
      type: "UPDATE_MESSAGES",
      messages,
    });
  },

});

export default connect(mapProp, mapDispatch)(Map);
