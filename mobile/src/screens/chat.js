import React from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView} from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Mine from '../components/chat/mine';
import Your from '../components/chat/yours';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default (props) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
            <View style={styles.chatContainer}>
                <ScrollView>
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                    <Mine message={"Xin chào, tôi tên Thành"} />
                    <Your message={"Chào bạn, tôi có thể giúp gì cho bạn"} />
                </ScrollView>
            </View>
            <View style={styles.inputContainer}>
               <TextInput 
                    placeholder="Type your message..."
                    style={styles.inputStyle}
                />
               <TouchableOpacity
                style={styles.buttonStyle}
               >
                   <Text style={{color:"white", textAlign:"center"}}><Icon name="send" size={24} /></Text>
               </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    chatContainer: {
        flex:10,
    },
    inputContainer: {
        flex:1,
        flexDirection:"row",
        borderTopWidth:1,
        borderTopColor:"#ddd"
    },
    inputStyle: {
        width:"80%",
        height:"100%",
        backgroundColor:"#fff"
    },
    buttonStyle: {
        backgroundColor:"#1976d2",
        justifyContent:"center",
        padding:8,
        width:"20%"
    },
});