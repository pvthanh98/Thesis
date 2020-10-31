import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView} from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Mine from '../components/chat/mine';
import Your from '../components/chat/yours';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../service/axios';
import {useSelector, useDispatch} from 'react-redux';
import {socket} from './index';
export default ({route, navigation}) => {
    const {store_id} = route.params;
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const [msgInput, setMsgInput] = React.useState("")
    useEffect(()=>{
      loadMessages(store_id);  
    },[])

    const loadMessages = (store_id) => {
        axios('/api/messages/customer_to/'+store_id)
        .then(({data})=>{
            dispatch({type:"UPDATE_MESSAGES", messages: data})
        })
    }

    const sendMessage = () => {
        loadMessageLocal();
        socket.emit("customer_send_msg", {
            to: messages.info.store.id,
            body: msgInput
        });
        setMsgInput("");
    }

    const loadMessageLocal = () => {
        let newMsg = {
          is_store:false,
          body: msgInput,
          timestamp: new Date().toISOString()
        }
        let newMsgContent = [...messages.content];
        newMsgContent.push(newMsg);
        let newMessages = {
          info: {...messages.info},
          content: newMsgContent
        }
        dispatch({type:"UPDATE_MESSAGES", messages: newMessages});
    }

    const renderMessages = () => (
        messages.content.map(msg=>{
            if(msg.is_store) return <Your key={msg._id} message={msg.body} />
            else return <Mine key={msg._id} message={msg.body} />
        })
    )

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
            <View style={styles.chatContainer}>
                <ScrollView>
                 {renderMessages()}
                </ScrollView>
            </View>
            <View style={styles.inputContainer}>
               <TextInput 
                    placeholder="Type your message..."
                    style={styles.inputStyle}
                    value={msgInput}
                    onChangeText={text=>setMsgInput(text)}
                />
               <TouchableOpacity
                style={styles.buttonStyle}
                onPress={sendMessage}
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