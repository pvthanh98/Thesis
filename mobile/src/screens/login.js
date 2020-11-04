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
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
              storeData('address',res.data.address)
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
            <StatusBar backgroundColor='#295a59' barStyle="light-content"/>
            <Text style={styles.welcome}>Login To Rescuing App</Text>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons style={styles.iconStyle} name="email" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Email"
                    value={email}
                    onChangeText={text=>setEmail(text)}
                />
            </View>
            <View style={[styles.inputContainer]}>
                <MaterialCommunityIcons style={styles.iconStyle} name="lock-question" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Password"
                    value={password} 
                    secureTextEntry
                    onChangeText={text=>setPassword(text)}
                />
            </View>
            <View style={[styles.inputContainer,{marginTop:20}]}>
                <Button onPress={handleLoginButton} color="#fff" mode="contained">Login</Button>
                <Button color="#fff" >Signup</Button>
            </View>
            <TouchableOpacity style={{marginTop:8}}>
                <Text style={{color:"#69737f", textDecorationLine:"underline", textDecorationColor:"red"}}>Are you store owner ?</Text>
            </TouchableOpacity>
        </View>
    )
}




{/* <TextInput 
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
{loading && <ActivityIndicator size="large" color="#fff" />} */}