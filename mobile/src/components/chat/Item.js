import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {server} from '../../constants/index';
import moment from '../../service/vnmoment';
export default (props) => {
    const isMyMsg = () => {
        return !props.is_store;
    }
    return (
        <View style={[
            styles.msgContainer,
            {justifyContent: isMyMsg() ? "flex-end" : "flex-start"}
        ]}> 
            {!isMyMsg() && 
            <Avatar.Image 
                source = {{uri: `${server}/images/${props.store_id.image}`}}
                size={24} 
                style={{marginRight:8}}
            />}
            <View style={[
                styles.msgContent,
                {backgroundColor: isMyMsg() ? '#1a4aa4' : '#e5e5e5'},   
            ]}>
                <Text style={[
                    styles.textBody,
                    {color:isMyMsg()? "white": "black"}
                ]}>{props.body}</Text>
                <Text style={[styles.textTime, {color:isMyMsg()? "white": "black"}]}>-- {moment(props.timestamp)} --</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    msgContainer :{ 
      padding:10,
      flexDirection:"row"
    },
    msgContent:{
        borderRadius:10,
        padding:10,
        maxWidth:"80%",
    },
    textBody: {
        fontSize:16
    },
    textTime: {
        fontSize:12,
        marginTop:4
    }
});