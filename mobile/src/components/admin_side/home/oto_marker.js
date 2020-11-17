import React from 'react';
import { Marker, Callout} from 'react-native-maps';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export default (props) => {
  return (
    <Marker
        key={props._id}
        coordinate={{
            latitude: props.otoRescue.coordinate.lat,
            longitude: props.otoRescue.coordinate.lng
        }}
        onPress={()=> {
            props.setSelectedOto({...props.otoRescue});
            props.getDirection(props.otoRescue.coordinate.lat,props.otoRescue.coordinate.lng)
        }}
    >
        {/* <Callout tooltip>
            <View style={styles.calloutContainer}>
                <View style={styles.calloutItem}>
                    <MaterialIcon name="person" color="#962803" size={16} />
                    <Text>{" " + props.customer_id.name}</Text>
                </View>
                <View style={styles.calloutItem}>
                    <MaterialIcon name="phone" color="#962803" size={16} />
                    <Text> {" " + props.customer_id.phone} </Text>
                </View>
                <View style={styles.calloutItem}>
                    <MaterialIcon name="home-repair-service" color="#962803" size={16} />
                    <Text> {" " + props.problem.name} </Text>
                </View>
                
            </View>

        </Callout> */}

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
      },
      calloutItem: {
        flexDirection:"row",
        alignItems:"center"
    },
})