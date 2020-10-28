import axios from 'axios';
import {server} from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = server;

const apiInstance = axios.create()

apiInstance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('user_token')
        //console.log(token)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default apiInstance


