import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
export default (props) => {
    return (
        <View style={styles.yourMsgContainer}> 
            <Avatar.Image 
                size={32} 
                source={require("../../assets/images/profile.png")}
                style={{marginRight:8, marginTop:8}}
            />
            <View style={styles.yourMsgContent}>
                <Text>{props.message}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    yourMsgContainer: {
        flexDirection:"row",
        alignItems:"flex-start",
        marginLeft:8
    },
    yourMsgContent: {
        backgroundColor:"#e7eaed",
        padding:12,
        width:"80%",
        borderRadius:12,
        marginTop:8
    }
});