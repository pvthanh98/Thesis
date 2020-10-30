import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default (props) => {
    return (
        <View style={styles.myMsgContainer}> 
            <View style={styles.myMsgContent}>
            <Text style={{color:"#fff"}}>{props.message}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    myMsgContainer :{ 
        alignItems:"flex-end",
        marginRight:8
    },
    myMsgContent:{
        backgroundColor:"#2b3595",
        padding:12,
        width:"80%",
        borderRadius:12,
        marginTop:8
    }
});