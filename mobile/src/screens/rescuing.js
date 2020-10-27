import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import app_style from '../assets/styles/app_style';
import Geolocation from '@react-native-community/geolocation';
const defaultPosition = {
  lat: 40.712776,
  lng: -74.005974
}
const styles = StyleSheet.create(app_style());
const App = () => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [error, setError] = React.useState(null)
  useEffect(() => {
    getCurrentLocation();
  }, []);
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
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  } 
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: currentLocation ? currentLocation.lat  : defaultPosition.lat, // 40.712776,-74.005974 new york
          longitude: currentLocation ? currentLocation.lng : defaultPosition.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: currentLocation ? currentLocation.lat  : defaultPosition.lat,
            longitude: currentLocation ? currentLocation.lng : defaultPosition.lng,
          }}
          image={require('../assets/images/car.png')}
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
