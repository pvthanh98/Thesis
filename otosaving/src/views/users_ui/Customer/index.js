import React from 'react';
import { Route } from "react-router-dom";
import axios from '../../../service/axios_user';
import Nav from '../../../components/user_ui/navbar';
import Footer from '../../../components/user_ui/footer';
import Bill from './bill';
import {useDispatch} from 'react-redux';

export default (props) => {
    const dispatch = useDispatch();
    React.useEffect(()=>{
        axios().get('/api/customer/bill')
        .then(res=>{
            dispatch({type:"UPDATE_CUSTOMER_BILLS", bills:res.data});
        })
        .catch(err=>console.log(err));
    })
    return (
        <div>
            <Nav />
                <Route exact path="/customer/bill" component={Bill} />
            <Footer />
        </div>
    )
}
