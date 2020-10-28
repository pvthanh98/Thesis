import React from 'react';
import {Button, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../navigator/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import RescuingScreen from './rescuing';
import Icon from 'react-native-vector-icons/FontAwesome';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackComponent(props) {
  return (
    <Stack.Navigator>
        <Stack.Screen name="rescuing" component={RescuingScreen} options={{
          title:"Oto Rescue",
          headerTitleAlign:"center",
          headerStyle: {
            backgroundColor: '#912c16'
          },
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

export default Index;
