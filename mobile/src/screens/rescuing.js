import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, ToastAndroid, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import app_style from '../assets/styles/app_style';
import Geolocation from '@react-native-community/geolocation';
import axios from '../service/axios';
import axiosDefault from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Polyline from '@mapbox/polyline';
import {Title, Text} from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
const defaultPosition = {
  lat: 40.712776,
  lng: -74.005974
}
const styles = StyleSheet.create(app_style());

const Rescue = () => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [desLat, setDesLat] = React.useState(null);
  const [desLng, setDesLng] = React.useState(null);
  const [mapInit, setMapInit] = React.useState(true); 
  const [coords, setCoords] = React.useState(null);
  const dispatch = useDispatch();
  const stores = useSelector(state => state.store_in_area);
  const markerRef = React.createRef();
  useEffect(() => {
    getCurrentLocation();
    loadStore();
  }, []);

  const getDirection = async (lat, lng) => {
    setSelectedLocation({lat,lng})
    const origin = `${currentLocation.lat},${currentLocation.lng}`;
    const destination = `${lat},${lng}`;
    try {
      const resp =  await axiosDefault.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ`)
      const respJson = await resp.data;
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => ({
        latitude: point[0],
        longitude: point[1]
      }))
      setCoords(coords);
    } catch(e) {
      console.log("DIRECTION ERROR")
      console.log(e)
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => { 
        const success = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentLocation(success);
        setSelectedLocation(success);
      },
      error => {
        if(error) setError(error);
        ToastAndroid.show("Cannot access to your location", ToastAndroid.SHORT);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  } 

  const loadStore = () => {  
    axios
    .get("/api/store")
    .then((res) => {
      dispatch({type:"GET_STORES",stores: res.data})
    })
    .catch((err) => console.log(err));
  }

  const renderStore = () => (
     stores.map(store=> (
      <Marker
        key={store._id}
        coordinate={{
          latitude: store.latitude,
          longitude: store.longtitude,
        }} 
        onPress={()=>getDirection(store.latitude, store.longtitude)}
      >
        <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.title}>{store.name}</Text>
              <Text style={styles.description}>
                {store.description}
              </Text>
            </View>
          </Callout>
      </Marker>
    ))
  )

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
  }
  
  return (
   <View style={{flex:1}}>
      <StatusBar backgroundColor="#912c16" barStyle="light-content"/>
      <View style={styles.container}>
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: selectedLocation ? selectedLocation.lat  : defaultPosition.lat, // 40.712776,-74.005974 new york
            longitude: selectedLocation ? selectedLocation.lng : defaultPosition.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.0121,
          }}
          onRegionChangeComplete={() => {
            if(mapInit) markerRef.current.showCallout()
            setMapInit(false)
          }}
        >
          <Marker
            ref={markerRef}
            coordinate={{
              latitude: currentLocation ? currentLocation.lat  : defaultPosition.lat,
              longitude: currentLocation ? currentLocation.lng : defaultPosition.lng,
            }}
          >
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.title}>Vị trí của bạn?</Text>
              </View>
            </Callout>
          </Marker>
          {renderStore()}
          {coords && <MapView.Polyline strokeWidth={4} strokeColor = "#4496fd" coordinates={coords}/>}
        </MapView>
        <View style={styles.barContainer}>
          <Button 
            icon={()=> <Icon style={{color:"#fff"}} 
            name="search" size={24} />} 
            color="#912c16" 
            mode="contained" 
            onPress={() => console.log('Pressed')}
          >
              LOOKING FOR SOS
          </Button>
        </View>
        <View style={styles.store_info}>
            <View style={{flex:2}}>
              <Title>Công ty TNHH ThanhPhan</Title>
              <Text>Hello xin chào các bạn</Text>
              <Text style={{marginTop:4, fontSize:20}}><Icon name="directions-car" color="green" size={15} /> 12km</Text>
              <Button 
                  style={{marginTop:4}}
                  icon={()=> <Icon style={{color:"#fff"}}  name="send"  size={24} />} 
                  mode="contained" 
                  color="#dc004e"
                  onPress={() => console.log('Pressed')}
                >
                    SEND MESSAGE
              </Button>
              <View style={styles.btnContainer}>
                <Button 
                  icon={()=> <Icon style={{color:"black"}}  name="skip-previous"  size={24} />} 
                  mode="contained" 
                  color="#e0e0e0"
                  onPress={() => console.log('Pressed')}
                >
                    PREV
                </Button>
                <Button 
                  style={{marginLeft:8}}
                  icon={()=> <Icon style={{color:"#fff"}}  name="skip-next"  size={24} />} 
                  mode="contained" 
                  color="#0f53bf"
                  onPress={() => console.log('Pressed')}
                >
                    NEXT
                </Button>
              </View>
            </View>
            <View style={styles.info_right}>
                <Image
                  style={{ width: 90, height: 90}}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
            </View>
        </View>
      </View>
  </View>
  );
};
export default Rescue;

