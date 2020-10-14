import React, {useEffect} from 'react'
import axios from '../../service/axios';
import Navbar from '../../components/user_ui/navbar';
export default (props) => {
    useEffect(()=>{
        axios().get(`/api/service/id/${"5f7d6bba2ca6a71e6c9b1e70"}`)
        .then(res=>{
            console.log(res.data)
        })
    })
    return (
        <div>
            <Navbar />
        </div>
    )
}
