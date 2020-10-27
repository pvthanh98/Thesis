import React from 'react';
import login_style from '../assets/styles/login_style';
import {
    View, Text, StyleSheet, ActivityIndicator
} from 'react-native';
const styles = StyleSheet.create(login_style())
export default () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>OTO RESCUING</Text>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    )
}
