import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../navigator/DrawerContent';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chat from './chat';
import io from 'socket.io-client';
import {server} from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../service/axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import UserInfo from './user_info';
import ChatList from './chat_list';
import RescuingScreen from './rescuing';
import HistoryScreen from './history';
import HistoryDetailScreen from './history_detail';
import StoreDetail from './store_detail/index';
import RatingScreen from './rating';
import PaymentScreen from './paypal';
import ServiceDetail from './store_detail/service_detail';
import ServiceRating from './store_detail/service_rating';
import call from 'react-native-phone-call';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const socket = io(server);
socket.on('connect', async () => {
  const user_token = await AsyncStorage.getItem('user_token');
  socket.emit('authenticate', {token: user_token, type: 'user'});
});

function StackComponent(props) {
  const messages = useSelector(state => state.messages);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#295a59',
        },
      }}>
      <Stack.Screen
        name="rescuing"
        component={RescuingScreen}
        options={{
          title: 'OTO RESCUE',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 12}}
              onPress={() => props.navigation.openDrawer()}>
              <Icon name="format-list-bulleted" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 12}}
              onPress={() => props.navigation.navigate('chat_list')}>
              <Icon name="email" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="info"
        component={UserInfo}
        options={{
          title: 'INFO',
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="chat_list"
        component={ChatList}
        options={{
          title: 'Messages',
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="chat"
        component={Chat}
        options={{
          title: '',
          headerTintColor: '#062743',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight:()=>(
            <TouchableOpacity 
              style={{
                marginRight:10
              }}
              onPress={()=> call({
                  number: messages.info.store.phone,
                  prompt: false
                }).catch(console.error)
              }
            >
              <MaterialIcons name="call" size={22} />
            </TouchableOpacity>
          )
          
        }}
      />

      <Stack.Screen
        name="history"
        component={HistoryScreen}
        options={{
          title: 'History',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="history_detail"
        component={HistoryDetailScreen}
        options={{
          title: 'History Detail',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="store_detail"
        component={StoreDetail} 
        options={{
          title: 'Cty ABC',
          headerShown:false,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="rating"
        component={RatingScreen} 
        options={{
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"#202125"
          }
        }}
      />
      <Stack.Screen
        name="service_detail"
        component={ServiceDetail} 
        options={{
          headerTintColor: '#fff',
          title:"Service"
        }}
      />
      <Stack.Screen
        name="service_rating"
        component={ServiceRating} 
        options={{
          headerTintColor: '#fff',
          title:"Rating"
        }}
      />
    </Stack.Navigator>
  );
}

const Index = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  React.useEffect(() => {
    loadListMsgOfUser();
    socket.on('store_send_msg_to_you', ({from_id}) => {
      loadMessages(from_id);
      loadListMsgOfUser();
    });
    socket.on("refresh_message",()=>{
      loadListMsgOfUser();
    }) 
  }, []);

  const loadListMsgOfUser = () => {
    axios
      .get('/api/messages/user_list')
      .then(({data}) => {
        dispatch({type:"UPDATE_MESSAGE_LIST", messages: data})
      })
      .catch((err) => console.log(err));
  };

  const loadMessages = (store_id) => {
    axios('/api/messages/customer_to/' + store_id).then(({data}) => {
      dispatch({type: 'UPDATE_MESSAGES', messages: data});
    });
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      overlayColor="transparent"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={StackComponent} />
    </Drawer.Navigator>
  );
};
export {socket};
export default Index;
