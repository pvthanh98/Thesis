import React from 'react';
import {Button, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../navigator/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import RescuingScreen from './rescuing';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserInfo from './user_info';
import Chat from './chat';
import io from "socket.io-client";
import {server} from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../service/axios';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const socket = io(server);
socket.on('connect', async ()=>{
  const user_token = await AsyncStorage.getItem('user_token')
  socket.emit("authenticate",{token: user_token, type: "user"});
})
  
function StackComponent(props) {
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    socket.on("store_send_msg_to_you",({from_id})=>{
      loadMessages(from_id);
      // if(messages.info.store.id === from_id) loadMessages(from_id);
    });
  },[])

  const loadMessages = (store_id) => {
      axios('/api/messages/customer_to/'+store_id)
      .then(({data})=>{
          dispatch({type:"UPDATE_MESSAGES", messages: data})
      })
  }
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor:'#912c16',
      }
    }}>
        <Stack.Screen name="rescuing" component={RescuingScreen} options={{
          title:"OTO RESCUE",
          headerTitleAlign:"center",
          headerLeft: () => (
              <TouchableOpacity 
                style={{marginLeft:12}}
                onPress={()=> props.navigation.openDrawer()}
              >
                <Icon name="bars" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          headerTintColor:"#fff"
          }} 
        />
        <Stack.Screen 
          name="info" 
          component={UserInfo} 
          options={{
            title: "INFO",
            headerTintColor:"#fff"
          }}
        />
         <Stack.Screen 
          name="chat" 
          component={Chat} 
          options={{
            title: "Thành Phan",
            headerTintColor:"#062743",
            headerStyle:{
              backgroundColor:"#fff"
            }
          }}
          
        />
    </Stack.Navigator>
  )
}

const Index = () => {
  return (
    <Drawer.Navigator 
        initialRouteName="Home" 
        overlayColor="transparent"
        drawerContent={props => <DrawerContent {...props} />}
    >
        <Drawer.Screen name="Home" component={StackComponent} />
    </Drawer.Navigator>
  )
};
export {socket};
export default Index;
