import axios from 'axios';
import {server} from '../constant';
export default function(){
    return axios.create({
        baseURL: server,
        headers: localStorage.getItem("sys_token") ? {'Authorization': 'Bearer '+ localStorage.getItem("sys_token")}
        : null,
    });
}