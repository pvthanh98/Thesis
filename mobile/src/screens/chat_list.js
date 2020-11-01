import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ListItem from '../components/chat/chat_list_item';
import axios from '../service/axios';
import {useSelector, useDispatch} from 'react-redux';
const ChatList = ({navigation}) => {
  const message_list = useSelector(state => state.message_list)
  const dispatch = useDispatch()

  React.useEffect(()=> {
    loadListMsgOfUser();
  },[])
  const loadListMsgOfUser = () => {
    axios
      .get('/api/messages/user_list')
      .then(({data}) => {
        dispatch({type:"UPDATE_MESSAGE_LIST", messages: data})
      })
      .catch((err) => console.log(err));
  };

  console.log(message_list.messages)
  return (
    <View style={styles.container}>
      <FlatList
        data={message_list.messages}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={()=>navigation.navigate('chat',{store_id: item.store_id._id})}
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
