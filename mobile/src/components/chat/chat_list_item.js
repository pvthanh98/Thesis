import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Avatar, Title, Text  } from 'react-native-paper';
import {server} from '../../constants/index';
const ChatListItem = (props) => {
    return (
      <View 
        style={styles.container}
      >
         <View style={styles.leftContainer}>
            <Avatar.Image style={styles.avatar} size={50} source={{
                uri: `${server}/images/${props.store_id.image}`
            }} />
            <View>
                <Title>{props.store_id.name}</Title>
                <Text>{props.body}</Text>
                <Text style={{color:"grey"}}>a few minutes ago</Text>
            </View>
         </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container : {
        padding:10,
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
        backgroundColor:"#FFF",
        margin:4,
        shadowColor:"#000",
        shadowOpacity:0.3,
        shadowRadius:10
    },
    leftContainer :{
      flexDirection:"row"
    },
    avatar: {
      marginRight:10
    }
})

export default ChatListItem;
