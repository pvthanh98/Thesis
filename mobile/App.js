import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import app_style from './src/assets/styles/app_style';
import Geolocation from '@react-native-community/geolocation';
const styles = StyleSheet.create(app_style());
const App = () => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [error, setError] = React.useState(null)
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const testServer = () => {
    axios
      .get('http://192.168.3.126:8080/api/welcome')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const success = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(success)
        setCurrentLocation(success);
      },
      error => {
        if(error) setError(error);
        console.log(error);
      }
    )
  } 
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: currentLocation ? currentLocation.lat  : 10.022769, // 10.022769 105.765579
          longitude: currentLocation ? currentLocation.lng : 105.765579,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: currentLocation ? currentLocation.lat  : 10.022769,
            longitude: currentLocation ? currentLocation.lng : 105.765579,
          }}
          image={require('./src/assets/images/car.png')}
        >
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.title}>Công ty ThanhPhan</Text>
              <Text style={styles.description}>
                Cung cấp các giải pháp về công nghệ thông tin
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};
export default App;
