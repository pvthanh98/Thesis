import React from 'react';
import { ActivityIndicator, View, Text} from 'react-native'
export default function({text}){
    return (
        <View style={{flex:1, justifyContent:"center"}}> 
            <ActivityIndicator size="large" color="blue" />
            <Text style={{textAlign:"center"}}>{text ? text : ""}</Text>
        </View>
    )
}