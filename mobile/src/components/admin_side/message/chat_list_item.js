import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Avatar, Title, Text  } from 'react-native-paper';
import {server} from '../../../constants/index';
import moment from '../../../service/vnmoment';
const ChatListItem = (props) => {
    return (
      <View 
        style={styles.container}
      >
         <View style={styles.leftContainer}>
            <Avatar.Image style={styles.avatar} size={50} source={{
                uri: `${server}/images/${props.customer_id.image}`
            }} />
            <View>
                <Title>{props.customer_id.name}</Title>
                { (!props.is_read && !props.is_store)
                  ? <Text style={{fontWeight:"bold"}}>{props.body}</Text>
                  : <Text>{props.body}</Text>
                }
                <Text style={{color:"grey"}}>{moment(props.timestamp)}</Text>
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
