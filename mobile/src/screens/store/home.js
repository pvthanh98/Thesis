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
import Loading from '../../components/load';
import axios from '../../service/store_axios';
import MystoreMarker from '../../components/admin_side/home/store_marker';
import RescueTopInfo from '../../components/admin_side/home/rescueInfo';
import OtoMarker from '../../components/admin_side/home/oto_marker';
import Polyline from '@mapbox/polyline';
import axiosDefault from 'axios';

const defaultPosition = {
  lat: 10.860281,
  lng: 106.650232,
};
export default function Home(props) {
  const mystore = useSelector((state) => state.mystore);
  const dispatch = useDispatch();
  const markerRef = React.createRef();
  const [mapInit, setMapinit] = React.useState(true);
  const [rescueList, setRescueList] = React.useState(null);
  const [selectedOto, setSelectedOto] = React.useState(null);
  const [coords, setCoords] = React.useState(null);

  React.useEffect(() => {
    loadMyStore();
  }, []);

  const loadMyStore = () => {
    console.log('loading stores');
    axios
      .get('/api/store/me')
      .then(({data}) => {
        dispatch({type: 'GET_MYSTORE', mystore: data});
        loadOto(data);
      })
      .catch((err) => console.log(err));
  };

  const loadOto = (store) => {
    axios
      .get(`/api/rescue/mobile`)
      .then((resp) => {
        setRescueList(resp.data.rescuelist);
        if(store){
          updateStoreDistance(
            {
              lat: store.latitude,
              lng: store.longtitude,
            },
            resp.data.rescuelist    
          );
        }

      })
      .catch((err) => console.log(err));
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
          let destination = `${otoList[i].customer_id.latitude},${otoList[i].customer_id.longtitude}`;
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
      <OtoMarker setSelectedOto={setSelectedOto} key={e._id} otoRescue={e} getDirection={getDirection} />
    ));

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
            latitude: selectedOto
              ? selectedOto.customer_id.latitude
              : mystore.latitude,
            longitude: selectedOto
              ? selectedOto.customer_id.longtitude
              : mystore.longtitude,
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
          {!mystore && <Text>Đang tải yêu cầu cứu hộ</Text>}
        </View>
      )}
      {selectedOto && (
        <RescueTopInfo
          rescueList={rescueList}
          selectedOto={selectedOto}
          setSelectedOto={setSelectedOto}
          getDirection={getDirection}
        />
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
