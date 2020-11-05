import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ListItem from '../components/chat/chat_list_item';
import {useSelector, useDispatch} from 'react-redux';
import {socket} from './index';
const ChatList = ({navigation}) => {
  const message_list = useSelector(state => state.message_list);
  const handleClick =(store_id,store_name,message_id) =>{
    navigation.navigate('chat',{
      store_id,
      store_name
    });
    socket.emit("read_message",{message_id, is_store:false})
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={message_list.messages}
        keyExtractor={item=>item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={()=>handleClick(item.store_id._id,item.store_id.name,item._id)}
          >
            <ListItem {...item} />
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

export default ChatList;
