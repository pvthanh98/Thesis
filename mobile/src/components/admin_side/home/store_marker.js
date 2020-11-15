import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {View, Text, StyleSheet} from 'react-native';
export default ({mystore, markerRef}) => {
  return (
    <Marker
      ref={markerRef}
      coordinate={{
        latitude: mystore ? mystore.latitude : -1,
        longitude: mystore ? mystore.longtitude : -1,
      }}
      image={require('../../../assets/images/car-repair.png')}>
      <Callout tooltip>
        <View style={styles.calloutContainer}>
          <Text>Vị trí cửa hàng</Text>
        </View>
      </Callout>
    </Marker>
  );
};
const styles = StyleSheet.create({
      calloutContainer: {
        backgroundColor: 'white',
        padding: 12,
        maxWidth: 300,
      },
      callout: {
           backgroundColor:"#fff",
           padding:8,
      }
})