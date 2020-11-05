import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default (props) => {
    React.useEffect(()=>{
        
    });

    const removeItem = async () => {
        await AsyncStorage.removeItem("admin_token")
    }
    return (
        <View>
            <TouchableOpacity onPress={removeItem}>
            <Text>
                LOGOUT
            </Text>
            </TouchableOpacity>
        </View>
    )
}
