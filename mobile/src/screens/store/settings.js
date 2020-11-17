import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux'
export default function Home(props) {
    const dispatch = useDispatch()
    const logout = async () => {
        await AsyncStorage.removeItem('admin_token');
        await AsyncStorage.removeItem('admin_name');
        await AsyncStorage.removeItem('admin_id');
        await AsyncStorage.removeItem('admin_avt');
        dispatch({type: 'SIGN_OUT'});
    }
    return (
        <View style={styles.container}>
            <Button
                onPress={logout}
            >Dang xuat</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{ }, 
})