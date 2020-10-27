import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
export default (props) => {
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [id, setId] = React.useState(null);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        getInfo();
    },[])

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("user_token");
            dispatch({type:"SIGN_OUT"})
            return true;
        }
        catch(exception) {
            console.log(exception)
            return false;
        }
    }

    const getInfo = async () => {
        try {
            const name = await AsyncStorage.getItem("name");
            const image = await AsyncStorage.getItem("image")
            const id = await AsyncStorage.getItem("id");
            setName(name);
            setId(id);
            setImage(image);
        } catch(exception) {
            console.log(exception);
        }
    }

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userContainer}>
                    <Avatar.Image
                        source={require('../assets/images/profile.png')}
                    />
                    <View style={styles.userNameContainer}>
                        <Title style={styles.username}>{name}</Title>
                        <Caption style={{marginLeft:16}}>Cần Thơ</Caption>
                    </View>
                </View>
                <View style={styles.ItemContainer}>
                    <DrawerItem 
                        label="Home"
                        onPress={()=> props.navigation.navigate('rescuing')}
                        icon={()=>(
                            <Icon name="home" size={25} color="black" />
                        )}
                    />
                     <DrawerItem 
                        label="Info"
                        onPress={()=> props.navigation.navigate('rescuing')}
                        icon={()=>(
                            <Icon name="info-circle" size={25} color="black" />
                        )}
                    />
                    <DrawerItem 
                        label="Rescue History"
                        onPress={()=> props.navigation.navigate('rescuing')}
                        icon={()=>(
                            <Icon name="history" size={25} color="black" />
                        )}
                    />
                    <DrawerItem 
                        label="Sign out"
                        onPress={logout}
                        icon={()=>(
                            <Icon name="sign-out" size={25} color="black" />
                        )}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        marginTop:24,
        marginLeft:12,
        flexDirection:"row"
    },
    username:{
        marginLeft:12,
        fontSize:22,
        fontWeight:"bold",
    },
    userNameContainer: {
        justifyContent:"center"
    },
    ItemContainer :{
        marginTop:12
    }
})