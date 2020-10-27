import React from 'react';
import axios from 'axios';
import {server} from '../constants/index';
import login_style from '../assets/styles/login_style';
import {
    View, Text, StyleSheet, StatusBar, TextInput,
    TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
const styles = StyleSheet.create(login_style())
export default function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();6
    const handleLoginButton = () => {
        setLoading(true)
        axios
          .post(`${server}/api/user/login`,{
              email: email,
              password: password
          })
          .then((res) => {
              setLoading(false);  
              dispatch({type:"SIGN_IN", user_token: res.data.user_token})
              storeData('user_token', res.data.user_token);
              storeData('id', res.data.id);
              storeData('name', res.data.name);
              storeData('image', res.data.image);
          })
          .catch((err) => {alert("Email or password is incorrect");   setLoading(false);});
    }

    const storeData = async (key,value) => {
        try {
          await AsyncStorage.setItem(key, value)
          console.log("token saved")
        } catch (e) {
          console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1e90ff" barStyle="light-content"/>
            <Text style={styles.welcome}>Login To Rescuing App</Text>
            <TextInput 
                style={styles.inputText} 
                placeholder="Email" 
                value={email}
                onChangeText={text=>setEmail(text)}
            />
            <TextInput 
                style={styles.inputText} 
                placeholder="Password" 
                value={password} 
                secureTextEntry
                onChangeText={text=>setPassword(text)}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={handleLoginButton}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Signup</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
    )
}