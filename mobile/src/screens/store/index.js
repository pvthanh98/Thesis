import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default (props) => {
    React.useEffect(()=>{
        removeToken();
    })
    const removeToken = async () => {
        await AsyncStorage.removeItem("admin_token")
    }
    return (
        <View style={styles.container}>
            <Text>THANH PHAN THESIS</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})















// const removeItem = async () => {
//     await AsyncStorage.removeItem("admin_token")
// }