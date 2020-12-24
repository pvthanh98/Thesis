import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../service/store_axios';
import MystoreMarker from '../../components/admin_side/home/store_marker';
import RescueTopInfo from '../../components/admin_side/home/rescueInfo';
import OtoMarker from '../../components/admin_side/home/oto_marker';
import Polyline from '@mapbox/polyline';
import axiosDefault from 'axios';
import {Button, IconButton} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../../components/load';
import {socket} from './index';
import PushNotification from "react-native-push-notification";

const defaultPosition = {
  lat: 10.860281,
  lng: 106.650232,
};
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});
export default function Home({navigation}) {
  const isFocused = useIsFocused();
  const mystore = useSelector((state) => state.mystore);
  const dispatch = useDispatch();
  const markerRef = React.createRef();
  const [mapInit, setMapinit] = React.useState(true);
  const [rescueList, setRescueList] = React.useState(null);
  const [selectedOto, setSelectedOto] = React.useState(null);
  const [coords, setCoords] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    loadMyStore();
    socket.on('new_rescue', function () {
      push_rescue_notification();
      loadMyStore();
    });
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      loadMyStore();
      setSelectedOto(null);
    }
  }, [isFocused]);

  const loadMyStore = () => {
    setLoading(true);
    axios
      .get('/api/store/me')
      .then(({data}) => {
        dispatch({type: 'GET_MYSTORE', mystore: data});
        loadOto(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const loadOto = (store) => {
    axios
      .get(`/api/rescue/mobile`)
      .then((resp) => {
        setRescueList(resp.data.rescuelist);
        if (store) {
          updateStoreDistance(
            {
              lat: store.latitude,
              lng: store.longtitude,
            },
            resp.data.rescuelist,
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getDirection = async (lat, lng) => {
    const origin = `${mystore.latitude},${mystore.longtitude}`;
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
    } catch (e) {
      console.log('DIRECTION ERROR');
      console.log(e);
    }
  };

  const updateStoreDistance = async (storeLatLng, otoList) => {
    try {
      if (storeLatLng) {
        // haven't update store distances
        console.log('update distance...');
        for (let i = 0; i < otoList.length; i++) {
          let origin = `${storeLatLng.lat},${storeLatLng.lng}`;
          let destination = `${otoList[i].coordinate.lat},${otoList[i].coordinate.lng}`;
          let resp = await axiosDefault.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAB5wWf_sSXn5sO1KE8JqDPWW4XZ8QKYSQ`,
          );
          otoList[i].distance = {...resp.data.routes[0].legs[0].distance};
        }

        otoList.sort((a, b) => a.distance.value - b.distance.value);
        setRescueList([...otoList]);
      } else {
        for (let i = 0; i < otoList.length; i++) {
          otoList[i].distance = {};
          otoList[i].distance.text = 'không thể tải khoảng cách';
        }
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const renderOtoRescue = () =>
    rescueList.map((e) => (
      <OtoMarker
        setSelectedOto={setSelectedOto}
        key={e._id}
        otoRescue={e}
        getDirection={getDirection}
      />
    ));

  const push_rescue_notification = () => {
    console.log("notification")
    PushNotification.localNotification({
      title:"New rescue",
      messages:"You have an new rescue"
    })
  }

  if (!mystore) return <Loading text="Đang tải vị trí của hàng" />;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00786a" barStyle="light-content" />
      {mystore && (
        <MapView
          showsUserLocation
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: mystore.latitude,
            longitude: mystore.longtitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.0121,
          }}
          onRegionChangeComplete={() => {
            if (mapInit && markerRef.current) {
              markerRef.current.showCallout();
              setMapinit(false);
            }
          }}>
          <MystoreMarker mystore={mystore} markerRef={markerRef} />
          {rescueList && renderOtoRescue()}
          {coords && (
            <MapView.Polyline
              strokeWidth={4}
              strokeColor="#4496fd"
              coordinates={coords}
            />
          )}
        </MapView>
      )}

      {(!mystore || !rescueList) && (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator color="blue" style={{marginTop: 4}} />
          {!rescueList && <Text>Đang tải yêu cầu cứu hộ</Text>}
          
        </View>
      )}
      {selectedOto && (
        <RescueTopInfo
          rescueList={rescueList}
          selectedOto={selectedOto}
          setSelectedOto={setSelectedOto}
          getDirection={getDirection}
          navigation={navigation}
        />
      )}

      {!selectedOto && (
        <View
          style={{marginTop: 4, flexDirection: 'row', alignItems: 'center'}}>
          <Button
            mode="contained"
            icon={() => <MaterialIcon name="search" size={20} color="#fff" />}
            onPress={() => setSelectedOto({...rescueList[0]})}
            disabled={rescueList && rescueList.length > 0 ? false : true}>
            {rescueList && rescueList.length > 0
              ? 'YÊU CẦU CỨU HỘ'
              : 'KHÔNG CÓ YÊU CẦU'}
          </Button>
      {/* //    <Button onPress={push_rescue_notification}>notification</Button> */}
          {!loading ? (
            <IconButton
              icon={() => (
                <MaterialIcon name="refresh" size={20} color="black" />
              )}
              onPress={() => loadMyStore()}
            />
          ) : (
            <ActivityIndicator color="black" />
          )}
          <MaterialIcon name="person" size={20} />
          <Text>{rescueList && rescueList.length}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    backgroundColor: 'white',
    padding: 4,
  },
});
