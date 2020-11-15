import React from 'react';
import axios from 'axios';
import {server} from '../constants/index';
import login_style from '../assets/styles/login_style';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    View, Text, StyleSheet, StatusBar, TextInput,
    TouchableOpacity, ActivityIndicator
} from 'react-native';


const styles = StyleSheet.create(login_style())
export default function Signup({navigation}) {

    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [passwordRetype, setPasswordRetype] = React.useState("");
    let [name, setName] = React.useState("");
    let [address, setAddress] = React.useState("");
    let [phone, setPhone] = React.useState("");

    let [emailError, setEmailError] = React.useState("");
    let [passwordError, setPasswordError] = React.useState("");
    let [passwordRetypeError, setPasswordRetypeError] = React.useState("");
    let [nameError, setNameError] = React.useState("");
    let [addressError, setAddressError] = React.useState("");
    let [phoneError, setPhoneError] = React.useState("");
    let [loading, setLoading] = React.useState(false);

    const handleFormSubmit = e => {
        e.preventDefault();
        if(validator(email,password,name,address)){
            setLoading(true)
            axios.post(`${server}/api/user`,{
				email,
				password,
				address,
                name,
                phone
			})
			.then(res => {
                alert("Đăng ký thành công");
                navigation.navigate('login',{
                    email: email
                })
				setLoading(false);
			})
			.catch(err => {
                console.log(err);
				setEmailError("Email đã tồn tại")
                setLoading(false);
			})
        }
    }

    const validator = (email, password, name, address) => {
        let isValid = true;
        if(email === "") {
            setEmailError("Email không được phép rỗng");
            isValid=false;
        } else setEmailError("")
        if(password === "") {
            setPasswordError("Password Không được phép rỗng")
            isValid = false
        } else setPasswordError("")
        if(passwordRetype === "") {
            setPasswordRetypeError("Retype password Không được phép rỗng")
            isValid = false
        } else setPasswordError("")

        if(passwordRetype !== password) {
            setPasswordRetypeError("Password không khớp");
            isValid = false
        } else setPasswordRetypeError("");

        if(name === "") {
            setNameError("Tên cửa hàng Không được phép rỗng")
            isValid = false
        } else setNameError("");

        if(phone === "") {
            setPhoneError("Số điện thoại không được rỗng")
            isValid = false
        } else setPhoneError("");

        if(address === "") {
            setAddressError("Địa chỉ cửa hàng Không được phép rỗng")
            isValid = false
        } else setAddressError("")

        return isValid;
    }

    const isNumber = (key) => {
        const number= [1,2,3,4,5,6,7,8,9,0];
        return number.includes(key);
    }

    const setTextPhone = (text) => {
        setPhone(text)
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#295a59' barStyle="light-content"/>
            <Text style={styles.welcome}>ĐĂNG KÝ TÀI KHOẢN</Text>
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
            {(emailError!=="") && <Text style={{color:"#f5aea9", marginTop:4}}>{emailError}</Text>}
            <View style={[styles.inputContainer]}>
                <MaterialCommunityIcons style={styles.iconStyle} name="lock-question" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Mật khẩu"
                    value={password} 
                    secureTextEntry
                    onChangeText={text=>setPassword(text)}
                />
            </View>
            {(passwordError!=="") && <Text style={{color:"#f5aea9", marginTop:4}}>{passwordError}</Text>}
            <View style={[styles.inputContainer]}>
                <MaterialCommunityIcons style={styles.iconStyle} name="book-lock-open" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Nhập lại"
                    value={passwordRetype} 
                    secureTextEntry
                    onChangeText={text=> setPasswordRetype(text)}
                />
            </View>
            {(passwordRetypeError!=="") &&  <Text style={{color:"#f5aea9", marginTop:4}}>{passwordRetypeError}</Text>}
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons style={styles.iconStyle} name="rename-box" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Tên khách hàng"
                    value={name}
                    onChangeText={text=>setName(text)}
                />
            </View>
            {(nameError!=="") && <Text style={{color:"#f5aea9", marginTop:4}}>{nameError}</Text>}
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons style={styles.iconStyle} name="cellphone-message" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Số điện thoại (bắt buộc)"
                    value={phone}
                    maxLength={10}
                    onChangeText={text=>setTextPhone(text)}
                />
            </View>
            {(phoneError!=="") && <Text style={{color:"#f5aea9", marginTop:4}}>{phoneError}</Text>}
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons style={styles.iconStyle} name="city" size={28} color="#fff" />
                <TextInput 
                    style={styles.textInputStyle} 
                    placeholderTextColor="#fff" 
                    placeholder="Địa chỉ (nơi ở của bạn)"
                    value={address}
                    onChangeText={text=>setAddress(text)}
                />
            </View>
            {(addressError!=="") && <Text style={{color:"#f5aea9", marginTop:4}}>{addressError}</Text>}
            <View style={[styles.inputContainer,{marginTop:20}]}>
                {loading &&  <ActivityIndicator color="red" size={20} style={{marginRight:8}} /> }
                <Button onPress={handleFormSubmit} color="#fff" mode="contained">
                 ĐỒNG Ý
                </Button>
                <Button 
                    color="#fff" 
                    onPress={()=>navigation.navigate('welcome')}
                >
                    HỦY
                </Button>

            </View>
            <TouchableOpacity style={{marginTop:8}}>
                <Text style={{color:"#69737f", textDecorationLine:"underline", textDecorationColor:"red"}}>Are you store owner ?</Text>
            </TouchableOpacity>
        </View>
    )
}

