import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../service/store_axios';
import Loading from '../../../components/load';
import ChatItem from '../../../components/admin_side/message/chat_list_item';
import {socket} from '../index';
const MessageList = ({navigation,route}) => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.message_store_list);
    const {setOptions} = route.params
    React.useEffect(()=>{
        socket.on("customer_send_msg_to_you",(data)=>{
          loadListMessages()
          loadMessages(data.from_id);
        });
        socket.on("refresh_message",()=>{
          loadListMessages();
        })
    },[]);

    const loadListMessages = () => {
        axios.get("/api/messages/store_list")
        .then(({data})=>{
          dispatch({type:"UPDATE_MESSAGE_STORE_LIST", messages: data});
          setOptions({tabBarBadge: data.unread})
        })
        .catch(err=>console.log(err))
    }
    const loadMessages = (customer_id) => {
      axios.get(`/api/messages/store_to/${customer_id}`)
      .then(({data})=> {
          dispatch({type:"UPDATE_STORE_MESSAGES", messages:data})
      })
      .catch(err=>console.log(err));
    }

    const handleClick = (id,name,message_id) => {
      navigation.navigate('store_chat',{
        customer_id:id,
        customer_name: name
      })
      socket.emit("read_message",{message_id, is_store:true})
    }

    if(!messages.messages) return <Loading text="Đang tải tin nhắn" />
    return (
    <View style={styles.container}>
      <FlatList
        data={messages.messages}
        keyExtractor={item=>{
          return item._id
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            //onPress={()=>handleClick(item.store_id._id,item.store_id.name,item._id)}
            onPress={()=>handleClick(item.customer_id._id,item.customer_id.name, item._id)}
          >
            <ChatItem {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageList;
