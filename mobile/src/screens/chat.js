import React, {useEffect} from 'react';
import {
    View, StyleSheet, TouchableOpacity, 
    TextInput, StatusBar, FlatList
} from 'react-native';
import { Text } from 'react-native-paper';
import ChatItem from '../components/chat/Item';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../service/axios';
import {useSelector, useDispatch} from 'react-redux';
import {socket} from './index';
import Load from '../components/load';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
export default ({route, navigation}) => {
    const {store_id, store_name} = route.params;
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();
    const [msgInput, setMsgInput] = React.useState("")
    useEffect(()=>{
      navigation.setOptions({ title: store_name });
      loadMessages(store_id);  
      return () => {
        navigation.setOptions({ title: ""});
        dispatch({type:"UPDATE_MESSAGES", messages: {
            info: {customer:"", store:""},
            content: []
        }})
      }
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
    if(!messages.info.store.name) return  <Load />
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
            <View style={styles.chatContainer}>
                <AutoScrollFlatList
                    data= {messages.content}
                    renderItem={({item})=>(
                        <ChatItem {...item} />
                    )}
                    keyExtractor={item => item._id}
                />
            </View>
            <View style={styles.inputContainer}>
               <TextInput 
                    placeholder="Type your message..."
                    multiline
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
        flex:1,
    },
    inputContainer: {
        minHeight:50,
        flexDirection:"row",
        marginTop:4,
        padding:4,
        alignItems:"center"
    },
    inputStyle: {
        height:"100%",
        backgroundColor:"#fff",
        flex:1,
        borderWidth:1,
        borderColor:"#ddd",
        borderRadius:50,
        padding:10,
        marginRight:4
    },
    buttonStyle: {
        backgroundColor:"#1976d2",
        justifyContent:"center",
        padding:8,
        width:50,
        height:50,
        borderRadius: 46
    },
});