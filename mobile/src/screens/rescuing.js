import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, ToastAndroid, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import app_style from '../assets/styles/app_style';
import Geolocation from '@react-native-community/geolocation';
import axios from '../service/axios';
import axiosDefault from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Polyline from '@mapbox/polyline';
import {Title, Text, IconButton,Colors } from 'react-native-paper';
import {server} from '../constants/index';
const defaultPosition = {
  lat: 40.712776,
  lng: -74.005974,
};
const styles = StyleSheet.create(app_style());

const Rescue = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [desLat, setDesLat] = React.useState(null);
  const [desLng, setDesLng] = React.useState(null);
  const [storeIndex, setStoreIndex] = React.useState(0);
  const [mapInit, setMapInit] = React.useState(true);
  const [coords, setCoords] = React.useState(null);
  const [selectedStore, setSelectedStore] = React.useState(null);
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store_in_area);
  const markerRef = React.createRef();
  const [updateStore, setUpdateStore] = React.useState(false);
  useEffect(() => {
   // getCurrentLocation();
  }, []);

  const updateStoreDistance = async (currentLatLng,my_store) => {
    try {
      if(currentLatLng) { // haven't update store distances 
        console.log("update distance...");
        for(let i=0;i<my_store.length;i++) {
          let origin = `${currentLatLng.lat},${currentLatLng.lng}`;
          let destination = `${my_store[i].latitude},${my_store[i].longtitude}`;
          let resp = await axiosDefault.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ`,
          );
          my_store[i].distance = {...resp.data.routes[0].legs[0].distance}
        }
        my_store.sort((a,b)=> a.distance.value - b.distance.value)
        dispatch({type: 'GET_STORES', stores: my_store});
        setUpdateStore(true);
      } else{
        for(let i=0;i<my_store.length;i++) {
          my_store[i].distance = null
        }
      }
      dispatch({type:"GET_STORES", stores:my_store})
    } catch(exception) {
      console.log(exception);
    }
  } 

  const getAllLocationAndSort = async (type) => { // 0 is pressing 'Looking Button'
       // -1 'prev ubutton' // 1 is 'Next Button'                                      
    let my_store = [...stores];
    try {
      if(type===1){ // press next button
        if(storeIndex>=my_store.length-1) {
          setSelectedStore({
            id: my_store[0]._id,
            description: my_store[0].description,
            name: my_store[0].name,
            distance: my_store[0].distance.text,
            image: my_store[0].image
          });
          getDirection(my_store[0].latitude, my_store[0].longtitude);
          setStoreIndex(0);
        } else {
          setSelectedStore({
            id: my_store[storeIndex+1]._id,
            description: my_store[storeIndex+1].description,
            name: my_store[storeIndex+1].name,
            distance: my_store[storeIndex+1].distance.text,
            image: my_store[storeIndex+1].image
          });
          getDirection(my_store[storeIndex+1].latitude, my_store[storeIndex+1].longtitude);
          setStoreIndex(storeIndex+1);
        }
      } 
      else if (type===0) {
        setSelectedStore({
          id: my_store[0]._id,
          description: my_store[0].description,
          name: my_store[0].name,
          distance: my_store[0].distance.text,
          image: my_store[0].image
        });
        getDirection(my_store[0].latitude, my_store[0].longtitude);
        setStoreIndex(0);
      }
      else if (type===-1) {
        if(storeIndex<=0) {
          setSelectedStore({
            id: my_store[my_store.length-1]._id,
            description: my_store[my_store.length-1].description,
            name: my_store[my_store.length-1].name,
            distance: my_store[my_store.length-1].distance.text,
            image: my_store[my_store.length-1].image
          });
          getDirection(my_store[my_store.length-1].latitude, my_store[my_store.length-1].longtitude);
          setStoreIndex(my_store.length-1);
        } else {
          setSelectedStore({
            id: my_store[storeIndex-1]._id,
            description: my_store[storeIndex-1].description,
            name: my_store[storeIndex-1].name,
            distance: my_store[storeIndex-1].distance.text,
            image: my_store[storeIndex-1].image
          });
          getDirection(my_store[storeIndex-1].latitude, my_store[storeIndex-1].longtitude);
          setStoreIndex(storeIndex-1);
        }
      }
    } catch (exception) {
      console.log(exception);
    }
  }

  const getDirection = async (lat, lng) => {
    setSelectedLocation({lat, lng});
    const origin = `${currentLocation.lat},${currentLocation.lng}`;
    const destination = `${lat},${lng}`;
    try {
      const resp = await axiosDefault.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ`,
      );
      const respJson = await resp.data;
      const points = Polyline.decode(
        respJson.routes[0].overview_polyline.points,
      );
      const coords = points.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setCoords(coords);
      return respJson.routes[0].legs[0].distance;
    } catch (e) {
      console.log('DIRECTION ERROR');
      console.log(e);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const success = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(success);
        setSelectedLocation(success);
        loadStore(success);
      },
      (error) => {
        loadStore(null);
        if (error) setError(error);
        alert("cannot access to your location");
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const loadStore = (currentLatLng) => {
    axios
      .get('/api/store')
      .then((res) => {
          updateStoreDistance(currentLatLng, res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load stores around you")
      });
  };

  const renderStore = () =>
    stores.map((store) => (
      <Marker
        key={store._id}
        coordinate={{
          latitude: store.latitude,
          longitude: store.longtitude,
        }}
        onPress={() => {
          setSelectedStore({
            id: store._id,
            name: store.name,
            description: store.description,
            distance: store.distance.text,
            image: store.image
          });
          getDirection(store.latitude, store.longtitude)
        }}>
        <Callout tooltip>
          <View style={styles.calloutContainer}>
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.description}>{store.description}</Text>
          </View>
        </Callout>
      </Marker>
    ));


  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#295a59" barStyle="light-content" />
      <View style={styles.container}>
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: selectedLocation
              ? selectedLocation.lat
              : defaultPosition.lat, // 40.712776,-74.005974 new york
            longitude: selectedLocation
              ? selectedLocation.lng
              : defaultPosition.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.0121,
          }}
          onRegionChangeComplete={() => {
            if (mapInit) markerRef.current.showCallout();
            setMapInit(false);
          }}>
          <Marker
            ref={markerRef}
            coordinate={{
              latitude: currentLocation
                ? currentLocation.lat
                : defaultPosition.lat,
              longitude: currentLocation
                ? currentLocation.lng
                : defaultPosition.lng,
            }}>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.title}>Vị trí của bạn?</Text>
              </View>
            </Callout>
          </Marker>
          {renderStore()}
          {coords && (
            <MapView.Polyline
              strokeWidth={4}
              strokeColor="#4496fd"
              coordinates={coords}
            />
          )}
        </MapView>
        {!selectedStore && <View style={styles.barContainer}>
          <Button
            icon={() => (
              <Icon style={{color: '#fff'}} name="search" size={24} />
            )}
            color="#912c16"
            mode="contained"
            onPress={()=>getAllLocationAndSort(0)}>
            LOOKING FOR SOS
          </Button>
        </View>}
        {selectedStore && <View style={styles.infoContainer}>
          <View style={{flexDirection:"row", paddingLeft:8, paddingTop:8}}>
            <View style={{flex:2}}>
              <Title>{selectedStore.name}</Title>
            </View>
            <View style={{flex:1, flexDirection:"row",justifyContent:"flex-end"}}>
              <IconButton
                icon="close"
                animated
                color="red"
                size={20}
                onPress={() => setSelectedStore(null)}
              />
            </View>
          </View>
          <View style={styles.store_info}>
            <View style={{flex: 2}}>
              <Text>{selectedStore.description}</Text>
              <Text style={{ fontSize: 20}}>
                <Icon name="directions-car" color="green" size={15} /> {selectedStore.distance}
              </Text>
              <View style={{flexDirection:"row"}}>
                <Button 
                  style={{backgroundColor:"#1976d2"}} 
                  icon={()=> <Icon name="email" color="#fff" size={20} />}
                  mode="contained" 
                  onPress={()=>navigation.navigate('chat',{
                    store_id: selectedStore.id,
                    store_name: selectedStore.name
                  })}
                >
                  SEND
                </Button>
                <Button  
                  style={{marginLeft:4, backgroundColor:"#dc004e"}}  
                  icon={()=> <Icon color="#fff" name="info" size={20} />}
                  mode="contained" 
                >
                  LEARN MORE
                </Button>
              </View>
              <View style={styles.btnContainer}>
                <IconButton
                  onPress={()=>getAllLocationAndSort(-1)}
                  icon={()=> <Icon name="arrow-back" size={24}/>}
                  size={20}
                  color={Colors.red500}
                />
                <IconButton
                  onPress={()=>getAllLocationAndSort(1)}
                  color="#0f53bf"
                  icon={()=> <Icon name="arrow-forward" color="red" size={24}/>}
                  size={20}
                
                />
              </View>
            </View>
            <View style={styles.info_right}>
              <Image
                style={{width: 90, height: 90}}
                source={{
                  uri: `${server}/images/${selectedStore.image}`,
                }}
              />
            </View>
          </View>
        </View>}
      </View>
    </View>
  );
};
export default Rescue;
