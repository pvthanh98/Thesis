import axios from 'axios';
import {server} from '../constant';
export default function(){
    return axios.create({
        baseURL: server,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem("admin_token")},
    });
}