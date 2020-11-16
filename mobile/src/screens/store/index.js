import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './home';
import ProfileScreen from './profile';
import MessageListScreen from './messages/index';
import SettingScreen from './settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {server} from '../../constants/index';
import {useSelector, useDispatch} from 'react-redux'
import io from 'socket.io-client';
import axios from '../../service/store_axios'
const socket = io(server);
socket.on('connect', async () => {
  const admin_token = await AsyncStorage.getItem('admin_token');
  socket.emit('authenticate', {token: admin_token, type: 'store'});
});

const Tab = createMaterialBottomTabNavigator();
export default () => {
    const [notification, setNotification] = React.useState(0);
    const dispatch = useDispatch()
    React.useEffect(()=>{
        loadListMessages();
    })
    const loadListMessages = () => {
        axios.get("/api/messages/store_list")
        .then(({data})=>{
            dispatch({type:"UPDATE_MESSAGE_STORE_LIST", messages: data})
            setNotification(data.unread);
        })
        .catch(err=>console.log(err))
    }
    return (
        <Tab.Navigator
            barStyle={{
                backgroundColor:"#00786a"
            }}
        >
            <Tab.Screen 
                name="home"
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({color})=><MaterialIcons name="home" size={24} color={color} />,
                    title:"Home"
                }}
            />
            <Tab.Screen 
                name="message" 
                component={MessageListScreen} 
                options={{
                    title:"Message",
                    tabBarBadge: notification,
                    tabBarIcon: ({color})=><MaterialIcons name="message" size={24} color={color} />
                }}
            />
            <Tab.Screen 
                name="profile" 
                component={ProfileScreen} 
                options={{
                    title:"Profile",
                    tabBarIcon: ({color})=><MaterialIcons name="person" size={24} color={color} />
                }}
            />
             <Tab.Screen 
                name="settings" 
                component={SettingScreen} 
                options={{
                    title:"Settings",
                    tabBarIcon: ({color})=><MaterialIcons name="settings" size={24} color={color} />
                }}
            />
            
        </Tab.Navigator>
    )
}

export {socket}











// const removeItem = async () => {
//     await AsyncStorage.removeItem("admin_token")
// }