import React from 'react';
import {View, Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoreDetailHome from './store_detail';
import Service from './service';

const Tab = createMaterialBottomTabNavigator();
export default (props) => {
    const {store_id, distance, store_name} = props.route.params
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#295a59' }}
            activeColor="#fff"
            inactiveColor="#ddd"
        >
            <Tab.Screen 
                name="store_detail_home" 
                initialParams={{store_id,distance}} 
                component={StoreDetailHome}
                options={{
                    tabBarIcon:({color})=><Icon name="home" color={color} size={24}/>,
                    tabBarColor: "red",
                    title:"Trang chủ",
    
                }}
            />
            <Tab.Screen 
                name="services" 
                component={Service}  
                initialParams={{store_id,distance, store_name}} 
                options={{
                    tabBarIcon: ({color})=> <Icon name="cases" color={color} size={24} />
                }}
            />
        </Tab.Navigator>
    )
}
