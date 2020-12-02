import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {server} from '../constants/index';
import {socket} from '../screens/index';
export default (props) => {
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    getInfo();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_token');
      dispatch({type: 'SIGN_OUT'});
      socket.disconnect();
      return true;
    } catch (exception) {
      console.log(exception);
      return false;
    }
  };

  const getInfo = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const image = await AsyncStorage.getItem('image');
      const address = await AsyncStorage.getItem('address');
      const id = await AsyncStorage.getItem('id');
      setName(name);
      setId(id);
      setImage(image);
      setAddress(address);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userContainer}>
          <Avatar.Image
            source={{
              uri: `${server}/images/${image}`,
            }}
          />
          <View style={styles.userNameContainer}>
            <Title style={styles.username}>{name}</Title>
            <Caption style={{marginLeft: 16}}>{address}</Caption>
          </View>
        </View>
        <Drawer.Section style={styles.ItemContainer}>
        <DrawerItem
            label="Trang chủ"
            onPress={() => props.navigation.navigate('rescuing')}
            icon={() => <Icon name="home-outline" size={25} color="black" />}
        />
        <DrawerItem
            label="Thông tin khách hàng"
            onPress={() => props.navigation.navigate('info')}
            icon={() => <Icon name="account-circle-outline" size={25} color="black" />}
        />
        <DrawerItem
            label="Lịch sử cứu hộ"
            onPress={() => props.navigation.navigate('history')}
            icon={() => <Icon name="history" size={25} color="black" />}
        />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
            label="Đăng xuất"
            onPress={logout}
            icon={() => <Icon name="logout" size={25} color="black" />}
        />
        </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 24,
    marginLeft: 12,
    flexDirection: 'row',
  },
  username: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: 'bold',
  },
  userNameContainer: {
    justifyContent: 'center',
  },
  ItemContainer: {
    marginTop: 12,
  },
});
