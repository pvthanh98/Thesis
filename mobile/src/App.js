import 'react-native-gesture-handler';
import * as React from 'react';;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import IndexScreen from './screens/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/splash_screen';
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';


const Stack = createStackNavigator();
const App = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
        const user_token = await AsyncStorage.getItem('user_token');
        console.log("AUTH CHECKING ", user_token)
        setIsLoading(false);
        if(user_token) dispatch({type:"SIGN_IN", user_token: user_token })
    }catch(e){
      console.log(e);
      setIsLoading(false);
      return false;
    }
  }
  if(loading) return <SplashScreen />
  return (
      <NavigationContainer>
        <Stack.Navigator>
          {auth.isSignin === false ? (
            <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} hehe="Hele" />
          ) : (
             <Stack.Screen name="index" component={IndexScreen} options={{headerShown:false}} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;
