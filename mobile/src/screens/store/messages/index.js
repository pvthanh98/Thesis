import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './chat'
import MessageList from './message_list';

const Stack = createStackNavigator();
export default (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00786a',
        },
      }}>
      <Stack.Screen
        name="message_store_list"
        component={MessageList}
        options={{
          headerShown: false,
        }}
        initialParams={{setOptions:props.navigation.setOptions}}
      />
      <Stack.Screen
        name="store_chat"
        component={Chat}
        options={{
          headerShown: true,
          headerTintColor:"#fff"
        }}
      />
      
    </Stack.Navigator>
  );
};
