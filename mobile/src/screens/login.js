import React from 'react';
import axios from 'axios';
import {server} from '../constants/index';
import login_style from '../assets/styles/login_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {socket} from './index';
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

const styles = StyleSheet.create(login_style());
export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    //from signup sreen navigate to
    if (props.route.params && props.route.params.email)
      setEmail(props.route.params.email);
  });
  const handleLoginButton = () => {
    setLoading(true);
    axios
      .post(`${server}/api/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        dispatch({type: 'SIGN_IN', isStore: false});
        storeData('user_token', res.data.user_token);
        storeData('id', res.data.id);
        storeData('name', res.data.name);
        storeData('image', res.data.image);
        storeData('address', res.data.address);
        socket.connect(server);
      })
      .catch((err) => {
        alert(err);
        alert('Email or password is incorrect');
        setLoading(false);
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
      <StatusBar backgroundColor="#295a59" barStyle="light-content" />
      <Image
        source={require('../assets/images/logo2.png')}
        style={{height: 150, width: '80%'}}
        resizeMethod="auto"
      />
      <Text style={styles.welcome}>Login</Text>
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
          placeholder="Email..."
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
        <Button onPress={handleLoginButton} color="#fff" mode="contained">
          Login
        </Button>
        <Button
          color="#fff"
          onPress={() => props.navigation.navigate('signup')}>
          Signup
        </Button>
      </View>
      {loading && <ActivityIndicator color="#fff" size="large" />}
    </View>
  );
}
