import React from 'react';
import axios from 'axios';
import {server} from '../../constants/index';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {socket} from './index';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#69737f',
    padding: 12,
  },
  welcome: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    marginBottom: 24,
  },
  textInputStyle: {
    color: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: '80%',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  iconStyle: {
    marginRight: 4,
  },
  btn: {
    padding: 8,
    margin: 4,
  },
});
export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  6;
  const handleLoginButton = () => {
    setLoading(true);
    axios
      .post(`${server}/api/store/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        dispatch({type: 'SIGN_IN', isStore: true});
        storeData('admin_token', res.data.admin_token);
        storeData('admin_name', res.data.admin_name);
        storeData('admin_id', res.data.admin_id);
        storeData('admin_avt', res.data.admin_avt);
        socket.connect(server);
      })
      .catch((err) => {
        console.log(err);
        {
          alert('Email or password is incorrect');
          setLoading(false);
        }
      });
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#69737f" barStyle="light-content" />
      
      <Image
        source={require('../../assets/images/logo1.png')}
        style={{height: 150, width: '100%'}}
        resizeMethod="auto"
      />
      <Text style={styles.welcome}>OTO RESCUING</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          style={styles.iconStyle}
          name="email"
          size={28}
          color="#fff"
        />
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="#fff"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <MaterialCommunityIcons
          style={styles.iconStyle}
          name="lock-question"
          size={28}
          color="#fff"
        />
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="#fff"
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.inputContainer, {marginTop: 20}]}>
        <Button
        //   style={{width: 200, marginRight: 4}}
          onPress={handleLoginButton}
          color="#fff"
          mode="contained">
          Đăng nhập - cửa hàng
        </Button>
        {loading && <ActivityIndicator size="large" color="#fff" />}
      </View>
      <TouchableOpacity style={{marginTop: 8}}>
        <Text
          style={{
            color: '#fff',
            textDecorationLine: 'underline',
            textDecorationColor: 'red',
          }}>
          Bạn muốn đăng ký cửa hàng? truy cập vào website
        </Text>
      </TouchableOpacity>
    </View>
  );
}
