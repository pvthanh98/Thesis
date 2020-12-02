import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RescuingScreen from './rescuing';
import ProcessScreen from './process';
const defaultPosition = {
  lat: 10.860281,
  lng: 106.650232,
};
const Stack = createStackNavigator();
export default function Home({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00786a',
        },
        headerTintColor:"#fff"
      }}>
      <Stack.Screen
        name="rescuing_store"
        component={RescuingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="process"
        component={ProcessScreen}
        options={{
          title:"Xử Lí Cứu Hộ",
        }}
      />
    </Stack.Navigator>
  );
}
