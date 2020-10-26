import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutContainer: {
    backgroundColor:"white",
    padding:8
  },
  title : {
    fontSize: 16,
    fontWeight:"bold"
  },
  description: {

  }
 });
const App = () => {
  useEffect(() => {
    testServer();
    console.log("Component did mount");
  }, []);

  const testServer = () => {
    axios.get('http://192.168.3.126:8080/api/welcome')
    .then(res=> console.log(res.data))
    .catch(err=>console.log(err))
  }
  return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}  
       region={{
         latitude: 10.022769, // 10.022769 105.765579
         longitude: 105.765579,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
        <Marker 
          coordinate={{
            latitude: 10.022769,
            longitude: 105.765579,
          }}
          title="This is my location"
          description="Thanhphan generation"
        >
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.title}>Công ty ThanhPhan</Text>
              <Text style={styles.description}>Cung cấp các giải pháp về công nghệ thông tin</Text>
            </View>
          </Callout>
        </Marker>
     </MapView>
   </View>
  );
};
export default App;
