import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Title} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {server} from '../../constants/index'
export default function Home(props) {
  const dispatch = useDispatch();
  const mystore = useSelector(state => state.mystore)
  console.log(mystore);
  const logout = async () => {
    await AsyncStorage.removeItem('admin_token');
    await AsyncStorage.removeItem('admin_name');
    await AsyncStorage.removeItem('admin_id');
    await AsyncStorage.removeItem('admin_avt');
    dispatch({type: 'SIGN_OUT'});
  };
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Avatar.Image source={{uri: `${server}/images/${mystore.image}`}} size={70} />
        <View >
            <Title style={{marginLeft:8}}>{mystore.name}</Title>
            <Text style={{marginLeft:8}}>{mystore.description}</Text>
        </View>
      </View>
      <View style={styles.item}>
          <MaterialIcons name="person" size={24} /> 
          <TouchableOpacity onPress={()=>props.navigation.navigate('profile')} style={styles.btn}>
              <Text>Thông tin</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <MaterialIcons name="logout" size={24} /> 
         <TouchableOpacity style={styles.btn} onPress={logout}>
              <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 4},
  item: {
    flexDirection: 'row',
    marginTop:8,
    alignItems:"center"
  },
  btn: {
      padding:12,
      width:"100%",
      borderBottomWidth:1,
      borderColor:"#ddd"
  }
});
