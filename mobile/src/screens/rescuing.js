import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, Modal, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import app_style from '../assets/styles/app_style';
import Geolocation from '@react-native-community/geolocation';
import axios from '../service/axios';
import axiosDefault from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Polyline from '@mapbox/polyline';
import {Title, Text} from 'react-native-paper';
import GLoading from '../components/load';
import RNPickerSelect from 'react-native-picker-select';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StoreInfo from '../components/rescue/store_info';
const defaultPosition = {
  lat: 40.712776,
  lng: -74.005974,
};
const styles = StyleSheet.create(app_style());

const Rescue = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [storeIndex, setStoreIndex] = React.useState(0);
  const [mapInit, setMapInit] = React.useState(true);
  const [coords, setCoords] = React.useState(null);
  const [selectedStore, setSelectedStore] = React.useState(null);
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store_in_area);
  const markerRef = React.createRef();
  const [globalLoading, setGlobalLoading] = React.useState(true);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [problemID, setProblemID] = React.useState('');
  const [carProblems, setCarProblems] = React.useState([]);

  useEffect(() => {
    getCurrentLocation();
    loadCarProblems();
  }, []);

  const loadCarProblems = () => {
    axios
      .get('/api/problem')
      .then((res) => {
        setCarProblems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };

  const requestRescue = () => {
    console.log(selectedStore.id, problemID);
    if (problemID != '') {
      axios
        .post('/api/rescue', {store_id: selectedStore.id, problem: problemID})
        .then((resl) => {
          alert('Yêu cầu của bạn đã được gửi');
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert('Bạn phải chọn vấn đề');
    setModalVisible(false);
  };

  const renderCarProblems = () => {
    return carProblems.map((e) => ({
      label: e.name,
      value: e._id,
    }));
  };

  const updateStoreDistance = async (currentLatLng, my_store) => {
    try {
      console.log('start loading stores...');
      if (currentLatLng) {
        // haven't update store distances
        console.log('update distance...');
        for (let i = 0; i < my_store.length; i++) {
          let origin = `${currentLatLng.lat},${currentLatLng.lng}`;
          let destination = `${my_store[i].latitude},${my_store[i].longtitude}`;
          let resp = await axiosDefault.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ`,
          );
          my_store[i].distance = {...resp.data.routes[0].legs[0].distance};
        }
        my_store.sort((a, b) => a.distance.value - b.distance.value);
        dispatch({type: 'GET_STORES', stores: my_store});
      } else {
        for (let i = 0; i < my_store.length; i++) {
          my_store[i].distance = null;
        }
      }
      dispatch({type: 'GET_STORES', stores: my_store});
    } catch (exception) {
      console.log(exception);
    }
  };

  const getAllLocationAndSort = async (type) => {
    // 0 is pressing 'Looking Button'
    // -1 'prev ubutton' // 1 is 'Next Button'
    let my_store = [...stores];
    try {
      if (type === 1) {
        // press next button
        if (storeIndex >= my_store.length - 1) {
          setSelectedStore({
            id: my_store[0]._id,
            description: my_store[0].description,
            name: my_store[0].name,
            distance: my_store[0].distance.text,
            image: my_store[0].image,
            rating: {
              averate: my_store[0].rating.total,
              total: parseInt(my_store[0].rating.one) + parseInt(my_store[0].rating.two) 
              + parseInt(my_store[0].rating.three) +parseInt(my_store[0].rating.four) +  parseInt(my_store[0].rating.five)
            }
          });
          getDirection(my_store[0].latitude, my_store[0].longtitude);
          setStoreIndex(0);
        } else {
          setSelectedStore({
            id: my_store[storeIndex + 1]._id,
            description: my_store[storeIndex + 1].description,
            name: my_store[storeIndex + 1].name,
            distance: my_store[storeIndex + 1].distance.text,
            image: my_store[storeIndex + 1].image,
            rating: {
              averate: my_store[storeIndex + 1].rating.total,
              total: parseInt(my_store[storeIndex + 1].rating.one) + parseInt(my_store[storeIndex + 1].rating.two) 
              + parseInt(my_store[storeIndex + 1].rating.three) +parseInt(my_store[storeIndex + 1].rating.four) +  parseInt(my_store[storeIndex + 1].rating.five)
            }
          });
          getDirection(
            my_store[storeIndex + 1].latitude,
            my_store[storeIndex + 1].longtitude,
          );
          setStoreIndex(storeIndex + 1);
        }
      } else if (type === 0) {
        setSelectedStore({
          id: my_store[0]._id,
          description: my_store[0].description,
          name: my_store[0].name,
          distance: my_store[0].distance.text,
          image: my_store[0].image,
          rating: {
            averate: my_store[0].rating.total,
            total: parseInt(my_store[0].rating.one) + parseInt(my_store[0].rating.two) 
            + parseInt(my_store[0].rating.three) +parseInt(my_store[0].rating.four) +  parseInt(my_store[0].rating.five)
          }
        });
        getDirection(my_store[0].latitude, my_store[0].longtitude);
        setStoreIndex(0);
      } else if (type === -1) {
        if (storeIndex <= 0) {
          setSelectedStore({
            id: my_store[my_store.length - 1]._id,
            description: my_store[my_store.length - 1].description,
            name: my_store[my_store.length - 1].name,
            distance: my_store[my_store.length - 1].distance.text,
            image: my_store[my_store.length - 1].image,
            rating: {
              averate: my_store[my_store.length - 1].rating.total,
              total: parseInt(my_store[my_store.length - 1].rating.one) + parseInt(my_store[my_store.length - 1].rating.two) 
              + parseInt(my_store[my_store.length - 1].rating.three) +parseInt(my_store[my_store.length - 1].rating.four) +  parseInt(my_store[my_store.length - 1].rating.five)
            }
          });
          getDirection(
            my_store[my_store.length - 1].latitude,
            my_store[my_store.length - 1].longtitude,
          );
          setStoreIndex(my_store.length - 1);
        } else {
          setSelectedStore({
            id: my_store[storeIndex - 1]._id,
            description: my_store[storeIndex - 1].description,
            name: my_store[storeIndex - 1].name,
            distance: my_store[storeIndex - 1].distance.text,
            image: my_store[storeIndex - 1].image,
            rating: {
              averate: my_store[storeIndex - 1].rating.total,
              total: parseInt(my_store[storeIndex - 1].rating.one) + parseInt(my_store[storeIndex - 1].rating.two) 
              + parseInt(my_store[storeIndex - 1].rating.three) +parseInt(my_store[storeIndex - 1].rating.four) +  parseInt(my_store[storeIndex - 1].rating.five)
            }
          });
          getDirection(
            my_store[storeIndex - 1].latitude,
            my_store[storeIndex - 1].longtitude,
          );
          setStoreIndex(storeIndex - 1);
        }
      }
    } catch (exception) {
      console.log(exception);
    }
  };

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
    setGlobalLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const success = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(success);
        setSelectedLocation(success);
        loadStore(success);
        setGlobalLoading(false);
        setError(false);
      },
      (error) => {
        setError(true);
        loadStore(null);
        if (error) setError(error);
        alert('cannot access to your location');
        setGlobalLoading(false);
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  const loadStore = (currentLatLng) => {
    console.log('start loading stores...');
    axios
      .get('/api/store')
      .then((res) => {
        updateStoreDistance(currentLatLng, res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to load stores around you');
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
            image: store.image,
            rating: {
              averate: store.rating.total,
              total: parseInt(store.rating.one) + parseInt(store.rating.two) 
              + parseInt(store.rating.three) +parseInt(store.rating.four) +  parseInt(store.rating.five)
            }
          });
          getDirection(store.latitude, store.longtitude);
        }}>
        <Callout tooltip>
          <View style={styles.calloutContainer}>
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.description}>{store.description}</Text>
          </View>
        </Callout>
      </Marker>
    ));

  if (globalLoading) return <GLoading />;
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
            }}
            image={require('../assets/images/test.png')}>
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
        {error && (
          <View style={styles.topBox}>
            <Text style={{color: 'red'}}>
              Có lỗi, không thể tải vị trí của bạn
            </Text>
            <TouchableOpacity onPress={getCurrentLocation}>
              <Text style={{textDecorationLine: 'underline'}}>Thử lại?</Text>
            </TouchableOpacity>
          </View>
        )}
        {!selectedStore && (
          <View style={styles.barContainer}>
            <Button
              icon={() => (
                <Icon style={{color: '#fff'}} name="search" size={24} />
              )}
              color="#295a59"
              mode="contained"
              onPress={() => getAllLocationAndSort(0)}>
              LOOKING FOR SOS
            </Button>
          </View>
        )}
        {selectedStore && (
          <StoreInfo
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            getAllLocationAndSort={getAllLocationAndSort}
            setModalVisible={setModalVisible}
            navigation={navigation}
          />
        )}
      </View>
      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title style={styles.modalText}>
              {selectedStore && selectedStore.name}
            </Title>
            <Text>Vấn đề của bạn là gì?</Text>
            <RNPickerSelect
              onValueChange={(value) => setProblemID(value)}
              value={problemID}
              items={renderCarProblems()}
            />
            <View style={{marginTop: 8, flexDirection: 'row-reverse'}}>
              <Button
                style={{marginLeft: 4}}
                mode="contained"
                onPress={requestRescue}>
                Yêu cầu cứu hộ
              </Button>
              <Button
                mode="contained"
                color="#91063b"
                onPress={() => setModalVisible(false)}>
                Hủy
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Rescue;
