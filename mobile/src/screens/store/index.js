import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './home';
import ProfileScreen from './profile';
import MessageListScreen from './message_list';
import SettingScreen from './settings';
const Tab = createMaterialBottomTabNavigator();
export default () => {
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
                name="profile" 
                component={ProfileScreen} 
                options={{
                    title:"Profile",
                    tabBarIcon: ({color})=><MaterialIcons name="person" size={24} color={color} />
                }}
            />
            <Tab.Screen 
                name="message" 
                component={MessageListScreen} 
                options={{
                    title:"Message",
                    tabBarIcon: ({color})=><MaterialIcons name="message" size={24} color={color} />
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












// const removeItem = async () => {
//     await AsyncStorage.removeItem("admin_token")
// }