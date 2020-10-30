import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Avatar, Title, Text } from 'react-native-paper';
import {server} from '../constants/index';
class UserInfo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         <Avatar.Image size={150} source={{
             uri: `${server}/images/tuanh.jpg`
         }} />
         <Title>Huỳnh Thị Tú Anh</Title>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default UserInfo;
