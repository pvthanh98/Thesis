import axios from 'axios';
import {server} from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async () => {
    try {
        const user_token = await AsyncStorage.getItem("user_token");
        return axios.create({
            baseURL: server,
            headers : {
                Authorization: `Bearer ${user_token}`
            }
        });
    } catch (exception) {
        console.log(exception);
        return axios.create({
            baseURL: server
        });
    }
    
}
    



