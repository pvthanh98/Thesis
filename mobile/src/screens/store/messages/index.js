import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './chat'
import MessageList from './message_list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
export default (props) => {
  const messages = useSelector(state => state.message_store);
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
          headerTintColor:"#fff",
          headerRight:()=>(
            <TouchableOpacity 
              style={{
                marginRight:10
              }}
              onPress={()=> call({
                  number: messages.info.customer.phone,
                  prompt: false
                }).catch(console.error)
              }
            >
              <MaterialIcons name="call" color="#fff" size={22} />
            </TouchableOpacity>
          )
        }}
      />
    </Stack.Navigator>
  );
};
