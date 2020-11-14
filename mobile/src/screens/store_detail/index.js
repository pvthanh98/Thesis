import React from 'react';
import {View, Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoreDetailHome from './store_detail';
const Home = (props) => {
    return <View>
        <Text>ok</Text>
    </View>
}
const Tab = createMaterialBottomTabNavigator();
export default (props) => {
    const {store_id, distance} = props.route.params
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#295a59' }}
        >
            <Tab.Screen 
                name="store_detail_home" 
                initialParams={{store_id,distance}} 
                component={StoreDetailHome}
                options={{
                    tabBarIcon:()=><Icon name="home" color="#fff" size={24}/>,
                    tabBarColor: "red",
                    title:"Trang chủ"
                }}
            />
            <Tab.Screen 
                name="services" 
                component={Home}  
                options={{
                    tabBarIcon: ()=> <Icon name="cases" color="#fff" size={24} />
                }}
            />
        </Tab.Navigator>
    )
}
